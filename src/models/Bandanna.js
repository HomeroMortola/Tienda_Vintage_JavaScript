class Bandanna {        
   /**
   * @param {BandannaBuilder} builder 
   */
    constructor(builder) {
        this.id = builder.id;
        this.size = builder.size;
        this.color = builder.color;
        this.price = builder.price;
        this.stock = builder.stock;
        Object.freeze(this);
    }
}