document.addEventListener("DOMContentLoaded", async function() {
    await fetchCartItems();
});

async function fetchCartItems() {
    try {
        const result = await window.api.fetchCartItems();
        if (result.error) {
            alert(`Error fetching cart items: ${result.error}`);
        } else {
            displayCartItems(result.cartItems);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '<h3>Cart Items</h3>';
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.title}">
            <h3>${item.product.title}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.product.price}</p>
            <button onclick="removeCartItem(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

async function removeCartItem(cartItemId) {
    try {
        const result = await window.api.removeCartItem(cartItemId);
        if (result.error) {
            alert(`Error removing cart item: ${result.error}`);
        } else {
            await fetchCartItems();
            alert("Cart item removed successfully");
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
