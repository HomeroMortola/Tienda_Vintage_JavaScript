import { Product } from './Product.js';
export class Glases extends Product {
        
   /**
   * @param {GlasesBuilder} builder 
   */

    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.name, builder.image_url, builder.description, builder.category);
        this.metadata = { ...builder.product.metadata };
        this.shape = this.metadata.shape || "";
        this.color = this.metadata.color || "";
        Object.freeze(this);
    }

    getData() {
        return {
            id: this.id,
            name: this.name ,
            price: this.price,
            stock: this.stock,
            shape: this.shape,
            color: this.color,
            image_url: this.image_url
        }
    } 
}