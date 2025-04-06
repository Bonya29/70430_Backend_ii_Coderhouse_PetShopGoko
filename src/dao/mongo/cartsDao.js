import { cartsModel } from './models/cartsModel.js'

export class cartsDaoMongo {
    getCartById = async (cid) => {
        return await cartsModel.findById(cid).lean()
    }

    getCardByIdWithPopulate = async (cid) => {
        return await cartsModel.findById(cid).populate('products.product').lean()
    }

    createCart = async () => {
        return await cartsModel.create({ products: [] })
    }

    addProductToCartById = async (cid, pid) => {
        const cart = await cartsModel.findById(cid)
        let existProduct = cart.products.find(p => p.product.toString() === pid)
        if (existProduct) {
            existProduct.quantity += 1
        } else {
            let newProduct = {product: pid, quantity: 1}
            cart.products.push(newProduct)
        }
        return await cart.save()
    }

    updateProductQuantityFromCartById = async (cid, pid, action) => {
        const cart = await cartsModel.findById(cid)
        let product = cart.products.find(p => p.product.toString() === pid)
        let newQuantity
        if (action === 'decrease') {
            newQuantity = product.quantity - 1
        } else if (action === 'increase') {
            newQuantity = product.quantity + 1
        }

        let updatedProduct = {product: pid, quantity: newQuantity}
        cart.products = cart.products.map(p => p.product.toString() === pid ? updatedProduct : p)
        return await cart.save()
    }

    deleteProductFromCartById = async (cid, pid) => {
        const cart = await cartsModel.findById(cid)
        cart.products = cart.products.filter(p => p.product.toString() !== pid)
        return await cart.save()
    }

    deleteCartById = async (cid) => {
        return await cartsModel.findByIdAndDelete(cid)
    }

}