const db = require('../dbConfig');

// Function to create a new workflow instance step in the database
const createInstanceStep = (stepData, callback) => {
  const {
    instance_id,
    workflow_step_id,
    step_order,
    step_name,
    action,
    assigned_role,
    assigned_to,
    workflow_id
  } = stepData;

  const query = `
    INSERT INTO workflow_instance_steps 
    (instance_id, workflow_step_id, step_order, step_name, action, assigned_role, assigned_to, workflow_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [instance_id, workflow_step_id, step_order, step_name, action, assigned_role, assigned_to, workflow_id],
    (err, results) => {
      if (err) {
        console.error('Error inserting workflow instance step:', err);
        return callback(err);
      }
      callback(null, results.insertId);
    }
  );
};

// Function to get workflow steps by workflow ID
const getWorkflowStepsByWorkflowId = (workflowId, callback) => {
  const query = `SELECT * FROM workflow_steps WHERE workflow_id = ? ORDER BY step_order ASC`;
  
  db.query(query, [workflowId], (err, results) => {
    if (err) {
      console.error('Error fetching workflow steps:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Function to update the status of a workflow instance step
const updateStepStatus = (instanceId, workflowStepId, status, comment = null, callback) => {
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const completedAt = status === 'completed' ? currentDateTime : null;
  
  const query = `
    UPDATE workflow_instance_steps 
    SET status = ?, 
        comment = ?, 
        completed_at = ? 
    WHERE instance_id = ? AND workflow_step_id = ?
  `;

  db.query(query, [status, comment, completedAt, instanceId, workflowStepId], (err, results) => {
    if (err) {
      console.error('Error updating workflow instance step status:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Function to get all steps for a specific workflow instance
const getStepsByInstanceId = (instanceId, callback) => {
  const query = `SELECT * FROM workflow_instance_steps WHERE instance_id = ? ORDER BY step_order ASC`;
  
  db.query(query, [instanceId], (err, results) => {
    if (err) {
      console.error('Error fetching workflow instance steps:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createInstanceStep,
  getWorkflowStepsByWorkflowId,
  updateStepStatus,
  getStepsByInstanceId
};