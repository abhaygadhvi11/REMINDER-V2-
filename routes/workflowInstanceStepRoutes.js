const express = require('express');
const router = express.Router();
const workflowInstanceStepController = require('../controllers/workflowInstanceStepController');

// Define route to get all steps for a specific workflow instance
router.get('/workflow-instances/:instanceId/steps', workflowInstanceStepController.getInstanceSteps);

// Define route to update the status of a specific workflow step
router.put('/workflow-instances/:instanceId/steps/:stepId', workflowInstanceStepController.updateStepStatus);

module.exports = router;

