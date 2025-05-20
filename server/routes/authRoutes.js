const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login_auth', authController.login);
router.get('/checkAuth', verifyToken, authController.checkAuth);
// router.get('/logout', authController.logout);

module.exports = router;