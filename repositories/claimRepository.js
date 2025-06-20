// repositories/claimRepository.js
const db = require('../dbConfig');

// Function to get all claims
const getAllClaims = (callback) => {
  const query = `SELECT * FROM claims`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching claims:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// // Function to get claim by ID
// const getClaimById = (claimId, callback) => {
//   const query = `SELECT * FROM claims WHERE policy_id = ?`;
//   db.query(query, [claimId], (err, results) => {
//     if (err) {
//       console.error('Error fetching claim by ID:', err);
//       return callback(err);
//     }
//     callback(null, results[0]);
//   });
// };

// REPOSITORY
// Function to get claims by Policy ID
const getClaimByPolicyId = (policyId, callback) => {
  const query = `SELECT * FROM claims WHERE policy_id = ?`;
  db.query(query, [policyId], (err, results) => {
    if (err) {
      console.error('Error fetching claims by Policy ID:', err);
      return callback(err);
    }
    callback(null, results); // Return all claims for the policy
  });
};


// // Function to create a new claim in the database
// const createClaim = (claimData, callback) => {
//   const { user_id, policy_id, claim_amount, status, workflow_id } = claimData;

//   const query = `INSERT INTO claims (user_id, policy_id, claim_amount, status, workflow_id) 
//                  VALUES (?, ?, ?, ?, ?)`;

//   db.query(query, [user_id, policy_id, claim_amount, status, workflow_id], (err, results) => {
//     if (err) {
//       console.error('Error inserting claim:', err);
//       return callback(err);
//     }
//     callback(null, results.insertId);
//   });
// };

// // Export repository functions
// module.exports = { getAllClaims, getClaimById, createClaim };


// Function to create a new claim in the database
const createClaim = (claimData, callback) => {
  const { user_id, policy_id, claim_amount, status } = claimData;

  const query = `INSERT INTO claims (user_id, policy_id, claim_amount, status) 
                 VALUES (?, ?, ?, ?)`;

  db.query(query, [user_id, policy_id, claim_amount, status], (err, results) => {
    if (err) {
      console.error('Error inserting claim:', err);
      return callback(err);
    }
    callback(null, results.insertId);
  });   
};

// Export repository functions
module.exports = { getAllClaims, getClaimByPolicyId, createClaim };