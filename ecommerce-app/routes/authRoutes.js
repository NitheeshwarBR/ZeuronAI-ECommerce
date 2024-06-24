const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logout);
router.put('/update-username', authenticateToken, authController.updateUsername);
router.put('/update-password', authenticateToken, authController.updatePassword);

module.exports = router;
