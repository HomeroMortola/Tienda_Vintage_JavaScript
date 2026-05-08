export class Product {
    constructor(id, price, stock, name, image_url, description, category) {
        this.id = id;
        this.price = price;
        this.stock = stock;
        this.name = name;
        this.image_url = image_url;
        this.description = description;
        this.category = category;
    }

    getBaseData() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            image_url: this.image_url
        };
    }
}