import { describe, it, expect, beforeEach } from 'vitest';
import { GlasesBuilder } from '../src/models/GlasesBuilder.js';

describe('GlasesBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new GlasesBuilder();
    });

    //construyee productou

    it('construye unos anteojos con todos los datos correctos', () => {
        const glases = builder
            .setId(2)
            .setName('Anteojos vintage')
            .setPrice(3200)
            .setStock(5)
            .setColor('Negro')
            .build();

        expect(glases.id).toBe(2);
        expect(glases.productName).toBe('Anteojos vintage');
        expect(glases.price).toBe(3200);
        expect(glases.stock).toBe(5);
        expect(glases.color).toBe('Negro');
    });

    // a ver si hereda

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

    // datos de anteojitos

    it('falla si el color esta vacio', () => {
        expect(() => {
            builder.setColor('').build();
        }).toThrow('el color no puede estar vacio');
    });

    //  Reset automatico despues del build

    it('resetea los valores después de build', () => {
        builder
            .setId(2)
            .setName('Anteojos vintage')
            .setPrice(3200)
            .setStock(5)
            .setColor('Negro')
            .build();

        expect(builder.productName).toBe('');
        expect(builder.price).toBe(0);
        expect(builder.color).toBe('');
    });

    // Inmutabilidad

    it('no permite modificar sus propiedades una vez creados', () => {
        const glases = builder
            .setId(2)
            .setName('Anteojos vintage')
            .setPrice(3200)
            .setStock(5)
            .setColor('Negro')
            .build();

        expect(() => {
            glases.color = 'Blanco';
        }).toThrow();
    });

});