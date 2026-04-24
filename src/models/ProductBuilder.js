export class ProductBuilder {

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
        if (typeof id !== "number" || id <= 0) {
            throw new Error("l id debe ser un numero mayor a cero");
        }
        this.id = id;
        return this;
    }

    /**
     * @param {string} productName
     */
    setName(productName) {
        if (!productName || productName.trim() === "") {
            throw new Error("el nombre del producto no puede estar vacio");
        }
        this.productName = productName;
        return this;
    }

    /**
     * @param {number} price
     */
    setPrice(price) {
        if (typeof price !== "number" || price <= 0) {
            throw new Error("el precio debe ser un numero mayor a cero");
        }
        this.price = price;
        return this;
    }

    /**
     * @param {number} stock
     */

    setStock(stock) {
        if (typeof stock !== "number" || stock < 0) {
            throw new Error("el stock no puede ser negativo");
        }
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

