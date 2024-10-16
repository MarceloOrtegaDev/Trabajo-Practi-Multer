import { Router } from "express";
import { createUser, uploadUserImage, addProduct } from "../controllers/products.controller.js";

export const productRoute = Router();

// Ruta para crear un nuevo usuario
productRoute.post('/user', uploadUserImage, createUser);
//Ruta para agregar nuevos productos a mi usuario
productRoute.put("/user/:id", uploadUserImage, addProduct)


