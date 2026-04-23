class SaleBuilder{


    constructor() {
        this.id = 0;
        this.id_client = 0;
        this.id_product = 0;
        this.quantity = 0;
        this.totalPrice = 0;
        this.prurchaseDate = null;
    }


    /**
     * @param {number} id
     */

    setId(id) {
        this.id = id;
        return this;
    }


    /**
     * @param {number} id_client
     */
    setIdClient(id_client) {
        this.id_client = id_client;
        return this;
    }

    /**
     * @param {number} quantity
     */
    setQuantity(quantity) {
        this.quantity = quantity;
        return this;
    }

    /**
     * @param {number} id_product
     */

    setIdProduct(id_product) {
        this.id_product = id_product;
        return this;
    }

    /**
     * @param {number} totalPrice
     */

    setTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }


    setPurchaseDate(date = new Date()) {
        this.purchaseDate = date;
        return this;
    }


    /**
     * @returns {Sales}
     */
    build() {
        return new Sales(this);
    }
}

