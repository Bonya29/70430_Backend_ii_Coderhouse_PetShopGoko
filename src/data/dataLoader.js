// Nota: Una vez ejecutado el script, se borraran todos los productos y usuarios de la base de datos de MongoDB y se añadiran los que se encuentran en los archivos JSON de la carpeta "data".
// Para ejecutar el script, dirigirse a la consola, posicionarse sobre la carpeta del proyecto y escribir 'node .\src\data\dataLoader.js' (sin comillas)

import mongoose from "mongoose"
import fs from "fs/promises"
import { config } from '../config/config.js'
import { productsModel } from "../dao/mongo/models/productsModel.js"
import { usersModel } from "../dao/mongo/models/usersModel.js"

let products = []
let users = []

const loadData = async () => {
    try {
        const productsData = await fs.readFile("./src/data/products.json", "utf-8")
        const usersData = await fs.readFile("./src/data/users.json", "utf-8")
        products = JSON.parse(productsData)
        users = JSON.parse(usersData)
    } catch (err) {
        console.error(`Error al leer los archivos JSON: ${err.message}`)
        process.exit()
    }
}

const insertData = async () => {
    try {
        await mongoose.connect(config.mongoURI)
        console.log('Base de datos de MongoDB conectada')

        await loadData()

        await productsModel.deleteMany()
        await usersModel.deleteMany()

        let dataProducts = await productsModel.insertMany(products)
        let dataUsers = await usersModel.insertMany(users)

        console.log(`Productos: ${dataProducts} \n\nUsuarios: ${dataUsers} \n\nDatos de products y users añadidos a la base de datos de MongoDB con exito.\n`)
        process.exit()
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD o al cargar los datos: ${err.message}`)
    }
}

insertData();