import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema(
    {
        code: {type: String, unique: true, required: true},
        purchase_datetime: {type: Date, required: true, default: Date.now},
        amount: {type: Number, required: true},
        purchaser: {type: String, required: true},
    },
    {
        timestamps: true
    },
    {
        collection: 'tickets'
    }
)

export const ticketsModel = mongoose.model('tickets', ticketSchema)