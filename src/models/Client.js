export class Client {

    /**
     * 
     * @param {ClientBuilder} builder 
     */

    constructor(builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.surname = builder.surname;
        this.phone = builder.phone;
        this.dni = builder.dni;
        this.location = builder.location;
        Object.freeze(this);
    }



}