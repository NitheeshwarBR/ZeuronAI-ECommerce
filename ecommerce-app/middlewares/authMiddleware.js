const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'Nitheesh@1234567890ZeuronAIEcommerceApplicationSystem');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}

module.exports = {authenticateToken};
