import axiosClient from "../config/axios";


export const createcategory =async (categoryData)=>{
    try{
        await axiosClient.post('/categories',categoryData);
    }
    catch(error){
        console.error('Failed to create category', error);
    }
}

export const getAllcategories = async ()=>{
    try{
        const data = await axiosClient.get('/categories').data;
        return data;
    }
    catch(error){
        console.error('Failed to fetch categories', error);
    }
}

export const getOnecategory = async (categoryId)=>{
    try{
        const data = await axiosClient.get(`/categories/${categoryId}`);
    }
    catch(error){
        console.error('Failed to get the category', error);
    }
}

export const updatecategory = async (categoryId,categoryData) => {
    try{
        await axiosClient.put(`/categories/${categoryId}`, categoryData);
    }
    catch(error){
        console.error('Failed to update category', error);
    }
}

export const deletecategory = async (categoryId) => {
    try{
        await axiosClient.delete(`/categories/${categoryId}`);
    }
    catch(error){
        console.error('Failed to delete category', error);
    }
}