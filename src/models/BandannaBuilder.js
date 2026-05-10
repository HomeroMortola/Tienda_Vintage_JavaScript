import { Bandanna } from './Bandanna.js';
import { ProductBuilder } from './ProductBuilder.js';

export class BandannaBuilder extends ProductBuilder {
    constructor() {
        super();
        this.size = "";
        this.color = "";
    }

    reset() {
        super.reset();
        this.setMetaValue('size', "");
        this.setMetaValue('color', "");
        return this;
    }

    /**
     * @param {string} size
     */
    setSize(size) {
        this._validateString(size, "el tamaño no puede estar vacio");
        this.setMetaValue('size', size);
        return this;
    }

    /**
     * @param {string} color
     */
    setColor(color) {
        this._validateString(color, "el color no puede estar vacio");
        this.setMetaValue('color', color);
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

