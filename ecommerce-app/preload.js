const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    signup: (username, password) => ipcRenderer.invoke('signup', username, password),
    login: (username, password) => ipcRenderer.invoke('login', username, password),
    fetchProducts: () => ipcRenderer.invoke('fetch-products'),
    addToCart: (productId, quantity) => ipcRenderer.invoke('add-to-cart', productId, quantity),
    fetchCartItems: () => ipcRenderer.invoke('fetch-cart-items'),
    removeCartItem: (cartItemId) => ipcRenderer.invoke('remove-cart-item', cartItemId),
    fetchProductDetails: (productId) => ipcRenderer.invoke('fetch-product-details', productId),
    addReview: (productId, rating, comment) => ipcRenderer.invoke('add-review', productId, rating, comment),
    fetchReviews: (productId) => ipcRenderer.invoke('fetch-reviews', productId)
});
