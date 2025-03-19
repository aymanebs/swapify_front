import axiosClient from "../config/axios";


export const getAllUsers = async()=>{
    try{
        const response = await axiosClient.get('/users');
        return response.data;
    }
    catch(error){
        console.error('Failed to fetch users: ', error);
    }
}