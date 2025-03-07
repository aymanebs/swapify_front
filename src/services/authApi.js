import axiosClient from "../config/axios"


 export const login = async(loginData)=>{
    const response= await axiosClient.post('auth/login',loginData);
    return response.data.acces_token;
} 

export const googleLogin = async()=>{
    const response = await axiosClient.get('auth/google/login');
    return response;
}

export const register = async(registerData)=>{
    const response = await axiosClient.post('auth/register', registerData);
    return response;
}

