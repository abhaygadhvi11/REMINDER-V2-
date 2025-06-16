const workflowInstanceRepository = require('../repositories/workflowInstanceRepository');
const workflowInstanceStepService = require('./workflowInstanceStepService');

// Function to create a new workflow instance using the repository
const createInstance = (instanceData, callback) => {
  workflowInstanceRepository.createInstance(instanceData, (err, instanceId) => {
    if (err) {
      console.error('Error in service while creating workflow instance:', err);
      return callback(err);
    }
    
    // Now initialize the workflow steps
    workflowInstanceStepService.initializeWorkflowSteps(
      instanceData.workflow_id,
      instanceId, // Use the auto-incremented ID as instance_id
      (stepErr, stepResult) => {
        if (stepErr) {
          console.error('Error initializing workflow steps:', stepErr);
          // Note: We're still returning the instance ID even if step creation fails
          // You might want to handle this differently based on your requirements
        }
        
        callback(null, {
          instanceId,
          stepsInitialized: !stepErr
        });
      }
    );
  });
};

// Function to update status
const updateStatus = (instanceId, status, completedAt, callback) => {
  workflowInstanceRepository.updateInstanceStatus(instanceId, status, completedAt, (err, result) => {
    if (err) {
      console.error('Error in service while updating workflow instance status:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

module.exports = { createInstance, updateStatus };