import express from "express";
import morgan from "morgan";
import { connectDb } from "./src/db/mongoDb.js";
import { productRoute } from "./src/routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Definición de __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(morgan("dev"));

const PORT = 3000;

// Rutas
app.use(productRoute);

// Conexión a la base de datos y arranque del servidor
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
