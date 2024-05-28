import Rarity from "./Rarity";

export default class Product {

    private id: string;
    private name: string;
    private description: string;
    private price: number;
    private image: string;
    private rarity: Rarity;

    constructor(id: string, name: string, description: string, price: number, image: string, rarity: Rarity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.rarity = rarity;
    }

    static From(json: { id: any; name: any; description: any; price: any; image: any; rarity: any; }) {
        return new Product(
            json.id,
            json.name,
            json.description,
            json.price,
            json.image,
            Rarity.From(json.rarity)
        );
    }
}