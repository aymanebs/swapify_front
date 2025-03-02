import axiosClient from "../config/axios"


 export const login = async(loginData)=>{
    const response= await axiosClient.post('auth/login',loginData);
    return response.data;
} 

export const googleLogin = async()=>{
    const response = await axiosClient.get('auth/google/login');
    console.log('response', response)
    return response;
}

export const register = async(registerData)=>{
    const response = await axiosClient.post('auth/register', registerData);
    return response;
}

