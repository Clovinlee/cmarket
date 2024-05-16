import axios, { AxiosResponse } from 'axios'
import { AxiosClient } from '../../../api/AxiosClient';
import { REGISTER_EMAIL_ENDPOINT } from '../../../ApiEndpoints';

async function registerEmail(email: string){
    try {
        const response: AxiosResponse = await AxiosClient.getInstance().post(REGISTER_EMAIL_ENDPOINT, {
            email: email
        }, {withCredentials: true}); 
        return response;
    } catch (error) {
        console.log("Error on registering email");
        return error;
    }
}

export {registerEmail}