import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const base_url = "https://1bd6-117-251-41-159.ngrok-free.app"

const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export {axiosInstance};