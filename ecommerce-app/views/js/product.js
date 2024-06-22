document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', searchProducts);
});

function toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

function fetchProducts() {
    fetch('http://localhost:3001/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => console.error('Error fetching products:', error));
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
            <button onclick="showProductModal(${product.id})">Add to Cart</button>
        `;
        productCard.addEventListener('click', () => showProductModal(product));
        productList.appendChild(productCard);
    });
}

function searchProducts() {
    const query = document.getElementById('search-bar').value;
    fetch(`http://localhost:3001/products/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => console.error('Error searching products:', error));
}

function showProductModal(product) {
    const modal = document.getElementById('product-modal');
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-title').innerText = product.title;
    document.getElementById('modal-description').innerText = product.description;
    document.getElementById('modal-price').innerText = `Price: $${product.price}`;
    
    // Fetch reviews
    fetch(`http://localhost:3001/products/${product.id}/reviews`)
        .then(response => response.json())
        .then(data => {
            const reviewsContainer = document.getElementById('modal-reviews');
            reviewsContainer.innerHTML = '';
            data.reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.innerHTML = `<strong>${review.user}</strong>: ${review.comment}`;
                reviewsContainer.appendChild(reviewElement);
            });
        })
        .catch(error => console.error('Error fetching reviews:', error));
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}
``
