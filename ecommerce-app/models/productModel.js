const { promises } = require('original-fs');
const db = require('../database/db');

function createProduct({ image, title, description, price, category }) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Products (image, title, description, price, category) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [image, title, description, price, category], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function getAllProducts() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Products`;
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    createProduct,
    getAllProducts
};
