import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Cookies from 'js-cookie';
import { REFRESH_JWT_ENDPOINT } from "../ApiEndpoints";

class AxiosClient {
    public static instance: AxiosInstance | null = null;

    public static getInstance() {
        if (!AxiosClient.instance) {
            AxiosClient.instance = axios.create({
                baseURL: import.meta.env.VITE_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            AxiosClient.instance.interceptors.request.use(function (config) {
                return config;
            });

            AxiosClient.instance.interceptors.response.use(response => response,
            async function (error: AxiosError) {
                let originalRequest: any = error.config;
                const JwtTokenExpired: boolean = (error.response?.data as any).message.includes("TOKEN_EXPIRED");
                if(JwtTokenExpired && originalRequest._retry == null && originalRequest._retry != true){
                    try{
                        const res:AxiosResponse = await AxiosClient.refreshToken();
                        originalRequest._retry = true;

                        return AxiosClient.getInstance().request(originalRequest);
                        // do request again
                        // console.log(res.data.token);

                    }catch(e){
                        return error;
                    }
                }
                return error; 
            })
        }
        return AxiosClient.instance;
    }

    private static async refreshToken(url: string = REFRESH_JWT_ENDPOINT){
        let response: AxiosResponse = await AxiosClient.getInstance().post(url, {}, {withCredentials: true});
        return response;
    }
}

export { AxiosClient }