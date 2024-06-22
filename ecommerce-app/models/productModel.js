const { promises } = require('original-fs');
const db = require('../database/db');
const { resolve } = require('path');

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
                return ;
            } else {
                resolve(rows);
            }
        });
    });
}

function searchProducts(query) {
    return new Promise((resolve, reject) => {
        const searchQuery = `SELECT * FROM Products WHERE title LIKE ? OR description LIKE ?`;
        db.all(searchQuery, [`%${query}%`, `%${query}%`], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}
module.exports = {
    createProduct,
    getAllProducts,
    searchProducts
};
