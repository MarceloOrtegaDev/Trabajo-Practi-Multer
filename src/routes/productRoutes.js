import { Router } from "express";
import { postProduct, addProduct } from "../controllers/products.controller.js";
import { uploadUserImage } from "../middlewares/multer.middleware.js";

export const productRoute = Router();

// Ruta para crear un nuevo usuario
productRoute.post('/user', uploadUserImage, postProduct);
//Ruta para agregar nuevos productos a mi usuario
productRoute.put("/user/:id", uploadUserImage, addProduct)


