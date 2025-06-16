const express = require('express');
const router = express.Router();
const workflowInstanceController = require('../controllers/workflowInstanceController');

// Define the route to create a new workflow instance
router.post('/workflow-instance', workflowInstanceController.createInstance);

// Define the route to update the status of a workflow instance
router.put('/workflow-instances/:id', workflowInstanceController.updateInstanceStatus);

module.exports = router;

