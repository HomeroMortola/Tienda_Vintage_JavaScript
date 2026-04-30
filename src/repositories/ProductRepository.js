import { supabase } from '../config/supabase.js'
import { PRODUCT_CONFIG } from '../utils/ProductFactory.js';

    export class ProductRepository {
        async getProducts() {
            const { data, error } = await supabase.from('products').select('*').eq('state', true);
            if (error) throw error;
    
            return (data || [])
            .map(item => this.mapToProductObject(item))
            .filter(p => p !== null); 
        }

    mapToProductObject(item) {
        const rawCategory = item.category ? item.category.trim() : "";
        const config = PRODUCT_CONFIG[rawCategory];
    
        
        if (!config) {
            console.error(`ERROR: La categoría "${rawCategory}" (del producto ${item.name}) no existe en PRODUCT_CONFIG.`);
            console.log("Categorías disponibles:", Object.keys(PRODUCT_CONFIG));
            return null;
        }

        const builder = config.builder();   

        
        builder.setName(item.name);
        builder.setPrice(item.price);
        builder.setStock(item.stock ?? 0);
        builder.setCategory(item.category.trim());  
        builder.setDescription(item.description);
        builder.setImageUrl(item.image_url);

        
        if (item.metadata) {
        config.fields.forEach(campo => {
            const valorExtra = item.metadata[campo.id];
            if (valorExtra && builder[campo.setter]) {
                builder[campo.setter](valorExtra);
            }
        });
    }
        
        return builder.build();
    }


    async saveProduct(product) {

        const dataForSupabase = {
                name: product.name,        
                price: product.price,
                stock: product.stock,
                category: product.category,
                description: product.description,
                image_url: product.image_url,
                metadata: product.metadata || {}  
            };

        const { data, error } = await supabase
                .from('products') 
                .insert([dataForSupabase])
                .select();

            if (error) {
                console.error("Error al guardar en Supabase:", error.message);
                throw error;
            }
            try {
            await fetch('http://localhost:3000/createproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataForSupabase) 
            });
            console.log("Enviado exitosamente al servidor local (app.js)");
            } 
            catch (err) {
            console.error("Error al conectar con app.js:", err);
            }

        return data[0];

        };

async getProductsByCategory(categoryName) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryName) 
        .eq('state', true);

    if (error) {
        console.error(`Error al traer ${categoryName}:`, error);
        throw error;
    }

    return (data || [])
        .map(item => this.mapToProductObject(item))
        .filter(Boolean); 
    };
}
