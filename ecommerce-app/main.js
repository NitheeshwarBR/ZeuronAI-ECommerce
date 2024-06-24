const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    mainWindow.loadFile('views/signup.html'); // Initial page
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC handlers for signup, login, fetching products, adding to cart, fetching cart items,
// removing cart items, fetching product details, adding reviews, fetching reviews

ipcMain.handle('signup', async (event, username, password) => {
    try {
        const response = await axios.post('http://localhost:3001/auth/signup', { username, password });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || 'An error occurred during signup' };
    }
});

ipcMain.handle('login', async (event, username, password) => {
    try {
        const response = await axios.post('http://localhost:3001/auth/login', { username, password });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || 'An error occurred during login' };
    }
});

ipcMain.handle('fetch-products', async () => {
    try {
        const response = await axios.get('http://localhost:3001/products');
        return response.data;
    } catch (error) {
        return { error: error.message || 'An error occurred while fetching products' };
    }
});

ipcMain.handle('add-to-cart', async (event, productId, quantity) => {
    try {
        const response = await axios.post('http://localhost:3001/cart', { productId, quantity });
        return response.data;
    } catch (error) {
        return { error: error.message || 'An error occurred while adding to cart' };
    }
});

ipcMain.handle('fetch-cart-items', async () => {
    try {
        const response = await axios.get('http://localhost:3001/cart');
        return response.data;
    } catch (error) {
        return { error: error.message || 'An error occurred while fetching cart items' };
    }
});

ipcMain.handle('remove-cart-item', async (event, cartItemId) => {
    try {
        const response = await axios.delete(`http://localhost:3001/cart/${cartItemId}`);
        return response.data;
    } catch (error) {
        return { error: error.message || 'An error occurred while removing cart item' };
    }
});

ipcMain.handle('fetch-product-details', async (event, productId) => {
    try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        return response.data;
    } catch (error) {
        return { error: error.message || 'An error occurred while fetching product details' };
    }
});

ipcMain.handle('add-review', async (event, productId, rating, comment) => {
    try {
        const response = await axios.post('http://localhost:3001/reviews', { productId, rating, comment });
        return response.data;
    } catch (error) {
        return { error: error.message || 'An error occurred while adding the review' };
    }
});

ipcMain.handle('fetch-reviews', async (event, productId) => {
    try {
        const response = await axios.get(`http://localhost:3001/reviews/${productId}`);
        return response.data;
    } catch (error) {
        return { error: error.message || 'An error occurred while fetching reviews' };
    }
});
