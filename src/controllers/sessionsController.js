import { sessionsService } from "../services/services.js"
import { cartsService } from "../services/services.js"
import { createHash, isValidPassword } from "../utils/hashPassword.js"
import { generateToken } from "../utils/generateToken.js"
import { UserDto } from "../dto/usersDto.js"

export class sessionsController {
    constructor() {
        this.sessionsService = sessionsService
        this.cartsService = cartsService
    }
    
    register = async (req, res) => {
        const { first_name, last_name, gender, email, age, password } = req.body
        if (!first_name || !last_name || !gender || !email || !age || !password) {
            return res.status(400).send({ status: "error", error: "Campos incompletos" })
        }
        const user = await this.sessionsService.getUserByEmail(email)
        if (age < 13) {
            return res.status(400).send({ status: "error", error: "Debes ser mayor de 13 años para registrarte" })
        }
        if (user) {
            return res.status(400).send({ status: "error", error: "Ya existe un usuario registrado con ese email" })
        }

        const newCart = await this.cartsService.createCart()
        const userDto = new UserDto({ ...req.body,  password: createHash(password), cartId: newCart._id })
        const newUser = await this.sessionsService.createUser({ ...userDto })

        console.log("Nuevo usuario creado", newUser)
        res.send({ status: 'success', message: 'Registro Exitoso', payload: newUser })
    }

    login = async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({ status: "error", error: "Campos incompletos" })
        }
        const user = await this.sessionsService.getUserByEmail(email)
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
            gender: user.gender,
            age: user.age,
            email: user.email,
            role: user.role,
            cartId: user.cartId
        })
        res.cookie('petShopGokoToken', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).send({ status: 'success', message: 'Login Exitoso' })
    }

    logout = async (req, res) => {
        res.clearCookie('petShopGokoToken').send({ status: 'success', message: 'Logout Exitoso' })
    }

    deleteAccountById = async (req, res) => {
        const { id } = req.params
        const user = await this.sessionsService.getUserById(id)
        const cid = user.cartId
        await this.sessionsService.deleteUserById(id)
        await this.cartsService.deleteCartById(cid)
        res.send({ status: 'success', message: 'Cuenta eliminada' })
    }

    current = (req, res) => {
        res.json({ status: "success", user: req.user })
    }
}