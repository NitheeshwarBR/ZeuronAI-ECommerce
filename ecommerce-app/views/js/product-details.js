document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        await fetchProductDetails(productId);
        await fetchReviews(productId);
    }

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await addReview(productId);
        await fetchReviews(productId); // Refresh reviews
    });
});

async function fetchProductDetails(productId) {
    try {
        const result = await window.api.fetchProductDetails(productId);
        if (result.error) {
            alert(`Error fetching product details: ${result.error}`);
        } else {
            displayProductDetails(result.product);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

async function fetchReviews(productId) {
    try {
        const result = await window.api.fetchReviews(productId);
        if (result.error) {
            alert(`Error fetching reviews: ${result.error}`);
        } else {
            displayReviews(result.reviews);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = '<h3>Reviews</h3>';
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <p>Rating: ${review.rating}</p>
            <p>${review.comment}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

async function addReview(productId) {
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    try {
        const result = await window.api.addReview(productId, rating, comment);
        if (result.error) {
            alert(`Error adding review: ${result.error}`);
        } else {
            alert("Review added successfully");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function addToCart(productId) {
    const quantity = 1; // Default quantity
    try {
        const result = await window.api.addToCart(productId, quantity);
        if (result.error) {
            alert(`Error adding to cart: ${result.error}`);
        } else {
            alert("Product added to cart successfully");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}
