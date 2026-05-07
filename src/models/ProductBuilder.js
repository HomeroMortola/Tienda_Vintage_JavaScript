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

    /**
     * @param {string} name
     */
    setName(name) {
        if (!name || name.trim() === "") {
            throw new Error("el nombre del producto no puede estar vacio");
        }
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
        if (!category || category.trim() === "") {
            throw new Error("la categoría no puede estar vacía");
        }
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
        if (!publicUrl || publicUrl.trim() === "") {
            throw new Error("la URL de la imagen no puede estar vacia");
        }
        this.image_url = publicUrl  ;
        return this;
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

