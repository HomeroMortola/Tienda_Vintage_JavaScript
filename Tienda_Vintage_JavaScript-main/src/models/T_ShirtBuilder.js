class T_ShirtBuilder extends ProductBuilder {
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
     * @returns {T_Shirt}
     */
    build() {
        const t_shirt = new T_Shirt(this);
        this.reset();
        return t_shirt;
    }
}

