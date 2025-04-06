import { cartsService } from "../services/services.js"

export class cartsController {
    constructor() {
        this.cartsService = cartsService
    }

    getCartById = async (req, res) => {
        const { cid } = req.params
        const cart = await this.cartsService.getCartById(cid)
        res.send({ cart })
    }

    getCardByIdWithPopulate = async (req, res) => {
        const { cid } = req.params
        const cart = await this.cartsService.getCardByIdWithPopulate(cid)
        res.send({ cart })
    }

    addProductToCartById = async (req, res) => {
        const { cid, pid } = req.params
        const updatedCart = await this.cartsService.addProductToCartById(cid, pid)
        res.status(200).json({ message: 'Producto agregado al carrito', cart: updatedCart })
    }

    updateProductQuantityFromCartById = async (req, res) => {
        const { cid, pid, action } = req.params
        const updatedCart = await this.cartsService.updateProductQuantityFromCartById(cid, pid, action)
        res.status(200).json({ message: 'Cantidad del producto actualizada', cart: updatedCart })
    }

    deleteProductFromCartById = async (req, res) => {
        const { cid, pid } = req.params
        const updatedCart = await this.cartsService.deleteProductFromCartById(cid, pid)
        res.status(200).json({ message: 'Producto eliminado del carrito', cart: updatedCart })
    }
}