import mongoose from "mongoose";

const userProdct = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    sales: [{
        price: {
            type: String,
            required: true,
            default: 0
        },
        imageUrl: {
            type: String,
            required: true,
            default: 0
        }
    }]
});

export const newProducts = mongoose.model('Product', userProdct);
