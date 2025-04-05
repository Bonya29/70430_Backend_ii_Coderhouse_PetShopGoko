async function showProducts() {
    const response = await fetch('/api/products')
    const data = await response.json()
    const products = data.products
    const productsContainer = document.getElementById('products')
    products.forEach(product => {
        productsContainer.innerHTML += `
        <div class="product-card" id="${product._id}">
            <img src="${product.image}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <p class="stock">Unidades Disponibles<br>${product.stock}</p>
            <div class="btns" style="margin: auto 0 0 0; display: none"><button class="upd">Editar</button><button class="del">X</button></div>
        </div>
        `
    })
}

showProducts()