import mongoose from "mongoose";
const Url = "mongodb://localhost:27017/proyecto"

export const connectDb = async (req, res) => {
    try {
        await mongoose.connect(Url)
        console.log(`Conectado a la base de datos ${Url}`)
    } catch (error) {
        console.log("Se produjo un error al iniciar el servidor")
    }
}