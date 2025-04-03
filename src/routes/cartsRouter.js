import { Router } from 'express'
import { cartsController } from '../controllers/cartsController.js'
export const router = Router()

const { getCartById } = new cartsController()

router.get('/:cid', getCartById)
