import { newProducts } from "../model/product.model.js";

export const postProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body; // Asegúrate de que price esté incluido aquí

        // Verifica si el archivo fue subido
        if (!req.file) {
            return res.status(400).json({ msg: "Error al subir la imagen: asegurate de que sea jpg o png" });
        }

        const imageUrl = `localhost:3000/uploads/${req.file.filename}`; // Ruta donde se guardó la imagen

        const createProduct = new newProducts({
            name,
            description,
            sales: [{ // Agrega el objeto con price y imageUrl al arreglo products
                price,
                imageUrl
            }]
        });

        await createProduct.save(); // Guarda el nuevo producto en la base de datos
        res.status(201).json({ msg: "Se creó el nuevo usuario", createProduct });
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
            productToUpdate.sales.push({ // Agrega un nuevo objeto con el precio y la imagen
                price,
                imageUrl
            });
        } else if (imageUrl) {
            productToUpdate.sales[0].imageUrl = imageUrl; // Actualiza la imagen del primer producto en el array
        }

        await productToUpdate.save(); // Guarda los cambios en la base de datos
        res.status(200).json({ msg: "Producto actualizado correctamente", productToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
