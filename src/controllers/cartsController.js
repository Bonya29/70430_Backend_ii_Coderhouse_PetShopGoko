import { cartsService } from "../services/services.js"

export class cartsController {
    constructor() {
        this.cartsService = cartsService
    }

    getCartById = async (req, res) => {
        const { cartId } = req.params
        const cart = await this.cartsService.getCartById(cartId)
        res.send({ cart })
    }
}