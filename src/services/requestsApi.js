import axiosClient from "../config/axios";


export const createRequest = async (requestsData)=>{
    try{
        const response = await axiosClient.post('/requests',requestsData);
        return response.data;
    }
    catch(error){
        console.error('Failed to create an exchange request: ',error);
    }
}

export const getAllRequests = async() =>{
    try{
        const response = await axiosClient.get('/requests');
        return response.data;
    }
    catch(error){
        console.error('Failed to get all exchange requests: ', error);
    }
}

export const updateRequest = async(requestsData)=>{
    try{
        const response = await axiosClient.patch('/requests',requestsData);
        return response.data;
    }
    catch(error){
        console.error('Failed to update exchange request status: ',error);
    }
}