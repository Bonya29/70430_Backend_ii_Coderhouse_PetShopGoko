import { sessionsDaoMongo } from "../dao/mongo/sessionsDao.js"
import { sessionsRepository } from "./sessionsRepository.js"
import { cartsDaoMongo } from "../dao/mongo/cartsDao.js"
import { cartsRepository } from "./cartsRepository.js"
import { productsDaoMongo } from "../dao/mongo/productsDao.js"
import { productsRepository } from "./productsRepository.js"

export const sessionsService = new sessionsRepository(new sessionsDaoMongo())
export const cartsService = new cartsRepository(new cartsDaoMongo())
export const productsService = new productsRepository(new productsDaoMongo())