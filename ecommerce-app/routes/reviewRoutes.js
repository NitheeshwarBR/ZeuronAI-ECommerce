const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewControllers');

router.post('/', reviewController.addReview);
router.get('/:productId', reviewController.listReviews);

module.exports = router;
