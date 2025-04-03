async function checkRole() {
    const cart = document.getElementById('cart')
    const cartCount = document.getElementById('cart-count')
    const productsManagement = document.getElementById('productsManagement')
    const profile = document.getElementById('profile')
    const login = document.getElementById('login')

    const response = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include'
    })

    const data = await response.json()
    const user = data.user

    if (user.role === 'admin') {
        productsManagement.style.display = 'flex'
        profile.style.display = 'flex'
        login.style.display = 'none'
    } else if (user.role === 'user') {
        cart.style.display = 'flex'
        profile.style.display = 'flex'
        login.style.display = 'none'
        
        const response = await fetch('/api/carts/' + user.cartId, {
            method: 'GET',
        })
        const data = await response.json()
        if (!data.cart) {
            cartCount.textContent = "0"
        } else {
            cartCount.textContent = data.cart.products.length
        }
    }
}

document.addEventListener('DOMContentLoaded', checkRole)