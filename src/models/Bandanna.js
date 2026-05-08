import { Product } from './Product.js';

export class Bandanna extends Product {        
   /**
   * @param {BandannaBuilder} builder 
   */
    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.name, builder.image_url, builder.description, builder.category);
        this.metadata = { ...builder.product.metadata };
        this.size = this.metadata.size || "";
        this.color = this.metadata.color || "";
        Object.freeze(this);
    }
    getData() {
        return { ...super.getBaseData(), size: this.size, color: this.color };
    }
}


