const workflowRepository = require('../repositories/workflowRepository');

const createWorkflow = (workflowData, callback) => {
  workflowRepository.createWorkflow(workflowData, callback);
};

module.exports = { createWorkflow };
