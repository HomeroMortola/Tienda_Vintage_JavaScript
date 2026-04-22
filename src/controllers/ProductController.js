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
}