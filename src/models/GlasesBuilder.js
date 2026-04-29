import { ProductBuilder } from './ProductBuilder.js';
import { Glases } from './Glases.js';

export class GlasesBuilder extends ProductBuilder {

    constructor() {
        super();
        this.color = "";
    }

    reset() {
        super.reset();
        this.color = "";
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
     * @param {string} shape
     */

    setShape(shape) {
        if (!shape || shape.trim() === "") {
            throw new Error("la forma no puede estar vacia");
        }
        this.shape = shape;
        return this;
    }

    /**
     * @returns {Glases}
     */
    build() {
        const glases = new Glases(this);
        this.reset();
        return glases;
    }
}

