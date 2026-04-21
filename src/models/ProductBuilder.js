class ProductBuilder {

    constructor() {
        this.reset();
    }

    reset() {
        this.id = 0;
        this.price = 0;
        this.stock = 0
        this.productName = "";
        return this;
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
        throw new Error("El metodo build() debe ser implementado por las clases hijas.");
    }
}

