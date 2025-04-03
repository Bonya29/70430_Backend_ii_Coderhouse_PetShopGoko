import { usersModel } from './models/usersModel.js'

export class sessionsDaoMongo {
    getUserById = async (id) => {
        return await usersModel.findById(id)
    }

    getUserByEmail = async (email) => {
        return await usersModel.findOne({ email })
    }

    createUser = async (newUser) => {
        return await usersModel.create(newUser)
    }

    deleteUserById = async (id) => {
        return await usersModel.findByIdAndDelete(id)
    }
}