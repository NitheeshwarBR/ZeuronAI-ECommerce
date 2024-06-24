const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addProduct);
router.get('/', productController.listProducts);
router.get('/search', productController.searchProducts);
router.get('/:productId', productController.getProductById);

module.exports = router;
