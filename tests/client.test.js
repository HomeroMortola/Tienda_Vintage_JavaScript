import { describe, it, expect, beforeEach } from 'vitest';
import { ClientBuilder } from '../src/models/ClientBuilder.js';
import { Client } from '../src/models/Client.js';

describe('ClientBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new ClientBuilder();
    });

    it('construye un cliente con todos los datos correctos', () => {
        const client = builder
            .setId(1)
            .setName('Juan')
            .setSurname('Pérez')
            .setPhone(1234567890)
            .setDni(12345678)
            .setLocation('Corrientes')
            .build();

        expect(client.id).toBe(1);
        expect(client.name).toBe('Juan');
        expect(client.surname).toBe('Pérez');
        expect(client.phone).toBe(1234567890);
        expect(client.dni).toBe(12345678);
        expect(client.location).toBe('Corrientes');
    });


    it('falla si el nombre esta vacio', () => {
        expect(() => {
            builder.setName('').build();
        }).toThrow('el nombre no puede estar vacio');
    });


    it('falla si el nombre es solo espacios', () => {
        expect(() => {
            builder.setName('   ').build();
        }).toThrow('el nombre no puede estar vacio');
    });


    it('falla si el apellido esta vacio', () => {
        expect(() => {
            builder.setSurname('').build();
        }).toThrow('el apellido no puede estar vacio');
    });


    it('falla si el DNI contiene letras', () => {
        expect(() => {
            builder.setDni('ABC123').build();
        }).toThrow('el DNI solo puede contener numeros');
    });

    it('acepta un DNI numerico valido', () => {
        const client = builder.setDni(12345678).build();
        expect(client.dni).toBe(12345678);
    });

    it('falla si el DNI no tiene 8 digitos', () => {
    expect(() => {
        builder.setDni(123).build();
    }).toThrow('el DNI debe tener exactamente 8 digitos');
    });


    it('falla si el telefono contiene letras', () => {
        expect(() => {
            builder.setPhone('ABC123').build();
        }).toThrow('el telefono solo puede contener numeros');
    });


    it('falla si la ubicacion esta vacia', () => {
        expect(() => {
            builder.setLocation('').build();
        }).toThrow('la ubicacion no puede estar vacia');
    });

    it('falla si la ubicacion es solo espacios', () => {
        expect(() => {
            builder.setLocation('   ').build();
        }).toThrow('la ubicacion no puede estar vacia');
    });

});

describe('Client', () => {

    it('no permite modificar sus propiedades una vez creado', () => {
        const client = new ClientBuilder()
            .setId(1)
            .setName('Juan')
            .build();

        expect(() => {
            client.name = 'Otro nombre';
        }).toThrow();
    });

});
