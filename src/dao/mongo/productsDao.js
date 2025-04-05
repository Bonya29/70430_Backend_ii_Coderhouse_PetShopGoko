import { productsModel } from './models/productsModel.js'

export class productsDaoMongo {
    getProducts = async () => {
        return await productsModel.find()
    }
    
    getProductByTitle = async (title) => {
        return await productsModel.findOne({title})
    }

    createProduct = async (newProduct) => {
        return await productsModel.create(newProduct)
    }

    updateProductById = async (id, newProduct) => {
        return await productsModel.findByIdAndUpdate(id, newProduct)
    }

    deleteProductById = async (id) => {
        return await productsModel.findByIdAndDelete(id)
    }
}