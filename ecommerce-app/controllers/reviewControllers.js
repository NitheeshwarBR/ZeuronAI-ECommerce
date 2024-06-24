const reviewModel = require('../models/reviewModel');

async function addReview(req, res) {
    const { userId, productId, rating, comment } = req.body;
    try {
        const reviewId = await reviewModel.addReview(userId, productId, rating, comment);
        return res.status(201).json({ reviewId, message: "Review added successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error adding review" });
    }
}

async function listReviews(req, res) {
    const { productId } = req.params;
    try {
        const reviews = await reviewModel.getReviews(productId);
        return res.status(200).json({ reviews, message: "Retrieved reviews successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error fetching reviews" });
    }
}

module.exports = {
    addReview,
    listReviews
};
