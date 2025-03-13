import axios from "axios";


const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default axiosClient;