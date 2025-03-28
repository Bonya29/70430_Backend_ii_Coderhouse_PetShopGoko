import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        image: String,
        title: {type: String, unique: true},
        description: String,
        price: Number,
        stock: Number,
        category: String,
        code: {type: String, unique: true},
        status: Boolean
    },
    {
        timestamps: true
    },
    {
        collection: 'products'
    }
)

export const productsModel = mongoose.model('products', productSchema)