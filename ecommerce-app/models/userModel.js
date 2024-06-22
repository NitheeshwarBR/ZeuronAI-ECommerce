const db = require('../database/db');

function createUser(username, password, callback) {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], function(err) {
        callback(err, this.lastID);
    });
}

function getUserByUsername(username, callback) {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], function(err, row) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, row);
    });
}

module.exports = { createUser, getUserByUsername };
