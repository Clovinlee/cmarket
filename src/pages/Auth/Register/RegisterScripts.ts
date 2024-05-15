import axios, { AxiosResponse } from 'axios'
import { AxiosClient } from '../../../api/AxiosClient';

async function registerEmail(email: string){
    let API_URL = import.meta.env.VITE_API_URL as string;
    API_URL += "mail/send";

    const response: AxiosResponse = await AxiosClient.getInstance().post("/mail/send", {
        email: email
    }); 

    // console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);

    return response;
}

export {registerEmail}