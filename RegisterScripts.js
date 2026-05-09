import { CLIENT_CONFIG } from './src/utils/ClientFactory.js';
import { ClientRepository } from './src/repositories/ClientRepository.js';


const repo = new ClientRepository();

document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.getElementById('btn-register');
    const errorMsg = document.getElementById('reg-error');

    // Referencias a los inputs
    const inputs = {
        name: document.getElementById('reg-name'),
        surname: document.getElementById('reg-surname'),
        dni: document.getElementById('reg-dni'),
        phone: document.getElementById('reg-phone'),
        location: document.getElementById('reg-location'),
        password: document.getElementById('reg-password')
    };

    btnRegister?.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            btnRegister.disabled = true;
            btnRegister.textContent = "Guardando...";
            errorMsg.style.display = 'none';

            // 1. Usamos el Builder a través de tu ClientFactory (CLIENT_CONFIG)
            // Según tu ClientRepository, CLIENT_CONFIG.builder() devuelve un ClientBuilder
            const builder = CLIENT_CONFIG.builder();

            // 2. Aplicamos la lógica del Builder (con sus validaciones internas)
            builder
                .setName(inputs.name.value)
                .setSurname(inputs.surname.value)
                .setDni(inputs.dni.value)
                .setPhone(inputs.phone.value)
                .setLocation(inputs.location.value)
                .setPassword(inputs.password.value);

            // 3. Construimos el objeto Client
            const newClient = builder.build();

            // 4. Lo enviamos al repositorio (que maneja Supabase y el servidor local)
            await repo.saveClient(newClient);

            alert("¡Usuario registrado con éxito!");
            window.location.href = 'index.html'; // Redirección al inicio o login

        } catch (error) {
            // Capturamos los errores de validación de tu ClientBuilder
            errorMsg.textContent = error.message;
            errorMsg.style.display = 'block';
            console.error("Error en registro:", error);
        } finally {
            btnRegister.disabled = false;
            btnRegister.textContent = "Crear Cuenta";
        }
    });
});