// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes
// These will be accessible at /api/auth/signup and /api/auth/login because of the prefix in server.js

// User registration endpoint
router.post('/signup', authController.signup);

// User login endpoint
router.post('/login', authController.login);

module.exports = router;