import { Router } from 'express'
import { productsController } from '../controllers/productsController.js'
export const router = Router()

const { getProducts, getProductsByTitle, createProduct, updateProductById, deleteProductById } = new productsController()

router.get('/', getProducts)
router.get('/:title', getProductsByTitle)
router.post('/', createProduct)
router.put('/:pid', updateProductById)
router.delete('/:pid', deleteProductById)