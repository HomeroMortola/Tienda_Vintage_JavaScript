import express from "express";
import cors from "cors";


import { createProduct, getProducts } from "./src/controllers/ProductController.js";
import { addToCart, getCart, removeFromCart } from "./src/controllers/CartController.js";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/productos", getProducts);
app.post("/createproduct", createProduct);
app.post("/carrito/agregar", addToCart);
app.delete("/carrito/eliminar/:id", removeFromCart);
app.get("/carrito", getCart);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
