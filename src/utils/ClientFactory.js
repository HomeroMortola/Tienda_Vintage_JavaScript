import { ClientBuilder } from '../models/ClientBuilder.js';



export const CLIENT_CONFIG = {
    builder: () => new ClientBuilder(),
    fields: [
        { id: 'phone', setter: 'setPhone' },
        { id: 'dni', setter: 'setDni' },
        { id: 'location', setter: 'setLocation' },
        { id: 'name', setter: 'setName'},
        { id: 'surname', setter: 'setSurame'},
        { id: 'password', setter: 'setPassword'},
    ]
};