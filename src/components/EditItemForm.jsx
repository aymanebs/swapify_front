import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getAllcategories } from '../services/categoriesApi';



const EditItemForm = ({ item, onSubmit, onCancel }) => {


  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    condition: item.condition,
    category: item.category._id,
  });
  
  const [errors, setErrors] = useState({});
  
console.log('formData : ',formData);
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

    console.log('name: ',value);
    
   
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
    
    // if (!formData.category._id) {
    //   newErrors.categoryId = 'Category is required';
    // }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();    
    if (validateForm()) {
      const itemId = item._id;
      onSubmit(itemId,formData);
    }
  };
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Edit your Item</h3>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
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
              <option value="Like New">Like New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
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
                    <option>Waiting for categories...</option>

              
                }
            </select>
            {/* {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>} */}
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
                Update Item
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditItemForm;