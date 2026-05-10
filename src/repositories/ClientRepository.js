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

    // Convierte un registro de la base de datos en una instancia de Client
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
                .setEmail(item.email)
                .setPassword(item.password);

            return builder.build(); //
        } catch (error) {
            console.error(`Error construyendo el cliente ${item.id}:`, error.message);
            return null;
        }
    }

    
    async CreteNewClient(client, email, password) {
        const { data, error} = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("Error al crear cuenta en Supabase:", error.message);
            throw error;
        }

        if (!data || !data.user) {
            const errMsg = "No se recibió información del usuario después del registro.";
            console.error(errMsg);
            throw new Error(errMsg);
        }

        const dataForSupabase = {
            id: data.user.id,
            name: client.name,
            surname: client.surname,
            phone: client.phone,
            dni: client.dni,
            location: client.location,
            Gmail: email,
            password: client.password
        };

        const { data: dbData, error: dbError } = await supabase
            .from('clients')
            .insert([dataForSupabase])
            .select();

        if (dbError) {
            console.error("Error al guardar cliente en Supabase:", dbError.message);
            throw dbError;
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

        return dbData[0];
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