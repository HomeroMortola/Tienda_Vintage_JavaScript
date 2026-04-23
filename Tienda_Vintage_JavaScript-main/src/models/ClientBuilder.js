class ClientBuilder {

    constructor() {
        this.id = null;
        this.name = "";
        this.surname = "";
        this.phone = null;
        this.dni = null;
        this.location = "";
    }

    /**
     * @param {number} id
     */

    setId(id) {
        this.id = id;
        return this;
    }


    /**
     * @param {string} name
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * @param {string} surName
     */
    setSurName(surName) {
        this.surName = surName;
        return this;
    }

    /**
     * @param {number} phone
     */

    setPhone(phone) {
        this.phone = phone;
        return this;
    }


    /**
     * @param {number} dni
     */

    setDni(dni) {
        this.dni = dni;
        return this;
    }

    /**
     * @param {string} location
     */

    setLocation(location) {
        this.location = location;
        return this;
    }


    /**
     * @returns {Client}
     */
    build() {
        return new Client(this);
    }
}

