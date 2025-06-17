// routes/claimRoutes.js
const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const authenticateToken = require('../middlewares/authMiddleware');

// Define the route to get all claims
router.get('/claims', authenticateToken, claimController.getAllClaims);

// Define the route to get claim by ID
router.get('/claims/:id', authenticateToken, claimController.getClaimById);

// Define the route to create a new claim
router.post('/claims', authenticateToken, claimController.createClaim);

module.exports = router;     