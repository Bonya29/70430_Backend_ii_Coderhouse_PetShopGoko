import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { engine } from 'express-handlebars'
import { connectDB } from './utils/connDB.js'
import { config } from './config/config.js'
import { initializePassport } from './config/passportConfig.js'
import { router as sessionsRouter } from './routes/sessionsRouter.js'
import { router as viewsRouter } from './routes/viewsRouter.js'
import { router as cartsRouter } from './routes/cartsRouter.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))
app.use(cookieParser())
app.use(passport.initialize())
app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)
app.set("view engine", "handlebars")
app.set("views", "./src/views")
app.engine("handlebars", engine())

const server = app.listen(config.port, () => {
    console.log(`\nServer encendido en el puerto ${config.port} \n\nurl: http://localhost:${config.port}/ \n`)
})

app.get('/', (req, res) => {
    res.status(200).send('Servidor Encendido')
})

connectDB()

initializePassport()