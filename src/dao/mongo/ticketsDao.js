import { ticketsModel } from './models/ticketsModel.js'

export class ticketsDaoMongo {
    createTicket = async (newTicket) => {
        return await ticketsModel.create(newTicket)
    }
}