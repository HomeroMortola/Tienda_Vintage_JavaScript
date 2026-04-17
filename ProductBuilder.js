class ProductBuilder {

    constructor() {
        this.id = null;
        this.name = "";
        this.price = 0;
        this.stock = 0;
    }

    /**
     * @param {number} id
     */

    setId(id) {
        this.id = id;
        return this;
    }


    /**
     * @param {string} productName
     */
    setName(productName) {
        this.productName = productName;
        return this;
    }

    /**
     * @param {number} price
     */
    setPrice(price) {
        this.price = price;
        return this;
    }

    /**
     * @param {number} stock
     */

    setStock(stock) {
        this.stock = stock;
        return this;
    }


    /**
     * @returns {Product}
     */
    build() {
        return new Product(this);
    }
}

