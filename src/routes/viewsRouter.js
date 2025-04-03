import { Router } from 'express'
import { passportCall } from '../middlewares/passportCallMiddleware.js'
import { authorization } from '../middlewares/authorizationMiddleware.js'
import { viewsController } from '../controllers/viewsController.js'
export const router = Router()

const { home, register, login, cart, productsManagement, profile } = new viewsController()

router.get('/home', home)
router.get('/register', register)
router.get('/login', login)
router.get('/cart', cart)
router.get('/productsManagement', passportCall('jwt'), authorization('admin'), productsManagement)
router.get('/profile', profile)