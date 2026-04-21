class VinylsBuilder extends ProductBuilder {

    constructor() {
        super();
        this.name_vinyls= "";
        this.year = 0;
        this.genre = "";
        this.artist = "";
    }   

    reset() {
        super.reset();
        this.name_vinyls = "";
        this.year = 0;
        this.genre = "";
        this.artist = "";
        return this;
    }



    /**
     * @param {string} VinylsName
     */
    setName(VinylsName) {
        this.VinylsName = VinylsName;
        return this;
    }

    /**
     * @param {number} price
     */
    setPrice(price) {
        this.price = price;
        return this;
    }

    /**
     * @param {number} stock
     */

    setStock(stock) {
        this.stock = stock;
        return this;
    }

    /**
     * @param {string} artist
     */

    setArtist(artist) {
        this.artist = artist;
        return this;
    }

    /**
     * @param {string} genre
     */

    setGenre(genre) {
        this.genre = genre;
        return this;
    }

    /**
     * @param {number} year
     */

    setYear(year) {
        this.year = year;
        return this;
    }


    /**
     * @returns {Vinyls}
     */
    build() {
        const vinyls = new Vinyls(this);
        this.reset();
        return vinyls;
    }
}

