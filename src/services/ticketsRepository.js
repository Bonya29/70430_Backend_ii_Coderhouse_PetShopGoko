export class ticketsRepository {
    constructor(ticketsDao) {
        this.ticketsDao = ticketsDao
    }

    createTicket = async (newTicket) => {
        return await this.ticketsDao.createTicket(newTicket)
    }
}