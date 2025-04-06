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

    updateProductStockById = async (pid, quantity) => {
        const product = await productsModel.findById(pid)
            product.stock -= quantity
        return await product.save()
    }

    deleteProductById = async (id) => {
        return await productsModel.findByIdAndDelete(id)
    }
}