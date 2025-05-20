const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const { verifyToken, IsAdmin } = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

// Public routes
router.get('/alumnireg', alumniController.getRegistrationPage);
router.get('/alumniassoc', alumniController.getAlumniAssociationPage);

// Alumni registration (public)
router.post('/reg_sub', upload.single('photo'), alumniController.registerAlumni);

// Admin routes
router.get('/viewalumni', verifyToken, IsAdmin, alumniController.getAllAlumni);

module.exports = router;