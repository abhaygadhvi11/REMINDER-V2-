// REPOSITORY (repositories/policyRepository.js)

const db = require('../dbConfig');

// Function to get all policies
const getAllPolicies = (callback) => {
  const query = `SELECT * FROM policies`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching policies:', err);
      return callback(err);
    }
    callback(null, results);  
  });
};
[]
// Function to get policy by ID
const getPolicyById = (policyId, callback) => {
  const query = `SELECT * FROM policies WHERE id = ?`;
  db.query(query, [policyId], (err, results) => {
    if (err) {
      console.error('Error fetching policy by ID:', err);
      return callback(err);
    }
    callback(null, results[0]);
  });
};

// Function to create a new policy in the database
const createPolicy = (policyData, callback) => {
  const { user_id, policy_number, type, coverage_amount, premium, start_date, end_date, status } = policyData;

  const query = `INSERT INTO policies (user_id, policy_number, type, coverage_amount, premium, start_date, end_date, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [user_id, policy_number, type, coverage_amount, premium, start_date, end_date, status], (err, results) => {
    if (err) {
      console.error('Error inserting policy:', err);
      return callback(err);
    }
    callback(null, results.insertId);
  });
};

// Export repository functions
module.exports = { getAllPolicies, getPolicyById, createPolicy };