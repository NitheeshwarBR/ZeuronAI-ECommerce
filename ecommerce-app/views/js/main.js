document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', searchProducts);
});

function toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

async function fetchProducts() {
    try {
        const result = await window.api.fetchProducts();
        if (result.error) {
            alert(`Error fetching products: ${result.error}`);
        } else {
            displayProducts(result.products);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="viewProduct(${product.id})">View Details</button>
        `;
        productList.appendChild(productCard);
    });
}

async function searchProducts() {
    const query = document.getElementById('search-bar').value;
    try {
        const result = await window.api.searchProducts(query);
        if (result.error) {
            alert(`Error searching products: ${result.error}`);
        } else {
            displayProducts(result.products);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function viewProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

async function addToCart(productId) {
    const token = localStorage.getItem('token');
    try {
        const result = await window.api.addToCart(productId, 1);
        if (result.error) {
            alert(`Error adding to cart: ${result.error}`);
        } else {
            alert("Product added to cart successfully");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}
