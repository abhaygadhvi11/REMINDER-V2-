const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

// Define the route to get all policies
router.get('/policies', policyController.getAllPolicies);

// Define the route to get policy by ID
router.get('/policies/:id', policyController.getPolicyById);

// Define the route to create a new policy
router.post('/policies', policyController.createPolicy);

module.exports = router;
