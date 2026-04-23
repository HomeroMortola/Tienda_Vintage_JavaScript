class GlasesBuilder extends ProductBuilder {

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
        this.color = color;
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

