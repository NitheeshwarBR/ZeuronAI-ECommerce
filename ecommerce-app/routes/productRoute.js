const express = require('express');
const router  = express.Router();
const productModel = require('../models/productModel');

router.post('/', async (req, res) => {
    const { image, title, description, price, category } = req.body;
    try {
        const productId = await productModel.createProduct({ image, title, description, price, category });
        return res.status(201).json({ id: productId, message: "Product added successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
    }
});

router.get('/',async(req,res)=>{
    try{
        const products = await productModel.getAllProducts();
        return res.status(200).json({products,message:"Products listed successfully"});
    }
    catch(error){
        return res.status(500).json({error:"Error Fetching the Products"});
    }
});

module.exports=router;
