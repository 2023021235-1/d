const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController'); // Adjust path if necessary

// POST /api/register
// Expects form data in the request body
router.post('/register', registrationController.handleRegistration);

module.exports = router;