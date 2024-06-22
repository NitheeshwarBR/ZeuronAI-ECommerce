const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'Nitheesh@1234567890ZeuronAIEcommerceApplicationSystem', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.use('/auth', authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});

module.exports = app;
