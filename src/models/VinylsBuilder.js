import { ProductBuilder } from './ProductBuilder.js';
import { Vinyls } from './Vinyls.js';

export class VinylsBuilder extends ProductBuilder {

    constructor() {
        super();
        this.year = 0;
        this.genre = "";
        this.artist = "";
    }   

    reset() {
        super.reset();
        this.year = 0;
        this.genre = "";
        this.artist = "";
        return this;
    }


    /**
     * @param {string} artist
     */
    setArtist(artist) {
        if (!artist || artist.trim() === "") {
            throw new Error("el artista no puede estar vacio");
        }
        this.artist = artist;
        return this;
    }

    /**
     * @param {string} album
     */
    setAlbum(album) {
        if (!album || album.trim() === "") {
            throw new Error("el album no puede estar vacio");
        }
        this.album = album;
        return this;
    }

    /**
     * @param {string} genre
     */

    setGenre(genre) {
        if (!genre || genre.trim() === "") {
            throw new Error("el genero no puede estar vacio");
        }
        this.genre = genre;
        return this;
    }

    /**
     * @param {number} year
     */

    setYear(year) {
        if (typeof year !== "number" || year < 1900 || year > new Date().getFullYear()) {
            throw new Error("el year debe ser un numero entre 1900 y el year actual");
        }
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

