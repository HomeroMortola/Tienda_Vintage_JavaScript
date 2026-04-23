import express from "express";
import cors from "cors";

import { getProducts } from "./src/controllers/ProductController.js";

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

// Endpoints
app.get("/productos", getProducts);

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});