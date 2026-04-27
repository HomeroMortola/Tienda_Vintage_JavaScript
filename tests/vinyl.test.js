import { describe, it, expect, beforeEach } from 'vitest';
import { VinylsBuilder } from '../src/models/VinylsBuilder.js';

describe('VinylsBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new VinylsBuilder();
    });

    
    it('construye un vinilo con todos los datos correctos', () => { //verificando que se este construyendo
        const vinyl = builder
            .setId(3)
            .setName('Aaaaaa')
            .setPrice(5000)
            .setStock(3)
            .setArtist('The Beatles')
            .setGenre('Rock')
            .setYear(1969)
            .build();

        expect(vinyl.id).toBe(3);
        expect(vinyl.productName).toBe('Aaaaaa');
        expect(vinyl.price).toBe(5000);
        expect(vinyl.stock).toBe(3);
        expect(vinyl.artist).toBe('The Beatles');
        expect(vinyl.genre).toBe('Rock');
        expect(vinyl.year).toBe(1969);
    });

    //verificando que se este heredando de productBuilder

    it('falla si el nombre esta vacio', () => {
        expect(() => {
            builder.setName('').build();
        }).toThrow('el nombre del producto no puede estar vacio');
    });

    it('falla si el precio es cero', () => {
        expect(() => {
            builder.setPrice(0).build();
        }).toThrow('el precio debe ser un numero mayor a cero');
    });

    it('falla si el precio es negativo', () => {
        expect(() => {
            builder.setPrice(-100).build();
        }).toThrow('el precio debe ser un numero mayor a cero');
    });

    it('falla si el stock es negativo', () => {
        expect(() => {
            builder.setStock(-1).build();
        }).toThrow('el stock no puede ser negativo');
    });

    // viendo que se cumpla los datos propios de vinyl

    it('falla si el artista está vacío', () => {
        expect(() => {
            builder.setArtist('').build();
        }).toThrow('el artista no puede estar vacio');
    });

    it('falla si el genero está vacio', () => {
        expect(() => {
            builder.setGenre('').build();
        }).toThrow('el genero no puede estar vacio');
    });

    it('falla si el year es menor a 1900', () => {
        expect(() => {
            builder.setYear(1800).build();
        }).toThrow('el year debe ser un numero entre 1900 y el year actual');
    });

    it('falla si el year es mayor al year actual', () => {
        expect(() => {
            builder.setYear(2099).build();
        }).toThrow('el year debe ser un numero entre 1900 y el year actual');
    });

    //Reset automatico despues del build

    it('resetea los valores después de build', () => {
        builder
            .setId(3)
            .setName('Aaaaaa')
            .setPrice(5000)
            .setStock(3)
            .setArtist('Sabrina Carpenter')
            .setGenre('Pop')
            .setYear(2025)
            .build();

        expect(builder.productName).toBe('');
        expect(builder.price).toBe(0);
        expect(builder.artist).toBe('');
        expect(builder.genre).toBe('');
        expect(builder.year).toBe(0);
    });

    //debe ser inmutable

    it('no permite modificar sus propiedades una vez creado', () => {
        const vinyl = builder
            .setId(3)
            .setName('Aaaaaa')
            .setPrice(5000)
            .setStock(3)
            .setArtist('Sabrina Carpenter')
            .setGenre('Pop')
            .setYear(2025)
            .build();

        expect(() => {
            vinyl.artist = 'Otro artista';
        }).toThrow();
    });

});