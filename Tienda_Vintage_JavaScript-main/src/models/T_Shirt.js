class T_Shirt extends Product {        
   /**
   * @param {T_ShirtBuilder} builder 
   */
    constructor(builder) {
        super(builder.id, builder.price, builder.stock);
        this.size = builder.size;
        this.color = builder.color;
        Object.freeze(this);
    }
}