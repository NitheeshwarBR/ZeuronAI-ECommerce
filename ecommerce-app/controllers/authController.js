const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'Nitheesh@1234567890ZeuronAIEcommerceApplicationSystem';
const TOKEN_EXPIRY = '2h';

function signup(req, res) {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.createUser(username, hashedPassword, (err, userId) => {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).json({ error: 'Username already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: userId, username });
    });
}

function login(req, res) {
    const { username, password } = req.body;
    User.getUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
            if (bcryptError) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: TOKEN_EXPIRY }
            );
            res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // maxAge in milliseconds
            res.json({ id: user.id, message: 'Login successful' });
        });
    });
}

function logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
}

function updateUsername(req, res) {
    const { newUsername } = req.body;
    const userId = req.user.id;

    User.updateUsername(userId, newUsername, (err) => {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).json({ error: 'Username already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Username updated successfully' });
    });
}

function updatePassword(req, res) {
    const { newPassword } = req.body;
    const userId = req.user.id;

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    User.updatePassword(userId, hashedPassword, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Password updated successfully' });
    });
}

module.exports = { signup, login, logout, updateUsername, updatePassword };
