import { Glases } from './Glases.js';
import { ProductBuilder } from './ProductBuilder.js';

export class GlasesBuilder extends ProductBuilder {

    constructor() {
        super();
        this.color = "";
        this.shape = "";
    }

    reset() {
        super.reset();
        this.setMetaValue('color', "");
        this.setMetaValue('shape', "");
        return this;
    }

    /**
     * @param {string} color
     */

    setColor(color) {
        if (!color || color.trim() === "") {
            throw new Error("el color no puede estar vacio");
        }
        this.setMetaValue('color', color);
        return this;
    }

    /**
     * @param {string} shape
     */

    setShape(shape) {
        if (!shape || shape.trim() === "") {
            throw new Error("la forma no puede estar vacia");
        }
        this.setMetaValue('shape', shape);
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

