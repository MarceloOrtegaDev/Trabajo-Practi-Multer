import multer from "multer";
import { newProducts } from "../model/product.model.js";

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Middleware de Multer para manejar la subida de la imagen
export const uploadUserImage = upload.single('file');

export const createUser = async (req, res) => {
    try {
        const { name, description, price } = req.body; // Asegúrate de que price esté incluido aquí

        // Verifica si el archivo fue subido
        if (!req.file) {
            return res.status(400).json({ msg: "Error al subir la imagen" });
        }

        const imageUrl = `localhost:3000/uploads/${req.file.filename}`; // Ruta donde se guardó la imagen

        const newUser = new newProducts({
            name,
            description,
            products: [{ // Agrega el objeto con price y imageUrl al arreglo products
                price,
                imageUrl
            }]
        });

        await newUser.save(); // Guarda el nuevo producto en la base de datos
        res.status(201).json({ msg: "Se creó el nuevo usuario", newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { id } = req.params; // Obtener ID del producto
        const { price } = req.body;

        // Verifica si se ha subido un archivo
        let imageUrl = null;
        if (req.file) {
            imageUrl = `localhost:3000/uploads/${req.file.filename}`; // Ruta donde se guardó la imagen
        }

        // Busca el producto por ID
        const productToUpdate = await newProducts.findById(id);

        if (!productToUpdate) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        // Si hay un nuevo precio, lo actualiza
        if (price) {
            productToUpdate.products.push({ // Agrega un nuevo objeto con el precio y la imagen
                price,
                imageUrl
            });
        } else if (imageUrl) {
            productToUpdate.products[0].imageUrl = imageUrl; // Actualiza la imagen del primer producto en el array
        }

        await productToUpdate.save(); // Guarda los cambios en la base de datos
        res.status(200).json({ msg: "Producto actualizado correctamente", productToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
