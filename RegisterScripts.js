import { CLIENT_CONFIG } from './src/utils/ClientFactory.js';
import { ClientRepository } from './src/repositories/ClientRepository.js';

const repo = new ClientRepository();

document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.getElementById('btn-register');
    const errorMsg = document.getElementById('reg-error');

    
    const inputs = {
        name: document.getElementById('reg-name'),
        surname: document.getElementById('reg-surname'),
        dni: document.getElementById('reg-dni'),
        phone: document.getElementById('reg-phone'),
        location: document.getElementById('LocationClient'),
        email: document.getElementById('reg-email'),
        password: document.getElementById('reg-password'), 
    };

    btnRegister?.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            btnRegister.disabled = true;
            btnRegister.textContent = "Procesando...";
            errorMsg.style.display = 'none';

            // validar email y password antes de crear el cliente
            const email = inputs.email.value.trim();
            const password = inputs.password.value;

            if (!password || password.length < 6) {
                throw new Error("La contraseña debe tener al menos 6 caracteres.");
            }

            // Usamos el Builder para los datos del perfil
            const builder = CLIENT_CONFIG.builder();
            builder
                .setName(inputs.name.value)
                .setSurname(inputs.surname.value)
                .setDni(inputs.dni.value)
                .setPhone(inputs.phone.value)
                .setLocation(inputs.location.value)
                .setEmail(email);

            const newClient = builder.build();

            // Llamamos método que maneja Auth de Base de Datos
            await repo.CreteNewClient(newClient, email, password);

            //Avisamos sobre el correo de verificación
            alert("¡Cuenta creada! Por favor, revisa tu correo electrónico para verificar tu cuenta antes de iniciar sesión.");
            window.location.href = 'login.html'; 

        } catch (error) {
            errorMsg.textContent = error.message;
            errorMsg.style.display = 'block';
            console.error("Error en registro:", error);
        } finally {
            btnRegister.disabled = false;
            btnRegister.textContent = "Crear Cuenta";
        }
    });
});