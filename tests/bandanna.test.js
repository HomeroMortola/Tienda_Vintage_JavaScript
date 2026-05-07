import { describe, it, expect, beforeEach } from 'vitest';
import { BandannaBuilder } from '../src/models/BandannaBuilder.js';

describe('BandannaBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new BandannaBuilder();
    });

    // construcción correcta

    it('construye una bandana con todos los datos correctos', () => {
        const bandanna = builder
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(10)
            .setCategory('accesorios')
            .setDescription('Bandana vintage')
            .setImageUrl('https://imagen.com/bandana.jpg')
            .setSize('M')
            .setColor('Rojo')
            .build();

        expect(bandanna.name).toBe('Bandana clasica');
        expect(bandanna.price).toBe(1500);
        expect(bandanna.stock).toBe(10);
        expect(bandanna.category).toBe('accesorios');
        expect(bandanna.size).toBe('M');
        expect(bandanna.color).toBe('Rojo');
    });

    // validaciones heredadas de ProductBuilder

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
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(0)
            .setCategory('accesorios')
            .setImageUrl('https://imagen.com/bandana.jpg')
            .setSize('M')
            .setColor('Rojo')
            .build();
        expect(bandanna.stock).toBe(0);
    });

    it('falla si la categoria esta vacia', () => {
        expect(() => {
            builder.setCategory('').build();
        }).toThrow('la categoría no puede estar vacía');
    });

    it('falla si la imagen esta vacia', () => {
        expect(() => {
            builder.setImageUrl('').build();
        }).toThrow('la URL de la imagen no puede estar vacia');
    });

    // validaciones propias de Bandanna

    it('falla si el tamaño esta vacio', () => {
        expect(() => {
            builder.setSize('').build();
        }).toThrow('el tamaño no puede estar vacio');
    });

    it('falla si el color esta vacio', () => {
        expect(() => {
            builder.setColor('').build();
        }).toThrow('el color no puede estar vacio');
    });

    // reset automático después del build

    it('resetea los valores despues de build', () => {
        builder
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(10)
            .setCategory('accesorios')
            .setImageUrl('https://imagen.com/bandana.jpg')
            .setSize('M')
            .setColor('Rojo')
            .build();

        expect(builder.name).toBe('');
        expect(builder.price).toBe(0);
        expect(builder.size).toBe('');
        expect(builder.color).toBe('');
    });

    // inmutabilidad 

    it('no permite modificar sus propiedades una vez creada', () => {
        const bandanna = builder
            .setName('Bandana clasica')
            .setPrice(1500)
            .setStock(10)
            .setCategory('accesorios')
            .setImageUrl('https://imagen.com/bandana.jpg')
            .setSize('M')
            .setColor('Rojo')
            .build();

        expect(() => {
            bandanna.color = 'Azul';
        }).toThrow();
    });

});