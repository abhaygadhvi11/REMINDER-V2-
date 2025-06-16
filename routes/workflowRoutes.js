const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

router.post('/workflows', workflowController.createWorkflow);

module.exports = router;
