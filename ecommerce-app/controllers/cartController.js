const cartModel = require('../models/cartModel');

async function addToCart(req, res) {
    const { userId, productId, quantity } = req.body;

    try {
        const cartItemId = await cartModel.addToCart(userId, productId, quantity);
        return res.status(201).json({ cartItemId, message: "Product added to cart successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error adding product to cart" });
    }
}

async function getCartItems(req, res) {
    const userId = req.user.id;
    try {
        const cartItems = await cartModel.getCartItems(userId);
        res.status(200).json({ cartItems, message: "Cart items fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error fetching cart items" });
    }
}

async function removeCartItems(req, res) {
    const { cartItemId } = req.params;

    try {
        await cartModel.removeCartItems(cartItemId);
        return res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error removing product from cart" });
    }
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItems
};
