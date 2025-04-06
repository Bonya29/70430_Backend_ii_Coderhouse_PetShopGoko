import { Router } from 'express'
import { cartsController } from '../controllers/cartsController.js'
export const router = Router()

const { getCartById, addProductToCartById, getCardByIdWithPopulate, updateProductQuantityFromCartById, deleteProductFromCartById } = new cartsController()

router.get('/:cid', getCartById)

router.get('/:cid/products', getCardByIdWithPopulate)

router.post('/:cid/product/:pid', addProductToCartById)

router.put('/:cid/product/:pid/quantity/:action', updateProductQuantityFromCartById)

router.put('/:cid/product/:pid', deleteProductFromCartById)