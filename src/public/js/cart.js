async function showCart() {
    let response = await fetch('/api/sessions/current', {
        method: 'GET',
        credentials: 'include'
    })
    let data = await response.json()
    const user = data.user

    response = await fetch(`/api/carts/${user.cartId}/products`, {
        method: 'GET'
    })
    data = await response.json()
    const cart = data.cart

    const cartContainer = document.getElementById('cart-container')
    cartContainer.innerHTML = ''
    cart.products.forEach(product => {
        cartContainer.innerHTML += `
            <div class="product-card-cart" id="${product.product._id}">
                <img src="${product.product.image}">
                <h3>${product.product.title}</h3>
                <p class="price">$${product.product.price}</p>
                <div class="btns">
                    <button class="upd-cart" onclick="decreaseQuantity('${user.cartId}', '${product.product._id}', ${product.quantity})">↓</button>
                    <p>Cantidad: ${product.quantity}</p>
                    <button class="upd-cart" onclick="increaseQuantity('${user.cartId}', '${product.product._id}', ${product.quantity})">↑</button>
                    <button class="del-cart" style="width: 40px; height: 40px" onclick="deleteProduct('${user.cartId}', '${product.product._id}')">X</button>
                </div>
            </div>
        `
    })
}

async function decreaseQuantity(cartId, pid, quantity) {
    if (quantity === 1) {
        Swal.fire({
            toast: true,
            title: "Cantidad mínima alcanzada",
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
        fetch(`/api/carts/${cartId}/product/${pid}/quantity/decrease`, {
            method: 'put'
        })
        .then(response => response.json())
        .then(() => {
            showCart()
        })
    }
}

async function increaseQuantity(cartId, pid, quantity) {
    if (quantity === 10) {
        Swal.fire({
            toast: true,
            title: "Cantidad Maxima alcanzada",
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
        fetch(`/api/carts/${cartId}/product/${pid}/quantity/increase`, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(() => {
            showCart()
        })
    }
}

async function deleteProduct(cartId, pid) {
    const cartCount = document.getElementById('cart-count')
    fetch(`/api/carts/${cartId}/product/${pid}`, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(async () => {
        response = await fetch(`/api/carts/${cartId}`, {
            method: 'GET',
        })

        data = await response.json()
        cartCount.textContent = data.cart.products.length
        showCart()
    })
}

showCart()