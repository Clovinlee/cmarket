import { AxiosResponse } from "axios";
import { AxiosClient } from "../../../api/AxiosClient";
import { LOGIN_USER_ENDPOINT, REGISTER_USER_ENDPOINT } from "../../../ApiEndpoints";

async function checkUuid(uuid: string) : Promise<string | null>{
    try {
        const response: AxiosResponse = await AxiosClient.getInstance().post(`/users/${uuid}/email`, {withCredentials: true});    
        return response.data.emailregister;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function loginUser(email: string, password: string): Promise<AxiosResponse| null>{
    try {
        const response: AxiosResponse = await AxiosClient.getInstance().post(LOGIN_USER_ENDPOINT, {"email":email, "password":password}, {withCredentials: true});    
        return response;
    } catch (error) {
        console.log("Login Error");
        console.log(error);
        return null;
    }
}

async function registerUser(email: string, name: string, password: string, confirmPassword: string): Promise<AxiosResponse | null>{
    try {
        const response: AxiosResponse = await AxiosClient.getInstance().post(REGISTER_USER_ENDPOINT, {
            "email": email,
            "name": name,
            "password": password,
            "confirmPassword": confirmPassword
        }, {withCredentials: true});    
        return response;
    } catch (error) {
        console.log("Register Error");
        console.log(error);
        return null;
    }
}

export { checkUuid, registerUser, loginUser }