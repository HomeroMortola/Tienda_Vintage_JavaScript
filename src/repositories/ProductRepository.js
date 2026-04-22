import { supabase } from '../config/supabase.js'

export class ProductRepository {
    async getProducts() {
        const { data, error } = await supabase.from('productos').select('*')
        if (error) throw error
        return data
    }
}