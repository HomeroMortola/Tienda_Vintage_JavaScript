import { PRODUCT_CONFIG } from './src/utils/ProductFactory.js';
import { ProductRepository } from './src/repositories/ProductRepository.js';

const repo = new ProductRepository();

document.addEventListener('DOMContentLoaded', () => {
    const selectTipo = document.getElementById('tipo-producto');
    const contenedorCampos = document.getElementById('campos-dinamicos');
    const btnSave = document.getElementById('btn-save');
    const fileInput = document.getElementById('foto-input');

    // Manejo del cambio de tipo de producto para mostrar campos específicos
    selectTipo?.addEventListener('change', (e) => {
        const config = PRODUCT_CONFIG[e.target.value];
        
        contenedorCampos.innerHTML = config 
            ? config.fields.map(campo => `
                <div class="form-group full" style="border-right: none;">
                    <label>${campo.label}</label>
                    <input type="${campo.type}" id="extra-${campo.id}" class="input-dinamico">
                </div>
            `).join('')
            : '<p class="dynamic-placeholder">Seleccioná un tipo para ver los campos específicos.</p>';
    });

    // Manejo del botón de guardar
    btnSave?.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            (!selectTipo.value || !document.getElementById('nombre').value) && 
                (() => { throw new Error("Faltan datos obligatorios"); })();

            btnSave.disabled = true;
            btnSave.textContent = "Procesando...";

            const file = fileInput.files[0];
            let publicUrl = "";
            // Si hay un archivo, subirlo y obtener su URL pública
            await (file && (async () => {
                const filePath = `${Math.random()}.${file.name.split('.').pop()}`;
                const { error } = await repo.uploadImage('product-images', filePath, file);
                
                
                error && (() => { throw error; })();
                
                publicUrl = repo.getPublicUrl('product-images', filePath);
            })());
            // Construir producto usando el builder específico
            const config = PRODUCT_CONFIG[selectTipo.value];
            const builder = config.builder()
                .setName(document.getElementById('nombre').value)
                .setPrice(parseFloat(document.getElementById('precio').value) || 0)
                .setStock(parseInt(document.getElementById('stock').value) || 0)
                .setCategory(selectTipo.value)
                .setDescription("Carga desde panel admin")
                .setImageUrl(publicUrl);

            // Asignar campos específicos
            config.fields.forEach(campo => {
                const el = document.getElementById(`extra-${campo.id}`);
                el && builder[campo.setter]?.(el.value);
            });

            await repo.saveProduct(builder.build());
            
            alert("¡Producto guardado exitosamente!");
            location.reload();

        } catch (error) {
            alert(error.message || "Error en el proceso");
        } finally {
            btnSave.disabled = false;
            btnSave.textContent = "Guardar Producto";
        }
    });
});

const AUTH_DB = {
    user: 'admin',
    pass: 'admin123',
    target: 'admin-panel.html'
};

window.doLogin = () => {
    const u = document.getElementById('user-input');
    const p = document.getElementById('pass-input');
    const errorMsg = document.getElementById('login-error');
    // Validación de credenciales con manejo de errores
    try {
        (u.value.trim() !== AUTH_DB.user || p.value !== AUTH_DB.pass) && 
            (() => { throw new Error("Acceso denegado"); })();
        // Si la validación es exitosa, redirigir al panel de administración
        errorMsg.style.display = 'none';
        window.location.href = 'admin-panel.html';

    } catch (e) {
        // Mostrar mensaje de error y limpiar campos
        errorMsg.style.display = 'block';
        passInput.value = '';
    }
};