import { User } from "../models/User";
import { authSelf } from "../pages/Auth/AuthScript";
import { useUserStore } from "../stores/UserStore";
import {RoleEnum} from "./role-enum";

export async function roleGuard(to: any, from: any, next: any) {
    if (to.meta.role) {
        let roleAccess: RoleEnum[] = [];
        if (Array.isArray(to.meta.role)) {
            roleAccess = to.meta.role;
        }

        let userRole: string | null = null;
        let userStore = useUserStore();

        try {
            if (userStore.getUser == null) {
                const user: User | null = await authSelf();
                if (user != null) {
                    userRole = (user.role.name).toLowerCase();
                }
            } else {
                // console.log("ROLE : "+userStore.getUserRole)
                userRole = (userStore.getUser.role.name as string).toLowerCase();
            }
        } catch (e) {
            console.log("Error getting user role")
            console.log(e);
        }

        if (roleAccess.length == 0) {
            next();
        } else {
            if (!userRole) {
                // user not logged in
                if (roleAccess.includes(RoleEnum.ROLE_GUEST)) {
                    next();
                } else {
                    next({ name: "login" });
                }
            } else {
                // user logged in
                const userRoleEnum: RoleEnum = userRole as RoleEnum; // convert userRole to RoleEnum
                if (roleAccess.includes(userRoleEnum)) {
                    next();
                } else if (roleAccess.includes(RoleEnum.ROLE_GUEST)) {
                    next({ name: "home" });
                }
            }
        }
    } else {
        next();
    }
}