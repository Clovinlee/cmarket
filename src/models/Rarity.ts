export default class Rarity {
    id: string;
    name: string;
    color: string;
    level: string;

    constructor(id: string, name: string, color: string, level: string) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.level = level;
    }

    static From(json: { id: any; name: any; color: any; level: any; }) {
        return new Rarity(
            json.id,
            json.name,
            json.color,
            json.level
        );
    }
}