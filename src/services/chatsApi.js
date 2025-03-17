import axiosClient from "../config/axios";


export const getAllChats = async()=>{
    try{
        axiosClient.get('/chats/me');
    }
    catch(error){
        console.error('Failed to fetch user chats: ', error);
    }
}