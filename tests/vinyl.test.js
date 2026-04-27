import { describe, it, expect, beforeEach } from 'vitest';
import { VinylsBuilder } from '../src/models/VinylsBuilder.js';

describe('VinylsBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new VinylsBuilder();
    });

    // ── Construcción correcta ──────────────────────────────

    it('construye un vinilo con todos los datos correctos', () => {
        const vinyl = builder
            .setId(3)
            .setName('Abbey Road')
            .setPrice(5000)
            .setStock(3)
            .setArtist('The Beatles')
            .setGenre('Rock')
            .setYear(1969)
            .build();

        expect(vinyl.id).toBe(3);
        expect(vinyl.productName).toBe('Abbey Road');
        expect(vinyl.price).toBe(5000);
        expect(vinyl.stock).toBe(3);
        expect(vinyl.artist).toBe('The Beatles');
        expect(vinyl.genre).toBe('Rock');
        expect(vinyl.year).toBe(1969);
    });

    // ── Validaciones heredadas de ProductBuilder ───────────

    it('falla si el nombre está vacío', () => {
        expect(() => {
            builder.setName('').build();
        }).toThrow('El nombre del producto no puede estar vacío');
    });

    it('falla si el precio es cero', () => {
        expect(() => {
            builder.setPrice(0).build();
        }).toThrow('El precio debe ser un número mayor a cero');
    });

    it('falla si el precio es negativo', () => {
        expect(() => {
            builder.setPrice(-100).build();
        }).toThrow('El precio debe ser un número mayor a cero');
    });

    it('falla si el stock es negativo', () => {
        expect(() => {
            builder.setStock(-1).build();
        }).toThrow('El stock no puede ser negativo');
    });

    // ── Validaciones propias de Vinyls ─────────────────────

    it('falla si el artista está vacío', () => {
        expect(() => {
            builder.setArtist('').build();
        }).toThrow('El artista no puede estar vacío');
    });

    it('falla si el género está vacío', () => {
        expect(() => {
            builder.setGenre('').build();
        }).toThrow('El género no puede estar vacío');
    });

    it('falla si el año es menor a 1900', () => {
        expect(() => {
            builder.setYear(1800).build();
        }).toThrow('El año debe ser un número entre 1900 y el año actual');
    });

    it('falla si el año es mayor al año actual', () => {
        expect(() => {
            builder.setYear(2099).build();
        }).toThrow('El año debe ser un número entre 1900 y el año actual');
    });

    // ── Reset automático después del build ─────────────────

    it('resetea los valores después de build', () => {
        builder
            .setId(3)
            .setName('Abbey Road')
            .setPrice(5000)
            .setStock(3)
            .setArtist('The Beatles')
            .setGenre('Rock')
            .setYear(1969)
            .build();

        expect(builder.productName).toBe('');
        expect(builder.price).toBe(0);
        expect(builder.artist).toBe('');
        expect(builder.genre).toBe('');
        expect(builder.year).toBe(0);
    });

    // ── Inmutabilidad ──────────────────────────────────────

    it('no permite modificar sus propiedades una vez creado', () => {
        const vinyl = builder
            .setId(3)
            .setName('Abbey Road')
            .setPrice(5000)
            .setStock(3)
            .setArtist('The Beatles')
            .setGenre('Rock')
            .setYear(1969)
            .build();

        expect(() => {
            vinyl.artist = 'Otro artista';
        }).toThrow();
    });

});