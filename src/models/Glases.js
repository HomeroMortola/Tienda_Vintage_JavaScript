import { Product } from './Product.js';

export class Glases extends Product {
        
   /**
   * @param {GlasesBuilder} builder 
   */

    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.productName, builder.image_url);
        this.color = builder.color;
        this.shape = builder.shape;
        Object.freeze(this);
    }

    getData() {
        return {
            id: this.id,
            name: this.productName,
            price: this.price,
            stock: this.stock,
            color: this.color,
            image_url: this.image_url
        }
    }

}