import { ClientRepository } from "./src/repositories/ClientRepository.js";
import { supabase } from './srs/config/supabase.js';
const repo = new ClientRepository();

window.doLogin = async () => {
    const u = document.getElementById('user-input').value.trim();
    const p = document.getElementById('pass-input').value;
    const errorMsg = document.getElementById('login-error');
    const passInput = document.getElementById('pass-input');

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: u, password: p });

        if (error) {
            throw new Error("Acceso denegado");
        }

        errorMsg.style.display = 'none';
        console.log("Bienvenido:", data.user.email);
        window.location.href = 'index.html';

        if (!validUser) {
            throw new Error("Acceso denegado");
        }

        errorMsg.style.display = 'none';
        console.log("Bienvenido:", validUser.name);
        window.location.href = 'index.html';
        /*
        if (clients && clients.id) {
            // Guardamos el ID en el navegador del usuario
            localStorage.setItem('usuarioId', clients.id);
            }
        */

    } catch (e) {
        errorMsg.textContent = "Correo o contraseña incorrectos";
        errorMsg.style.display = 'block';
        passInput.value = '';
        console.error("Error en login:", e.message);
    }
};