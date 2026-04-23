class Sales{

    /**
     * @param {SaleBuilder} builder 
     */

    constructor(builder) {
        this.id = builder.id;
        this.client = builder.client;
        this.product = builder.product;
        this.quantity = builder.quantity;
        this.totalPrice = builder.totalPrice;
        this.prurchaseDate = builder.purchaseDate;
        Object.freeze(this);
    }
}