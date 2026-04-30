import { Product } from './Product.js';
export class T_Shirt extends Product {        
   /**
   * @param {T_ShirtBuilder} builder 
   */
    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.name, builder.image_url, builder.description, builder.category);
        this.size = builder.size;
        this.color = builder.color;
        Object.freeze(this);
    }

    getData() {
        return {
            id: this.id,
            name: this.name ,
            price: this.price,
            stock: this.stock,
            size: this.size,
            color: this.color,
            image_url: this.image_url
        }
    }
}