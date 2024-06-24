const db = require('../database/db');

function addReview(userId, productId, rating, comment) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)`;
        db.run(query, [userId, productId, rating, comment], function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

function getReviews(productId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Reviews WHERE product_id = ?`;
        db.all(query, [productId], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

module.exports = {
    addReview,
    getReviews
};
