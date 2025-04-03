import { Router } from 'express'
import { sessionsController } from '../controllers/sessionsController.js'
import { passportCall } from "../middlewares/passportCallMiddleware.js";
export const router = Router()

const { register, login, logout, deleteAccountById, current } = new sessionsController()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.delete('/deleteAccount/:id', deleteAccountById)
router.get("/current", passportCall("jwt"), current)