import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        age: {type: Number, required: true},
        password: {type: String, required: true},
        cartId: {type: String, required: true, unique: true},
        role: {type: String, enum: ['user', 'admin'], default: 'user'},
    },
    {
        timestamps: true
    },
    {
        collection: 'users'
    }
)

export const usersModel = mongoose.model('users', userSchema)