import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;


app.use(express.json());


app.get("/saludo", (req: Request, res: Response) => {
  res.json({
    mensaje: "Hola desde el servidor",
  });
});


app.post("/usuarios", (req: Request, res: Response) => {
  const { nombre, edad, carrera } = req.body;

  if (!nombre || !edad || !carrera) {
    return res.status(400).json({
      error: "Faltan datos: nombre, edad y carrera son obligatorios",
    });
  }

  res.status(201).json({
    mensaje: "Usuario creado correctamente",
    usuario: {
      nombre,
      edad,
      carrera,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});