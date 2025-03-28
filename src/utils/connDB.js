import mongoose from 'mongoose'
import { config } from '../config/config.js'

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        console.log('Base de datos de MongoDB conectada')
    } catch (error) {
        console.log(error)
    }
}