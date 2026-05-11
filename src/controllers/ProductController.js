
import { ProductRepository } from "../repositories/ProductRepository.js";

const productRepository = new ProductRepository();

export const getProducts = async (request, response) => {
    try {
        const products = await productRepository.getProducts();
        response.json(products ?? []);
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        response.status(500).json({ error: "Error al obtener productos" });
    }
};

export const createProduct = async (request, response) => {
    try {
        const { name, price, stock, image_url, description, category } = request.body;
        // Validaciones
        if (!name || name.trim() === "") {
            return response.status(400).json({ error: "el nombre es obligatorio" });
        }
        if (!price || typeof price !== "number" || price <= 0) {
            return response.status(400).json({ error: "el precio debe ser un numero mayor a cero" });
        }
        if (stock === undefined || typeof stock !== "number" || stock < 0) {
            return response.status(400).json({ error: "el stock no puede ser negativo" });
        }
        if (!image_url || image_url.trim() === "") {
            return response.status(400).json({ error: "la imagen es obligatoria" });
        }
        if (!description || description.trim() === "") {
            return response.status(400).json({ error: "la descripcion es obligatoria" });
        }
        if (!category || category.trim() === "") {
            return response.status(400).json({ error: "la categoria es obligatoria" });
        }
        const newProduct = await productRepository.saveProduct(request.body);
        console.log("Nuevo producto recibido:", newProduct);
        response.status(201).json({
            message: "Producto recibido por el servidor local",
            data: newProduct
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
    
