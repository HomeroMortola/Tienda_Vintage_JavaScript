import { supabase } from '../config/supabase.js'; //
import { CLIENT_CONFIG } from '../utils/ClientFactory.js';

export class ClientRepository {
    
    /**
     * Obtiene todos los clientes activos.
     */
    async getClients() {
        const { data, error } = await supabase
            .from('clients')
            .select('*')

        if (error) throw error;

        return (data || [])
            .map(item => this.mapToClientObject(item))
            .filter(c => c !== null);
    }

    /**
     * Transforma la data de Supabase en una instancia de Client usando el Builder.
     */
    mapToClientObject(item) {
        if (!item) return null;

        const builder = CLIENT_CONFIG.builder(); //

        try {
            builder
                .setId(item.id)
                .setName(item.name)
                .setSurname(item.surname)
                .setPhone(item.phone)
                .setDni(item.dni)
                .setLocation(item.location)
                .setPassword(item.password);

            return builder.build(); //
        } catch (error) {
            console.error(`Error construyendo el cliente ${item.id}:`, error.message);
            return null;
        }
    }

    
    async saveClient(client) {
        const dataForSupabase = {
            name: client.name,
            surname: client.surname,
            phone: client.phone,
            dni: client.dni,
            location: client.location,
            password: client.password,
        };

        const { data, error } = await supabase
            .from('clients')
            .insert([dataForSupabase])
            .select();

        if (error) {
            console.error("Error al guardar cliente en Supabase:", error.message);
            throw error;
        }

        // Sincronización con servidor local (siguiendo tu estructura de Product)
        try {
            await fetch('http://localhost:3000/createclient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataForSupabase)
            });
            console.log("Sincronización local de cliente exitosa");
        } catch (err) {
            console.error("Error al conectar con el servidor local:", err);
        }

        return data[0];
    }

    
    async getClientById(id) {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error al buscar cliente con ID ${id}:`, error);
            return null;
        }

        return this.mapToClientObject(data);
    }
}