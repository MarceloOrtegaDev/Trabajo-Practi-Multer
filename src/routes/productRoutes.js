import { Router } from "express";
import { postProduct, uploadUserImage, addProduct } from "../controllers/products.controller.js";

export const productRoute = Router();

// Ruta para crear un nuevo usuario
productRoute.post('/user', uploadUserImage, postProduct);
//Ruta para agregar nuevos productos a mi usuario
productRoute.put("/user/:id", uploadUserImage, addProduct)


