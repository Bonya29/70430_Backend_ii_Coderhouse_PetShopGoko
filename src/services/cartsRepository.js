export class cartsRepository {
    constructor(cartsDao) {
        this.cartsDao = cartsDao
    }
    getCartById = async (cid) => await this.cartsDao.getCartById(cid)
    createCart = async () => await this.cartsDao.createCart()
    deleteCartById = async (cid) => await this.cartsDao.deleteCartById(cid)
}