import { supabase } from '../config/supabase.js'

export class ProductRepository {
    async obtenerProductos() {
        const { data, error } = await supabase.from('productos').select('*')
        return data
    }
}