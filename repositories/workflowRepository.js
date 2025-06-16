const db = require('../dbConfig');

const createWorkflow = (workflowData, callback) => {
    const { workflow_name, description, version = 1, is_active = 1 } = workflowData;
  
    db.query(
      `INSERT INTO workflow_master (workflow_name, description, version, is_active)
       VALUES (?, ?, ?, ?)`,
      [workflow_name, description, version, is_active],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        callback(null, results.insertId);
      }
    );
  };
  
  module.exports = { createWorkflow };