export class sessionsRepository {
    constructor(sessionsDao) {
        this.sessionsDao = sessionsDao
    }
    getUserById = async (id) => await this.sessionsDao.getUserById(id)
    getUserByEmail = async (email) => await this.sessionsDao.getUserByEmail(email)
    createUser = async (newUser) => await this.sessionsDao.createUser(newUser)
    deleteUserById = async (id) => await this.sessionsDao.deleteUserById(id)
}