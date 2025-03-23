import axiosClient from "../config/axios"


export const createRating = async(data)=>{
    try{
        const response = await axiosClient.post('/ratings',data);
        return response.data;
    }
    catch(error){
        console.error('Failed to rate user: ',error);
    }
}

export const getUserAverageRating = async(userId)=>{
    try{
        const response = await axiosClient.get(`/ratings/user/${userId}/average`,userId);
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch user rating: ',error);
    }
}