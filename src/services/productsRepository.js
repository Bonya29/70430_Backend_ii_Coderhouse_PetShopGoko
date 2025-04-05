export class productsRepository {
    constructor(productsDao) {
        this.productsDao = productsDao
    }

    getProducts = async () => {
        return await this.productsDao.getProducts()
    }

    getProductByTitle = async (title) => {
        return await this.productsDao.getProductByTitle(title)
    }

    createProduct = async (newProduct) => {
        return await this.productsDao.createProduct(newProduct)
    }

    updateProductById = async (id, newProduct) => {
        return await this.productsDao.updateProductById(id, newProduct)
    }

    deleteProductById = async (id) => {
        return await this.productsDao.deleteProductById(id)
    }
}