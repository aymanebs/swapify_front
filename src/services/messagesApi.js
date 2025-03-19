import axiosClient from "../config/axios";


export const createMessage = async(messageData)=>{

    try{
        await axiosClient.post('/messages', messageData);
    }
    catch(error){
        console.error('Failed to create message: ', error);
    }
}

