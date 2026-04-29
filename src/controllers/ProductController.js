
import { ProductRepository } from "../repositories/ProductRepository.js";

const productRepository = new ProductRepository();

export const getProducts = async (req, res) => {
    try {
        const products = await productRepository.getProducts();
        res.json(products);
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const productoCargado = req.body;
        
        // Acá podrías validarlo o hacer algo extra antes de responder
        console.log("Nuevo producto recibido:", productoCargado);

        res.status(201).json({
            message: "Producto recibido por el servidor local",
            data: productoCargado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    
