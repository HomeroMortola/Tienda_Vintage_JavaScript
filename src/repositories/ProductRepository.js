import { supabase } from '../config/supabase.js'

export class ProductRepository {
    async getProducts() {
        const { data, error } = await supabase.from('products').select('*').eq('state', true);
        if (error) throw error;
        return data;
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
            .from('productos') 
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