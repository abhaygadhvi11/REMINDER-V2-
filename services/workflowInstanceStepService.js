const workflowInstanceStepRepository = require('../repositories/workflowInstanceStepRepository');

// Function to initialize workflow steps when a new workflow instance is created
const initializeWorkflowSteps = (workflowId, instanceId, callback) => {
  // First, get all the steps defined for this workflow
  workflowInstanceStepRepository.getWorkflowStepsByWorkflowId(workflowId, (err, steps) => {
    if (err) {
      console.error('Error fetching workflow steps:', err);
      return callback(err);
    }
    
    if (!steps || steps.length === 0) {
      return callback(new Error('No steps found for this workflow'));
    }
    
    let processedSteps = 0;
    const totalSteps = steps.length;
    const stepErrors = [];
    
    // For each step, create a record in workflow_instance_steps
    steps.forEach(step => {
      const stepData = {
        instance_id: instanceId,
        workflow_step_id: step.id,
        step_order: step.step_order,
        step_name: step.step_name,
        action: step.action,
        assigned_role: step.assigned_role,
        assigned_to: step.assigned_to,
        workflow_id: workflowId
      };
      
      workflowInstanceStepRepository.createInstanceStep(stepData, (stepErr) => {
        processedSteps++;
        
        if (stepErr) {
          stepErrors.push(stepErr);
        }
        
        // When all steps are processed, call the callback
        if (processedSteps === totalSteps) {
          if (stepErrors.length > 0) {
            return callback(new Error('Errors occurred while creating instance steps'));
          }
          callback(null, { message: 'Successfully initialized workflow steps' });
        }
      });
    });
  });
};

// Function to update the status of a workflow instance step
const updateStepStatus = (instanceId, workflowStepId, status, comment, callback) => {
  workflowInstanceStepRepository.updateStepStatus(
    instanceId,
    workflowStepId,
    status,
    comment,
    (err, result) => {
      if (err) {
        console.error('Error updating step status:', err);
        return callback(err);
      }
      callback(null, result);
    }
  );
};

// Function to get all steps for a specific workflow instance
const getStepsByInstanceId = (instanceId, callback) => {
  workflowInstanceStepRepository.getStepsByInstanceId(instanceId, (err, steps) => {
    if (err) {
      console.error('Error fetching instance steps:', err);
      return callback(err);
    }
    callback(null, steps);
  });
};

module.exports = {
  initializeWorkflowSteps,
  updateStepStatus,
  getStepsByInstanceId
};