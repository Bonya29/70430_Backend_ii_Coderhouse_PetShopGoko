async function addButtonAddToCart() {
    const response = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include'
    })

    const data = await response.json()
    const user = data.user

    if (user.role === 'user' || !user) {
        const products = document.querySelectorAll('.product-card')
        products.forEach(product => {
            product.querySelector('.btns').style.display = 'flex'
        })
    }
}

async function showProducts() {
    const response = await fetch('/api/products')
    const data = await response.json()
    const products = data.products

    const productsContainer = document.getElementById('products')
    let outStock
    products.forEach(product => {
        outStock = product.stock === 0
        productsContainer.innerHTML += `
        <div class="product-card" id="${product._id}">
            <img src="${product.image}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <p class="stock">Unidades Disponibles<br>${product.stock}</p>
            <div class="btns" style="margin: auto 0 0 0; display: none"><button class="add" ${outStock ? 'disabled style="background-color: grey; cursor: not-allowed;"' : ''} onclick="addProductToCart('${product._id}')">Añadir al Carrito</button></div>
        </div>
        `
    })

    addButtonAddToCart()
}

async function addProductToCart(pid) {
    const cartCount = document.getElementById('cart-count')
    let response = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include'
    })

    let data = await response.json()
    const userData = data.user

    response = await fetch(`/api/carts/${userData.cartId}`, {
        method: 'GET',
    })

    data = await response.json()
    const cartData = data.cart
    
    let existProduct = cartData.products.find(p => p.product.toString() === pid)

    if (existProduct) {
        swal.fire({
            toast: true,
            title: "El producto ya se encuentra en el carrito",
            position: "bottom-end",
            showConfirmButton: false,
            timer: 1750,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
            }
        })
    } else {
        response = await fetch(`/api/carts/${userData.cartId}/product/${pid}`, 
            {
                method: 'POST',
            }
        )
        
        if (response.ok) {
            const response = await fetch(`/api/carts/${userData.cartId}`, {
                method: 'GET',
            })

            const data = await response.json()
            cartCount.textContent = data.cart.products.length

            swal.fire({
                toast: true,
                title: "Producto Agregado al Carrito",
                position: "bottom-end",
                showConfirmButton: false,
                timer: 1750,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer
                    toast.onmouseleave = Swal.resumeTimer
                }
            })
        }
    }
}

showProducts()