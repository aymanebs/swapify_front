import axiosClient from "../config/axios";


export const createItem =async (itemsData)=>{
    try{
        await axiosClient.post('/items',itemsData);
    }
    catch(error){
        console.error('Failed to create item', error);
    }
}

export const getAllUserItems = async()=>{
    try{
        const response = await axiosClient.get('/items/me');
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch items', error);
    }
}

export const getAllItems = async ()=>{
    try{
        const response = await axiosClient.get('/items');
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch items', error);
    }
}

export const getOneItem = async (itemId)=>{
    try{
        const response = await axiosClient.get(`/items/${itemId}`);
        return response.data;
    }
    catch(error){
        console.error('Failed to get the item', error);
    }
}

export const updateItem = async (itemId,itemsData) => {
    try{
        console.log('éééééééé itemId', itemId);
        await axiosClient.put(`/items/${itemId}`, itemsData);
    }
    catch(error){
        console.error('Failed to update items', error);
    }
}

export const deleteItem = async (itemId) => {
    try{
        await axiosClient.delete(`/items/${itemId}`);
    }
    catch(error){
        console.error('Failed to delete items', error);
    }
}