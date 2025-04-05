import { productsService } from "../services/services.js"

export class productsController {
    constructor() {
        this.productsService = productsService
    }
    
    getProducts = async (req, res) => {
        const products = await this.productsService.getProducts()
        res.send({ products })
    }

    getProductsByTitle = async (req, res) => {
        const { title } = req.params
        const product = await this.productsService.getProductByTitle(title)
        res.send({ product })
    }

    createProduct = async (req, res) => {
        const newProduct = req.body
        const product = await this.productsService.createProduct(newProduct)
        res.send({ product })
    }

    updateProductById = async (req, res) => {
        const { pid } = req.params
        const newProduct = req.body
        const product = await this.productsService.updateProductById(pid, newProduct)
        res.send({ product })
    }

    deleteProductById = async (req, res) => {
        const { pid } = req.params
        const product = await this.productsService.deleteProductById(pid)
        res.send({ product })
    }
}