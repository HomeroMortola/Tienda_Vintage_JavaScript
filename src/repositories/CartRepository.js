import { supabase } from '../config/supabase.js';
import { ProductRepository } from './ProductRepository.js';


const userId = localStorage.getItem('usuarioId');
if (!userId) {
    window.location.href = 'register.html'; // Protegemos la vista
}

export class CartRepository {
    constructor() {
        this.productRepo = new ProductRepository();
    }

    async getCart(userId) {
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                id,
                quantity,
                product_id,
                products (*) 
            `) // Hacemos un "join" con la tabla de productos
            .eq('user_id', userId);

        if (error) throw error;

        // Mapeamos los datos para que usen tus clases de Producto (Vinilo, Anteojos, etc)
        const items = data.map(item => ({
            cartItemId: item.id,
            quantity: item.quantity,
            product: this.productRepo.mapToProductObject(item.products)
        }));

        return items;
    }

    /**
     * Agrega un producto al carrito o aumenta su cantidad
     */
    async addToCart(userId, productId, quantity = 1) {
        // Primero verificamos si el producto ya está en el carrito
        const { data: existing } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)
            .eq('product_id', productId)
            .single();

        if (existing) {
            // Si existe, aumentamos la cantidad
            return await supabase
                .from('cart_items')
                .update({ quantity: existing.quantity + quantity })
                .eq('id', existing.id);
        } else {
            // Si no existe, lo insertamos
            return await supabase
                .from('cart_items')
                .insert([{ user_id: userId, product_id: productId, quantity }]);
        }
    }

    /**
     * Elimina un item específico del carrito
     */
    async removeItem(cartItemId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', cartItemId);
        
        if (error) throw error;
    }

    /**
     * Vacía el carrito (útil después de una compra exitosa)
     */
    async clearCart(userId) {
        await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', userId);
    }
}