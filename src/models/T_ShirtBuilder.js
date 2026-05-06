import { T_Shirt } from './T_Shirt.js';
import { ProductBuilder } from './ProductBuilder.js';
export class T_ShirtBuilder extends ProductBuilder {

    constructor() {
        super();
        this.setMetaValue('size', "");
        this.setMetaValue('color', "");
    }


    /**
     * @param {string} size
     */
    setSize(size) {
        this.setMetaValue('size', size);
        return this;
    }

    /**
     * @param {string} color
     */
    setColor(color) {
        this.setMetaValue('color', color);
        return this;
    }


    /**
     * @returns {T_Shirt}
     */
    build() {
        return new T_Shirt(this);
    }
}

