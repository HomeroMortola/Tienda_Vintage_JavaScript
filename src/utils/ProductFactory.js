import { T_ShirtBuilder } from '../models/T_ShirtBuilder.js';
import { VinylsBuilder } from '../models/VinylsBuilder.js';
import { GlasesBuilder } from '../models/GlasesBuilder.js';
import { BandannaBuilder } from '../models/BandannaBuilder.js';


export const PRODUCT_CONFIG = {
    T_Shirt : {
        builder: () => new T_ShirtBuilder(),
        fields: [
            {id: 'size', label: 'Talla', type: 'select', options: ['S', 'M', 'L', 'XL'], setter: 'setSize'},
            {id: 'color', label: 'Color', type: 'text', setter: 'setColor'}
        ]
    },

    Vinyls : {
        builder: () => new VinylsBuilder(),
        fields: [
            {id: 'artist', label: 'Artista', type: 'text', setter: 'setArtist'},
            {id: 'album', label: 'Album', type: 'text', setter: 'setAlbum'},
            {id: 'year', label: 'Año', type: 'number', setter: 'setYear'},
            {id: 'genre', label: 'Genero', type: 'text', setter: 'setGenre'}
        ]
    },

    Glases : {
        builder: () => new GlasesBuilder(),
        fields: [
            {id: 'shape', label: 'Forma', type: 'text', setter: 'setShape'},
            {id: 'color', label: 'Color', type: 'text', setter: 'setColor'}
        ]
    },

    Bandanna : {
        builder: () => new BandannaBuilder(),
        fields: [
            {id: 'size', label: 'Talla', type: 'select', options: ['S', 'M', 'L', 'XL'], setter: 'setSize'},
            {id: 'color', label: 'Color', type: 'text', setter: 'setColor'}
        ]
    }




}