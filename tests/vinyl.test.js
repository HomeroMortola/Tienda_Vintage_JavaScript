import { describe, it, expect, beforeEach } from 'vitest';
import { VinylsBuilder } from '../src/models/VinylsBuilder.js';

describe('VinylsBuilder', () => {

    let builder;

    beforeEach(() => {
        builder = new VinylsBuilder();
    });

    // construcción correcta

    it('construye un vinilo con todos los datos correctos', () => {
        const vinyl = builder
            .setName('Abbey Road')
            .setPrice(5000)
            .setStock(3)
            .setCategory('musica')
            .setDescription('Album icónico de The Beatles')
            .setImageUrl('https://imagen.com/abbey.jpg')
            .setArtist('The Beatles')
            .setAlbum('Abbey Road')
            .setGenre('Rock')
            .setYear(1969)
            .build();

        expect(vinyl.name).toBe('Abbey Road');
        expect(vinyl.price).toBe(5000);
        expect(vinyl.stock).toBe(3);
        expect(vinyl.category).toBe('musica');
        expect(vinyl.artist).toBe('The Beatles');
        expect(vinyl.album).toBe('Abbey Road');
        expect(vinyl.genre).toBe('Rock');
        expect(vinyl.year).toBe(1969);
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

    // validaciones propias de Vinyls

    it('falla si el artista esta vacio', () => {
        expect(() => {
            builder.setArtist('').build();
        }).toThrow('el artista no puede estar vacio');
    });

    it('falla si el album esta vacio', () => {
        expect(() => {
            builder.setAlbum('').build();
        }).toThrow('el album no puede estar vacio');
    });

    it('falla si el genero esta vacio', () => {
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

    it('acepta year como string numerico', () => {
        const vinyl = builder
            .setName('Mans Best Friend')
            .setPrice(5000)
            .setStock(3)
            .setCategory('musica')
            .setImageUrl('https://imagen.com/abbey.jpg')
            .setArtist('Sabrina Carpenter')
            .setAlbum('Mans Best Friend')
            .setGenre('Pop')
            .setYear('1969')
            .build();
        expect(vinyl.year).toBe(1969);
    });

    // reset automático después del build

    it('resetea los valores despues de build', () => {
        builder
            .setName('Nada Personal')
            .setPrice(5000)
            .setStock(3)
            .setCategory('musica')
            .setImageUrl('https://imagen.com/abbey.jpg')
            .setArtist('Soda Stereo')
            .setAlbum('Nada Personal')
            .setGenre('Rock')
            .setYear(1969)
            .build();

        expect(builder.name).toBe('');
        expect(builder.price).toBe(0);
        expect(builder.artist).toBe('');
        expect(builder.genre).toBe('');
        expect(builder.year).toBe(0);
    });

    // inmutabilidad

    it('no permite modificar sus propiedades una vez creado', () => {
        const vinyl = builder
            .setName('clics modernos')
            .setPrice(5000)
            .setStock(3)
            .setCategory('musica')
            .setImageUrl('https://imagen.com/abbey.jpg')
            .setArtist('Charly Garcia')
            .setAlbum('clics modernos')
            .setGenre('Rock')
            .setYear(1969)
            .build();

        expect(() => {
            vinyl.artist = 'Otro artista';
        }).toThrow();
    });

});