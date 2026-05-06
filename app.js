import express from "express";
import cors from "cors";
import "dotenv/config";

import { createProduct, getProducts } from "./src/controllers/ProductController.js";
import { addToCart, getCart, removeFromCart, checkout } from "./src/controllers/CartController.js";
import { processCheckout } from "./src/controllers/CheckoutController.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/productos", getProducts);
app.post("/createproduct", createProduct);
app.post("/carrito/agregar", addToCart);
app.delete("/carrito/eliminar/:id", removeFromCart);
app.get("/carrito", getCart);
app.post("/carrito/comprar", checkout);
app.post("/checkout", processCheckout);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
