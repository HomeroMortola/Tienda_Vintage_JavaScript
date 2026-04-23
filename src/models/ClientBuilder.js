import { Client } from './Client.js';

export class ClientBuilder {

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
    if (!name || name.trim() === "") {
        throw new Error("el nombre no puede estar vacio");
    }
    this.name = name;
    return this;
    }

    /**
     * @param {string} surName
     */
    setSurname(surname) {
    if (!surname || surname.trim() === "") {
        throw new Error("el apellido no puede estar vacio");
    }
    this.surname = surname;
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
    if (typeof dni === "string" && !/^\d+$/.test(dni)) {  //  /^\d+$/ siginifica solo numero del 0 al 9
        throw new Error("el DNI solo puede contener numeros");
    }
    
    const dniString = String(dni);
    if (dniString.length !== 8) {
        throw new Error("el DNI debe tener exactamente 8 digitos");
    }
    
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

