const express = require('express');
const router  = express.Router();
const productController = require('../controllers/productController');


router.post('/',productController.addProduct);
router.get('/',productController.listProducts);
router.get('/search',productController.searchProducts);


module.exports=router;
