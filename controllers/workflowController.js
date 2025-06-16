const workflowService = require('../services/workflowService');

const createWorkflow = (req, res) => {
  const { workflow_name, description, version, is_active } = req.body;

  if (!workflow_name) {
    return res.status(400).json({ message: 'workflow_name is required' });
  }

  workflowService.createWorkflow(
    { workflow_name, description, version, is_active },
    (error, workflowId) => {
      if (error) {
        console.error('Error creating workflow:', error);

        // Handle duplicate workflow_name error (Error code ER_DUP_ENTRY)
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Workflow name already exists' });
        }

        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(201).json({
        message: 'Workflow created successfully',
        workflowId,
      });
    }
  );
};

module.exports = { createWorkflow };
