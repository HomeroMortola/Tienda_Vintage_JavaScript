import { supabase } from './src/config/supabase.js'; 

window.doLogin = async () => {
    const u = document.getElementById('user-input').value.trim();
    const p = document.getElementById('pass-input').value;
    const errorMsg = document.getElementById('login-error');
    const passInput = document.getElementById('pass-input');

    try {
        
        const { data, error } = await supabase.auth.signInWithPassword({ 
            email: u, 
            password: p 
        });

        if (error) throw new Error("Credenciales inválidas");

        
        console.log("Login exitoso para:", data.user.email);
        
        
        localStorage.setItem('usuarioId', data.user.id);

        // 4. Redirigir
        window.location.href = 'index.html';
        
        alert("Login exitoso");

    } catch (e) {
        errorMsg.textContent = "Correo o contraseña incorrectos";
        errorMsg.style.display = 'block';
        passInput.value = '';
        console.error("Error:", e.message);
    }
};