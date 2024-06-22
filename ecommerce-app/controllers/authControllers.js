const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

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
        res.status(200).json({ id: userId, username });
    });
}

function login(req, res) {
    const { username, password } = req.body;
    User.getUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
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
                'Nitheesh@1234567890ZeuronAIEcommerceApplicationSystem',
                { expiresIn: '2h' }
            );
            res.cookie('jwt_token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // maxAge in milliseconds
            res.json({ token, message: 'Login successful' });
        });
    });
}

module.exports = { signup, login };
