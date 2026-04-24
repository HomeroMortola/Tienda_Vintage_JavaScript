import { ProductBuilder } from './ProductBuilder.js';
import { Bandanna } from './Bandanna.js';

export class BandannaBuilder extends ProductBuilder {
    constructor() {
        super();
        this.size = "";
        this.color = "";
    }

    reset() {
        super.reset();
        this.size = "";
        this.color = "";
        return this;
    }

    /**
     * @param {string} size
     */
    setSize(size) {
        if (!size || size.trim() === "") {
            throw new Error("el tamaño no puede estar vacio");
        }
        this.size = size;
        return this;
    }

    /**
     * @param {string} color
     */
    setColor(color) {
        if (!color || color.trim() === "") {
            throw new Error("el color no puede estar vacio");
        }
        this.color = color;
        return this;
    }


    /**
     * @returns {Bandanna}
     */
    build() {
        const bandanna = new Bandanna(this);
        this.reset();
        return bandanna;
    }
}

