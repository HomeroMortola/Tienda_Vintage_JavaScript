class Bandanna extends Product {        
   /**
   * @param {BandannaBuilder} builder 
   */
    constructor(builder) {
        super(builder.id, builder.price, builder.stock, builder.productName);
        this.size = builder.size;
        this.color = builder.color;
        Object.freeze(this);
    }
}


