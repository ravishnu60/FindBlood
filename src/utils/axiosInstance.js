import axios from "axios";

const base_url= "https://355b-117-193-15-140.ngrok-free.app/"

export const axiosInstance = axios.create({
    baseURL: base_url
 })

//  axiosInstance.interceptors.request.use(
//     async (config) =>{
//         let token= localStorage.getItem('token')
//         config.headers.Authorization=`Bearer ${token}`
//     }
//  )