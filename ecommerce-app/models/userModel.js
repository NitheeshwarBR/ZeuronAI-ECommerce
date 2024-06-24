const db = require('../database/db');

function createUser(username, password, callback) {
    const query = `INSERT INTO Users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], function(err) {
        callback(err, this ? this.lastID : null);
    });
}

function getUserByUsername(username, callback) {
    const query = `SELECT * FROM Users WHERE username = ?`;
    db.get(query, [username], (err, row) => {
        callback(err, row);
    });
}

function getUserById(userId, callback) {
    const query = `SELECT * FROM Users WHERE id = ?`;
    db.get(query, [userId], (err, row) => {
        callback(err, row);
    });
}

function updateUsername(userId, newUsername, callback) {
    const query = `UPDATE Users SET username = ? WHERE id = ?`;
    db.run(query, [newUsername, userId], function(err) {
        callback(err);
    });
}

function updatePassword(userId, newPassword, callback) {
    const query = `UPDATE Users SET password = ? WHERE id = ?`;
    db.run(query, [newPassword, userId], function(err) {
        callback(err);
    });
}

module.exports = { createUser, getUserByUsername, getUserById, updateUsername, updatePassword };
