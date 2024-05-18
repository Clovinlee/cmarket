import { AxiosResponse } from "axios";
import { AxiosClient } from "../../api/AxiosClient";
import { LOGIN_JWT_ENDPOINT, LOGOUT_JWT_ENDPOINT } from "../../ApiEndpoints";
import { User } from "../../models/User";
import { useUserStore } from "../../stores/UserStore";

async function authLogout(): Promise<boolean>{
    try{
        let response = await AxiosClient.getInstance().post(LOGOUT_JWT_ENDPOINT, {}, {withCredentials: true});
        if(response.request.status < 300){
            let userStore = useUserStore();
            userStore.setUser(null);
        }
        return response.request.status < 300;
    }catch(e){
        console.log("Error logging out");
        console.log(e);
        return e;
    }
}

async function authSelf(): Promise<User|null>{
    
    try{
        let response = await AxiosClient.getInstance().post(LOGIN_JWT_ENDPOINT, {}, {withCredentials: true});
        let userStore = useUserStore();
        let user: User = User.From(response.data.user);
        userStore.setUser(user);
    
        return user;
    }catch(e){
        return null;
    }
}

export {authSelf, authLogout}