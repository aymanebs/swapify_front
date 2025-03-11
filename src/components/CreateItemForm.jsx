import React, { useEffect, useState } from 'react';
import { X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { getAllcategories } from '../services/categoriesApi';
import { conditions } from '../constants/condition';


const CreateItemForm = ({onSubmit, onCancel }) => {


  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    condition: '',
    category: '',
    photos: [],
  });
  
  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  

  useEffect(()=>{
    async function fetchCategories() {

        try{
        const categories = await getAllcategories();
        setCategories(categories);
        }
        catch(error){
            console.error('Failed to fetch the categories into useEffect ', error);
        }
    
    }

    fetchCategories();

    
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    } else if (formData.name.length > 20) {
      newErrors.name = 'Name must be less than 20 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 8) {
      newErrors.description = 'Description must be at least 8 characters';
    }
    
    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }
    
    // if (!formData.categoryId) {
    //   newErrors.categoryId = 'Category is required';
    // }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Update form data with new files
    setFormData({
      ...formData,
      photos: [...formData.photos, ...files]
    });
    
    // Create preview URLs for the images
    const newPreviewImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    setPreviewImages([...previewImages, ...newPreviewImages]);
    
    // Clear any previous errors
    if (errors.photos) {
      setErrors({
        ...errors,
        photos: ''
      });
    }
  };

  const removeImage = (index) => {
    // Create new arrays without the removed image
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    
    const updatedPreviews = [...previewImages];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index].url);
    updatedPreviews.splice(index, 1);
    
    // Update state
    setFormData({
      ...formData,
      photos: updatedPhotos
    });
    setPreviewImages(updatedPreviews);
  };
  

   // Clean up object URLs when component unmounts
   useEffect(() => {
    return () => {
      previewImages.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, []);
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Add New Item</h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 text-gray-800 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500`}
              placeholder="Enter item name (3-20 characters)"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 text-gray-800 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500`}
              placeholder="Describe your item (minimum 8 characters)"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
              Condition <span className="text-red-500">*</span>
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className={`w-full px-3 text-gray-800 py-2 border ${errors.condition ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500`}
            >
              <option value="" disabled>All conditions</option>

              {
                conditions.map((condition)=><option key={condition} value={condition}>{condition}</option>)
              }

            </select>
            {errors.condition && <p className="mt-1 text-sm text-red-500">{errors.condition}</p>}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500`}
            >
               <option value="" disabled>All categories</option>
                {
                    categories.length > 0 ?(

                        categories.map((category) => {
                            return <option key={category._id} value={category._id}>{category.name}</option>;
                          })
                    ):
                    <option disabled>Waiting for categories...</option>

              
                }
            </select>
            {/* {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos <span className="text-red-500">*</span>
            </label>
            
            <div className={`border-2 border-dashed ${errors.photos ? 'border-red-500' : 'border-gray-300'} rounded-md p-4`}>
              <div className="flex flex-col items-center">
                <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Drag and drop photos or click to browse</p>
                <p className="text-xs text-gray-500 mb-4">Recommended: JPG, PNG (Max 5MB each)</p>
                
                <input 
                  type="file" 
                  id="photos" 
                  name="photos" 
                  accept="image/*" 
                  multiple
                  onChange={handleFileChange} 
                  className="hidden"
                />
                <label 
                  htmlFor="photos" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  <span>Upload Photos</span>
                </label>
              </div>
              
              {errors.photos && <p className="mt-3 text-sm text-red-500">{errors.photos}</p>}
              
              {/* Preview Images */}
              {previewImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-md border border-gray-200">
                        <img 
                          src={image.url} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-4">
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Create Item
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateItemForm;