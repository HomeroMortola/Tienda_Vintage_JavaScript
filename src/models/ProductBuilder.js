export class ProductBuilder {

    constructor() {
        this.reset();
    }

    reset() {
        this.product = {
            id : null,
            price: 0,
            stock: 0,
            name: "",
            image_url: "",
            description: "",
            category: "",
            metadata: {}
        };
        
        return this;
    }

    setId(id){
        this.id = id;
        return this;
    }
    /**
     * @param {string} name
     */
    setName(name) {
        this._validateString(name, "el nombre del producto no puede estar vacio");
        this.name = name;
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
     * @param {string} category
     */
    setCategory(category) {
        this._validateString(category, "la categoría no puede estar vacía");
        this.category = category;
        return this;
    }
    /**
     * @param {string} description
     */
    setDescription(description) {
        this.description = description;
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
     * @param {string} publicUrl
     */
    setImageUrl(publicUrl) {
        this._validateString(publicUrl, "la URL de la imagen no puede estar vacia");
        this.image_url = publicUrl;
        return this;
    }

    _validateString(value, errorMessage) {
        if (!value || value.trim() === "") {
            throw new Error(errorMessage);
        }
    }

    setMetaValue(key, value) {
        this.product.metadata[key] = value;
        return this;
    }

    
    /**
     * @returns {Product}
     */
    build() {
        throw new Error("El metodo build() debe ser implementado por las clases hijas.");
    }
}

