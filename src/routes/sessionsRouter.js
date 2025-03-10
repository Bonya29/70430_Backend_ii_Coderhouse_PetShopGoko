import { Router } from 'express'
import { createHash, isValidPassword } from '../utils/hashPassword.js'
import { usersModel } from '../models/usersModel.js'
import { generateToken } from '../utils/generateToken.js'
import { passportCall } from '../middlewares/passportCallMiddleware.js'
import { authorization } from '../middlewares/authorizationMiddleware.js'
export const router = Router()

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send({ status: "error", error: "Campos incompletos" })
    }
    const user = await usersModel.findOne({ email })
    if (age < 13) {
        return res.status(400).send({ status: "error", error: "Debes ser mayor de 13 años para registrarte" })
    }
    if (user) {
        return res.status(400).send({ status: "error", error: "Ya existe un usuario registrado con ese email" })
    }
    const newUser = await usersModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        cartId: Math.floor(Math.random() * 1000),
    })
    console.log("Nuevo usuario creado", newUser)
    res.send({ status: 'success', message: 'Registro Exitoso', payload: newUser })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ status: "error", error: "Campos incompletos" })
    }
    const user = await usersModel.findOne({ email })
    if (!user) {
        return res.status(400).send({ status: "error", error: "No existe un usuario registrado con ese email" })
    }
    if (!isValidPassword(user, password)) {
        return res.status(400).send({ status: "error", error: "Contraseña incorrecta" })
    }
    const token = generateToken({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        email: user.email,
        role: user.role
    })
    res.cookie('petShopGokoToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).send({ status: 'success', message: 'Login Exitoso' })
})

router.get('/current', passportCall('jwt'), authorization('admin'), async (req, res) => {
    const user = req.user
    const users = await usersModel.find()
    res.send({ status: 'success', message: 'Ingreso a la base de datos de los usuarios registrados', payload: users })
    console.log(`el usuario con id "${user.id}", email "${user.email}" y nombre "${user.first_name} ${user.last_name}" ingreso a la base de datos en la fecha ${new Date().toLocaleString()}.`)
})