import { Product } from './Product.js';
export class Vinyls extends Product {        
   /**
   * @param {VinylsBuilder} builder 
   */

    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.name, builder.image_url, builder.description, builder.category);
        this.metadata = { ...builder.product.metadata };
        this.artist = this.metadata.artist || "";
        this.album = this.metadata.album || "";
        this.year = this.metadata.year || 0;
        this.genre = this.metadata.genre || "";
        Object.freeze(this);
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            artist: this.artist,
            album: this.album,
            year: this.year,
            genre: this.genre,
            image_url: this.image_url
        }
    }

}