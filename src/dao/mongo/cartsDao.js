import { cartsModel } from './models/cartsModel.js'

export class cartsDaoMongo {
    getCartById = async (cid) => {
        return await cartsModel.findById(cid)
    }

    createCart = async () => {
        return await cartsModel.create({ products: [] })
    }

    deleteCartById = async (cid) => {
        return await cartsModel.findByIdAndDelete(cid)
    }

}