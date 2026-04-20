class BandannaBuilder {
    constructor() {
        this.id = 0;
        this.size = "";
        this.color = "";
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
     * @param {string} size
     */
    setSize(size) {
        this.size = size;
        return this;
    }

    /**
     * @param {string} color
     */
    setColor(color) {
        this.color = color;
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
     * @returns {Client}
     */
    build() {
        return new Client(this);
    }
}

