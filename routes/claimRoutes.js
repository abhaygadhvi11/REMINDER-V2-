const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

// Define the route to get all claims
router.get('/claims', claimController.getAllClaims);

// Define the route to get claim by ID
router.get('/claims/:id', claimController.getClaimById);

// Define the route to create a new claim
router.post('/claims', claimController.createClaim);

module.exports = router;