export class viewsController {
    home = async (req, res) => { res.render('home') }
    register = async (req, res) => { res.render('register') }
    login = async (req, res) => { res.render('login') }
    cart = async (req, res) => { res.render('cart') }
    productsManagement = async (req, res) => { res.render('productsManagement') }
    profile = async (req, res) => { res.render('profile') }
}