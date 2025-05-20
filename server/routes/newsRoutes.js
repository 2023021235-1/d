const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyToken, IsAdmin } = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

// Public routes (no auth required)
router.get('/', newsController.getMarqueeData);
router.get('/viewallnews', newsController.getAllNews);
router.get('/viewallevent', newsController.getAllEvents);

// Admin routes
router.get('/viewNews', verifyToken, IsAdmin, newsController.getNewsForAdmin);
router.post('/uploadnews', verifyToken, IsAdmin, upload.single('myfile'), newsController.uploadNews);
router.get('/delete_news/:id/:file?', verifyToken, IsAdmin, newsController.deleteNews);
router.get('/uploadNews', verifyToken, IsAdmin, newsController.getUploadNewsPage);

module.exports = router;