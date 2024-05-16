import axios, { AxiosResponse } from 'axios'
import { AxiosClient } from '../../../api/AxiosClient';
import { REGISTER_EMAIL_ENDPOINT } from '../../../ApiEndpoints';

async function registerEmail(email: string){
    const response: AxiosResponse = await AxiosClient.getInstance().post(REGISTER_EMAIL_ENDPOINT, {
        email: email
    }, {withCredentials: true}); 

    // console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);

    return response;
}

export {registerEmail}