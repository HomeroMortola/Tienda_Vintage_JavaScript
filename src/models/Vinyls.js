import { Product } from './Product.js';

export class Vinyls extends Product {        
   /**
   * @param {VinylsBuilder} builder 
   */

    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.productName);
        this.artist = builder.artist;
        this.year = builder.year;
        this.genre = builder.genre;
        Object.freeze(this);
    }

}