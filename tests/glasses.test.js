import { describe, it, expect, beforeEach } from 'vitest';
import { GlasesBuilder } from '../src/models/GlasesBuilder.js';

describe('GlasesBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new GlasesBuilder();
    });

    // construcción correcta

    it('construye unos anteojos con todos los datos correctos', () => {
        const glases = builder
            .setName('Anteojos vintage')
            .setPrice(3200)
            .setStock(5)
            .setCategory('accesorios')
            .setDescription('Anteojos de sol vintage')
            .setImageUrl('https://imagen.com/anteojos.jpg')
            .setColor('Negro')
            .setShape('redondo')
            .build();

        expect(glases.name).toBe('Anteojos vintage');
        expect(glases.price).toBe(3200);
        expect(glases.stock).toBe(5);
        expect(glases.category).toBe('accesorios');
        expect(glases.color).toBe('Negro');
        expect(glases.shape).toBe('redondo');
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

    // validaciones propias de los anteojitoss

    it('falla si el color esta vacio', () => {
        expect(() => {
            builder.setColor('').build();
        }).toThrow('el color no puede estar vacio');
    });

    it('falla si la forma esta vacia', () => {
        expect(() => {
            builder.setShape('').build();
        }).toThrow('la forma no puede estar vacia');
    });

    // reset automático después del build

    it('resetea los valores despues de build', () => {
        builder
            .setName('Anteojos vintage')
            .setPrice(3200)
            .setStock(5)
            .setCategory('accesorios')
            .setImageUrl('https://imagen.com/anteojos.jpg')
            .setColor('Negro')
            .setShape('redondo')
            .build();

        expect(builder.name).toBe('');
        expect(builder.price).toBe(0);
        expect(builder.color).toBe('');
    });

    // inmutabilidad

    it('no permite modificar sus propiedades una vez creados', () => {
        const glases = builder
            .setName('Anteojos vintage')
            .setPrice(3200)
            .setStock(5)
            .setCategory('accesorios')
            .setImageUrl('https://imagen.com/anteojos.jpg')
            .setColor('Negro')
            .setShape('redondo')
            .build();

        expect(() => {
            glases.color = 'Blanco';
        }).toThrow();
    });

});