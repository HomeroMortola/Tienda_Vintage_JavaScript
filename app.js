import express from "express";
import cors from "cors";

import { getProducts } from "./src/controllers/ProductController.js";
import { addToCart, getCart, removeFromCart, checkout } from "./src/controllers/CartController.js";

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

// Endpoints
app.get("/productos", getProducts);
app.post("/carrito/agregar", addToCart);
app.delete("/carrito/eliminar/:id", removeFromCart);
app.get("/carrito", getCart);
app.post("/carrito/comprar", checkout);

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});