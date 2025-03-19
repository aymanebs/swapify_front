import axiosClient from "../config/axios";


export const getAllChats = async()=>{
    try{
        const response = await axiosClient.get('/chats/user');
        return response.data;
        
    }
    catch(error){
        console.error('Failed to fetch user chats: ', error);
    }
}

