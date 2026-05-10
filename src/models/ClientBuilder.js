import { Client } from './Client.js';

export class ClientBuilder {

    constructor() {
        this.reset();
    }


    reset() {
        this.Client = {
            id: null,
            name: "",
            surname: "",
            phone: null,
            dni: null,
            location: "",
            email : "",
            password : ""
        };

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
     * @param {string} surname
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
    if (typeof phone === "string" && !/^\d+$/.test(phone)) {  
        throw new Error("el telefono solo puede contener numeros");
    }
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
    if (!location || location.trim() === "") {
        throw new Error("la ubicacion no puede estar vacia");
    }
        this.location = location;
        return this;
    }

    /**
     * @param {string} email
     */
    setEmail(email) {
    if (!email || email.trim() === "") {
        throw new Error("el correo electrónico no puede estar vacio");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("el correo electrónico no es válido");
    }
    this.email = email;
    return this;
    }

    setPassword(password){
        if (!password || password.trim() === "") {
        throw new Error("la contraseña no puede estar vacia");
    }
    this.password = password;
    return this;
    }

    


    /**
     * @returns {Client}
     */
    build() {
        return new Client(this);
        r
    }
}

