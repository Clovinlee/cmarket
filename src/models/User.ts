import { Role } from "./Role";

class User{
    id: number;
    name: string;
    email: string;
    role: Role;

    constructor(id: number, name: string, email: string, role: Role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    static From(userResponse: Record<string, any>){
        return new User(userResponse.id, userResponse.name, userResponse.email, Role.From(userResponse.role));
    }
}

export {User}