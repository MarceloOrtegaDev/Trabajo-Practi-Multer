import multer from "multer";

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Función para filtrar archivos permitidos
const fileFilter = (req, file, cb) => {
    try {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Acepta el archivo
        } else {
            cb(false); // Rechaza el archivo
        }
    } catch (error) {
        console.log(error)
    }
    // Permitir solo archivos .jpg y .png
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter // Añade el filtro de archivos
});

export const uploadUserImage = upload.single('file');
