const workflowInstanceService = require('../services/workflowInstanceService');

// API to create a new workflow instance
const createInstance = (req, res) => {
  const { workflow_id, triggered_by, status } = req.body;

  if (!workflow_id || !triggered_by || !status) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  workflowInstanceService.createInstance({ workflow_id, triggered_by, status }, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error creating workflow instance' });
    }
    res.status(201).json({ 
      message: 'Workflow instance created successfully', 
      instanceId: result.instanceId,
      stepsInitialized: result.stepsInitialized 
    });
  });
};

const updateInstanceStatus = (req, res) => {
  const instanceId = req.params.id;  // Fetch the 'id' from the URL params
  console.log('Request params:', req.params); // Log to verify 'id' is there

  // Check if instanceId is available
  if (!instanceId) {
    return res.status(400).json({ message: 'Workflow instance ID is missing' });
  }

  const { status } = req.body;  // Get the status from the request body
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');  // Format the current time

  // Call service to update the status
  workflowInstanceService.updateStatus(instanceId, status, currentDateTime, (err, result) => {
    if (err) {
      console.error('Error updating workflow instance status:', err);
      return res.status(500).json({ error: 'Error updating status' });
    }
    res.status(200).json({ message: 'Workflow instance status updated successfully', result });
  });
};

module.exports = { createInstance, updateInstanceStatus };