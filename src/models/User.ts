import { Role } from "./Role";

class User{
    id: number;
    name: string;
    email: string;
    image_url: string;
    role: Role;

    constructor(id: number, name: string, email: string, image_url: string="", role: Role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.image_url = image_url;
        this.role = role;
    }

    static From(userResponse: Record<string, any>){
        return new User(userResponse.id, userResponse.name, userResponse.email, userResponse.image_url, Role.From(userResponse.role));
    }
}

export {User}