const productModel = require('../models/productModel');

async function addProduct(req, res) {
    const { image, title, description, price, category } = req.body;
    try {
        const productId = await productModel.createProduct({ image, title, description, price, category });
        return res.status(201).json({ id: productId, message: "Product added successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
    }
}

async function listProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        return res.status(200).json({ products, message: "Products listed successfully" });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Error fetching the products" });
    }
}

async function searchProducts(req, res) {
    const query = req.query.q;
    try {
        const products = await productModel.searchProducts(query);
        return res.status(200).json({ products, message: "Products searched successfully" });
    } catch (error) {
        console.error("Error searching products:", error);
        return res.status(500).json({ error: "Error searching products" });
    }
}

async function getProductById(req, res) {
    const productId = req.params.productId;
    try {
        const product = await productModel.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({ product, message: "Product fetched successfully" });
    } catch (error) {
        console.error(`Error fetching product by ID ${productId}:`, error);
        return res.status(500).json({ error: "Error fetching the product" });
    }
}

module.exports = {
    addProduct,
    listProducts,
    searchProducts,
    getProductById
};
