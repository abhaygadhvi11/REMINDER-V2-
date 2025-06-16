const workflowInstanceStepService = require('../services/workflowInstanceStepService');

// API to update the status of a specific workflow step
const updateStepStatus = (req, res) => {
  const { instanceId, stepId } = req.params;
  const { status, comment } = req.body;

  if (!instanceId || !stepId) {
    return res.status(400).json({ message: 'Instance ID and Step ID are required' });
  }

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  workflowInstanceStepService.updateStepStatus(
    instanceId,
    stepId,
    status,
    comment || null,
    (err, result) => {
      if (err) {
        console.error('Error updating workflow step status:', err);
        return res.status(500).json({ error: 'Error updating step status' });
      }
      res.status(200).json({ message: 'Workflow step status updated successfully', result });
    }
  );
};

// API to get all steps for a specific workflow instance
const getInstanceSteps = (req, res) => {
  const { instanceId } = req.params;

  if (!instanceId) {
    return res.status(400).json({ message: 'Instance ID is required' });
  }

  workflowInstanceStepService.getStepsByInstanceId(instanceId, (err, steps) => {
    if (err) {
      console.error('Error fetching workflow instance steps:', err);
      return res.status(500).json({ error: 'Error fetching instance steps' });
    }
    res.status(200).json({ steps });
  });
};

module.exports = {
  updateStepStatus,
  getInstanceSteps
};