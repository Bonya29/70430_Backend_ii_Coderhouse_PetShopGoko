import { Router } from 'express'
export const router = Router()

router.get('/home', async (req, res) => {
    res.render('home')
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/login', async (req, res) => {
    res.render('login')
})

router.get('/cart', async (req, res) => {
    res.render('cart')
})