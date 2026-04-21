class BandannaBuilder extends ProductBuilder {
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
     * @returns {Bandanna}
     */
    build() {
        const bandanna = new Bandanna(this);
        this.reset();
        return bandanna;
    }
}

