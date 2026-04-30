import { supabase } from '../config/supabase.js'
import { PRODUCT_CONFIG } from '../utils/ProductFactory.js';

    export class ProductRepository {
        async getProducts() {
            const { data, error } = await supabase.from('products').select('*').eq('state', true);
            if (error) throw error;
    
            return data.map(item => this.mapToProductObject(item));
        }

    mapToProductObject(item) {
        const config = PRODUCT_CONFIG[item.category];

        const builder = config.builder();

        
        builder.setName(item.nombre)
               .setPrice(item.precio)
               .setStock(item.stock)
               .setCategory(item.category)
               .setDescription(item.descripcion);

        
        config.fields.forEach(campo => {
        const valorExtra = item.metadata[campo.id];
        builder[campo.setter]?.(valorExtra);
        });
        
        return builder.build();
    }


    async saveProduct(product) {
                
        const { id, name, price, stock, category, description, image_url, ...rest } = product;

        const dataForSupabase = {
                nombre: name,        
                precio: price,
                stock: stock,
                category: category,
                descripcion: description,
                image_url: image_url,
                metadata: rest   
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
    }