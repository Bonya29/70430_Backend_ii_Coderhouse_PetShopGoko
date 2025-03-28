import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
    {
        text: String,
        number: Number,
        boolean: Boolean,
        unique: {type: String, unique: true},
        required: {type: String, required: true},
        enum: {type: String, enum: ['user', 'admin'], default: 'user'},
    },
    {
        timestamps: true
    },
    {
        collection: 'carts'
    }
)

export const cartsModel = mongoose.model('carts', cartSchema)