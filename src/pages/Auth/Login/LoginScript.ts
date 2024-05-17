import { AxiosResponse } from "axios"
import { AxiosClient } from "../../../api/AxiosClient";
import { GET_USER_BY_EMAIL, LOGIN_USER_ENDPOINT } from "../../../ApiEndpoints";

async function loginEmail(email: string, password: string): Promise<AxiosResponse>{
    try{
        let response: AxiosResponse = await AxiosClient.getInstance().post(LOGIN_USER_ENDPOINT, {"email":email, "password": password}, {withCredentials: true});

        // Login success
        // 1. refresh token & access token saved into HTTPONLY cookie
        // 2. cookie authorization handled in BE middleware

        return response;
    }catch(e){
        console.log("login failed");
        return e;
    }
}

async function checkEmail(email: string): Promise<AxiosResponse>{
    try{
        let response: AxiosResponse = await AxiosClient.getInstance().post(GET_USER_BY_EMAIL, {"email":email});
        return response;
    }catch(e){
        console.log("Error getting emails");
        console.log(e);
        return e;
    }
}

export {loginEmail, checkEmail}