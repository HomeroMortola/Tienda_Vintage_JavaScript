//app.js

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { createProduct, getProducts } from "./src/controllers/ProductController.js";
import { addToCart, getCart, removeFromCart } from "./src/controllers/CartController.js";
import { processCheckout } from "./src/controllers/CheckoutController.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;


app.use(cors({
    origin: '*', // Permite conexiones desde Ngrok o localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'] // ¡Autorizamos el pase VIP!
}));
app.use(express.json());

// Servir archivos estáticos desde la raíz y desde la carpeta public
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));

// Rutas de la API
app.get("/productos", getProducts);
app.post("/createproduct", createProduct);
app.post("/carrito/agregar", addToCart);
app.delete("/carrito/eliminar/:id", removeFromCart);
app.get("/carrito", getCart);


// Rutas para las páginas de éxito y fallo (para Mercado Pago)
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.get("/failure", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "failure.html"));
});

app.get("/pending", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "failure.html")); // O una página de pendiente
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
