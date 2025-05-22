// // routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration endpoint
router.post('/auth/signup', authController.signup);

// User login endpoint
router.post('/auth/login', authController.login);

module.exports = router;