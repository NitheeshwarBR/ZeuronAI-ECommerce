const db = require('../database/db');

function addToCart(userId, productId, quantity) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.run(query, [userId, productId, quantity], function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

function getCartItems(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Cart WHERE user_id = ?`;
        db.all(query, [userId], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

function removeCartItems(cartItemId) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM Cart WHERE id = ?`;
        db.run(query, [cartItemId], function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItems
};
