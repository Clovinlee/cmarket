import axios, { AxiosInstance } from "axios";

class AxiosClient{
    public static instance:AxiosInstance | null = null;

    public static getInstance(){
        if(!AxiosClient.instance){
            AxiosClient.instance = axios.create({
                baseURL: import.meta.env.VITE_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return AxiosClient.instance;
    }
}

export {AxiosClient}