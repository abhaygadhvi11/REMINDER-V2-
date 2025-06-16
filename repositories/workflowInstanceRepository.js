const db = require('../dbConfig');  // Choose one consistent database connection

// Function to create a new workflow instance in the database
const createInstance = (instanceData, callback) => {
  const { workflow_id, triggered_by, status } = instanceData;

  const query = `INSERT INTO workflow_instances (workflow_id, triggered_by, status) VALUES (?, ?, ?)`;

  db.query(query, [workflow_id, triggered_by, status], (err, results) => {
    if (err) {
      console.error('Error inserting workflow instance:', err);
      return callback(err);
    }
    callback(null, results.insertId);
  });
};

// Function to update the status of a workflow instance in the database
const updateInstanceStatus = (instanceId, status, completedAt = null, callback) => {
  const query = `UPDATE workflow_instances SET status = ?, completed_at = ? WHERE id = ?`;

  db.query(query, [status, completedAt, instanceId], (err, results) => {
    if (err) {
      console.error('Error updating workflow instance status:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = { createInstance, updateInstanceStatus };