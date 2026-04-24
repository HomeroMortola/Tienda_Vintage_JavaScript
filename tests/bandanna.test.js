import { describe, it, expect, beforeEach } from 'vitest';
import { BandannaBuilder } from '../src/models/BandannaBuilder.js';

describe('BandannaBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new BandannaBuilder();
    });

it('construye una bandana con todos los datos correctos', () => { //verificando que se este construyendo
        const bandanna = builder
            .setId(1)
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(10)
            .setSize('M')
            .setColor('Rojo')
            .build();

        expect(bandanna.id).toBe(1);
        expect(bandanna.productName).toBe('Bandana clasica');
        expect(bandanna.price).toBe(1500);
        expect(bandanna.stock).toBe(10);
        expect(bandanna.size).toBe('M');
        expect(bandanna.color).toBe('Rojo');
    });

    // verificando que se este heredando de productBuilder
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

    it('acepta stock en cero', () => {
        const bandanna = builder
            .setId(1)
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(0)
            .setSize('M')
            .setColor('Rojo')
            .build();
        expect(bandanna.stock).toBe(0);
    });

    // validando la bandanna ahora
    it('falla si el tamaño esta vacio', () => {
        expect(() => {
            builder.setSize('').build();
        }).toThrow('el tamaño no puede estar vacio');
    });

    it('falla si el color está vacio', () => {
        expect(() => {
            builder.setColor('').build();
        }).toThrow('el color no puede estar vacio');
    });

    //Reset automatico despues del build
     it('resetea los valores después de build', () => {
        builder
            .setId(1)
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(10)
            .setSize('M')
            .setColor('Rojo')
            .build();

        expect(builder.productName).toBe('');
        expect(builder.price).toBe(0);
        expect(builder.size).toBe('');
        expect(builder.color).toBe('');
    });

    // Inmutabilidad del producto creado
    it('no permite modificar sus propiedades una vez creada', () => {
        const bandanna = builder
            .setId(1)
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(10)
            .setSize('M')
            .setColor('Rojo')
            .build();

        expect(() => {
            bandanna.color = 'Azul';
        }).toThrow();
    });







});