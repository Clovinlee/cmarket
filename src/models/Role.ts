class Role{
    id: number;
    name: string;
    level: number;
    constructor(id: number, name: string, level: number){
        this.id = id;
        this.name = name;
        this.level = level;
    }

    static From(roleResponse: Record<string, any>): Role{
        return new Role(roleResponse.id, roleResponse.name, roleResponse.level);
    }
}

export {Role}