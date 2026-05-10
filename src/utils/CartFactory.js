import { ShoppingCartBuilder } from '../models/ShoppingCartBuilder.js';

export const CART_CONFIG = {
    builder: () => new ShoppingCartBuilder(),
    fields: [
        { id: 'userId', setter: 'setUserId' },
        { id: 'items', setter: 'setItems' }
    ]
};