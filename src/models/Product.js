class Product {
        
   /**
   * @param {ProductBuilder} builder 
   */

    constructor(builder) {
        this.id = builder.id;
        this.name = builder.productName;
        this.price = builder.price;
        this.stock = builder.stock;
        Object.freeze(this);
    }

}