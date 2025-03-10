import express from 'express'
import { engine } from 'express-handlebars'
import { connectDB } from './utils/connDB.js'
import { initializePassport } from './config/passportConfig.js'
import { router as sessionsRouter } from './routes/sessionsRouter.js'
import { router as viewsRouter } from './routes/viewsRouter.js'
import cookieParser from 'cookie-parser'
import passport from 'passport'
const port = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))
app.use(cookieParser())
app.use(passport.initialize())
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)
app.set("view engine", "handlebars")
app.set("views", "./src/views")
app.engine("handlebars", engine())

const server = app.listen(port, () => {
    console.log(`\nServer encendido en el puerto ${port} \n\nurl: http://localhost:${port}/ \n`)
})

app.get('/', (req, res) => {
    res.status(200).send('Servidor Encendido')
})

connectDB()

initializePassport()