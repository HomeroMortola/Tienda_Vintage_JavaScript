
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
        const newProduct = await productRepository.saveProduct(request.body);
        
        // Acá podrías validarlo o hacer algo extra antes de responder
        console.log("Nuevo producto recibido:", newProduct);
        response.status(201).json({
            message: "Producto recibido por el servidor local",
            data: newProduct
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
    
