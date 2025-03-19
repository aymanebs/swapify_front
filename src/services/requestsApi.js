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

export const findByReceiverId = async() =>{
    try{
        const response = await axiosClient.get('/requests/received');
        return response.data;
    }
    catch(error){
        console.error('Failed to get received exchange requests: ', error);
    }
}

export const findBySenderId = async() =>{
    try{
        const response = await axiosClient.get('/requests/sent');
        return response.data;
    }
    catch(error){
        console.error('Failed to get send exchange requests: ', error);
    }
}

export const updateRequest = async(id,requestsData)=>{
    try{
        const response = await axiosClient.patch(`/requests/${id}`,requestsData);
        return response.data;
    }
    catch(error){
        console.error('Failed to update exchange request status: ',error);
    }
}