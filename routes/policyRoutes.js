const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');
const authenticateToken = require('../middlewares/authMiddleware');

// Define the route to get all policies
router.get('/policies', authenticateToken, policyController.getAllPolicies);

// Define the route to get policy by ID
router.get('/policies/:id',authenticateToken, policyController.getPolicyById);

// Define the route to create a new policy
router.post('/policies',authenticateToken, policyController.createPolicy);

module.exports = router;
