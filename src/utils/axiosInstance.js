import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { base_url } from "./utils";

const axiosInstance = ({baseURL}) => {
    const axiosVar = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    axiosVar.interceptors.request.use(
        async (config) => {
            const token =await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )
}

export default axiosInstance

