// const policyService = require('../services/policyService');

// // API to get all policies
// const getAllPolicies = (req, res) => {
//   policyService.getAllPolicies((error, policies) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error fetching policies' });
//     }
//     res.status(200).json({ message: 'Policies retrieved successfully', policies });
//   });
// };
   
// // API to get policy by ID
// const getPolicyById = (req, res) => {
//   const policyId = req.params.id;

//   if (!policyId) {
//     return res.status(400).json({ message: 'Policy ID is missing' });
//   }

//   policyService.getPolicyById(policyId, (error, policy) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error fetching policy' });
//     }
//     if (!policy) {
//       return res.status(404).json({ message: 'Policy not found' });
//     }
//     res.status(200).json({ message: 'Policy retrieved successfully', policy });
//   });
// };

// // API to create a new policy
// const createPolicy = (req, res) => {
//   const { user_id, policy_number, type, coverage_amount, premium, start_date, end_date, status } = req.body;

//   if (!user_id || !policy_number || !type || !coverage_amount || !premium || !start_date || !end_date) {
//     return res.status(400).json({ message: 'Required fields are missing' });
//   }

//   // Set default status if not provided
//   const policyData = {       
//     user_id,
//     policy_number,  
//     type,
//     coverage_amount,
//     premium,
//     start_date,
//     end_date,
//     status: status || 'active'
//   };

//   policyService.createPolicy(policyData, (error, policyId) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error creating policy' });
//     }
//     res.status(201).json({ message: 'Policy created successfully', policyId });
//   });
// };

// module.exports = { getAllPolicies, getPolicyById, createPolicy };


// const db = require('../dbConfig');

// // Function to get all policies
// const getAllPolicies = (callback) => {
//   const query = `SELECT * FROM policies`;
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching policies:', err);
//       return callback(err);
//     }
//     callback(null, results);  
//   });
// };

// // Function to get policy by ID
// const getPolicyById = (policyId, callback) => {
//   const query = `SELECT * FROM policies WHERE id = ?`;
//   db.query(query, [policyId], (err, results) => {
//     if (err) {
//       console.error('Error fetching policy by ID:', err);
//       return callback(err);
//     }
//     callback(null, results[0]);
//   });
// };

// // Function to create a new policy in the database
// const createPolicy = (policyData, callback) => {
//   const { user_id, policy_number, type, coverage_amount, premium, start_date, end_date, status } = policyData;

//   const query = `INSERT INTO policies (user_id, policy_number, type, coverage_amount, premium, start_date, end_date, status) 
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

//   db.query(query, [user_id, policy_number, type, coverage_amount, premium, start_date, end_date, status], (err, results) => {
//     if (err) {
//       console.error('Error inserting policy:', err);
//       return callback(err);
//     }
//     callback(null, results.insertId);
//   });
// };

// // Export repository functions
// module.exports = { getAllPolicies, getPolicyById, createPolicy };


// const policyRepository = require('../repositories/policyRepository');

// // Function to get all policies using the repository
// const getAllPolicies = (callback) => {
//   policyRepository.getAllPolicies((err, policies) => {
//     if (err) {
//       console.error('Error in service while fetching policies:', err);
//       return callback(err);
//     } 
//     callback(null, policies);
//   });
// };

// // Function to get policy by ID using the repository    
// const getPolicyById = (policyId, callback) => {
//   policyRepository.getPolicyById(policyId, (err, policy) => {
//     if (err) {
//       console.error('Error in service while fetching policy by ID:', err);
//       return callback(err);
//     }
//     callback(null, policy);
//   });
// };

// // Function to create a new policy using the repository
// const createPolicy = (policyData, callback) => {
//   policyRepository.createPolicy(policyData, (err, policyId) => {
//     if (err) {
//       console.error('Error in service while creating policy:', err);
//       return callback(err);
//     }
//     callback(null, policyId);
//   }); 
// };

// module.exports = { getAllPolicies, getPolicyById, createPolicy };

// const claimService = require('../services/claimService');
// API to get all policies
// const getAllPolicies = (req, res) => {
//   policyService.getAllPolicies((error, policies) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error fetching policies' });
//     }
//     res.status(200).json({ message: 'Policies retrieved successfully', policies });
//   });
// };


// // API to get all claims
// const getAllClaims = (req, res) => {
//   claimService.getAllClaims((error, claims) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error fetching claims' });
//     }
//     res.status(200).json({ message: 'Claims retrieved successfully', claims });
//   });
// };

// // API to get claim by ID
// const getClaimById = (req, res) => {
//   const claimId = req.params.id;

//   if (!claimId) {
//     return res.status(400).json({ message: 'Claim ID is missing' });
//   }
  
//   claimService.getClaimById(claimId, (error, claim) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error fetching claim' });
//     }
//     if (!claim) {
//       return res.status(404).json({ message: 'Claim not found' });
//     }
//     res.status(200).json({ message: 'Claim retrieved successfully', claim });
//   });
// };

// // API to create a new claim
// const createClaim = (req, res) => {
//   const { user_id, policy_id, claim_amount, status, workflow_id } = req.body;

//   if (!user_id || !policy_id || !claim_amount) {
//     return res.status(400).json({ message: 'Required fields are missing' });
//   }

//   // Set default status if not provided
//   const claimData = {
//     user_id,
//     policy_id,
//     claim_amount,
//     status: status || 'pending',
//     workflow_id
//   };

//   claimService.createClaim(claimData, (error, claimId) => {
//     if (error) {
//       return res.status(500).json({ message: 'Error creating claim' });
//     }
//     res.status(201).json({ message: 'Claim created successfully', claimId });
//   });
// };

// module.exports = { getAllClaims, getClaimById, createClaim };

// const db = require('../dbConfig');

// // Function to get all claims
// const getAllClaims = (callback) => {
//   const query = `SELECT * FROM claims`;
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching claims:', err);
//       return callback(err);
//     }
//     callback(null, results);
//   });
// };

// // Function to get claim by ID
// const getClaimById = (claimId, callback) => {
//   const query = `SELECT * FROM claims WHERE id = ?`;
//   db.query(query, [claimId], (err, results) => {
//     if (err) {
//       console.error('Error fetching claim by ID:', err);
//       return callback(err);
//     }
//     callback(null, results[0]);
//   });
// };

// // Function to create a new claim in the database
// const createClaim = (claimData, callback) => {
//   const { user_id, policy_id, claim_amount, status, workflow_id } = claimData;

//   const query = `INSERT INTO claims (user_id, policy_id, claim_amount, status, workflow_id) 
//                 VALUES (?, ?, ?, ?, ?)`;

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

// const express = require('express');
// const router = express.Router();
// const claimController = require('../controllers/claimController');
// const authenticateToken = require('../middlewares/authMiddleware');


// // Define the route to get all claims
// router.get('/claims', authenticateToken, claimController.getAllClaims);

// // Define the route to get claim by ID
// router.get('/claims/:id', authenticateToken, claimController.getClaimById);

// // Define the route to create a new claim
// router.post('/claims', authenticateToken, claimController.createClaim);

// module.exports = router;

// const claimRepository = require('../repositories/claimRepository');

// // Function to get all claims using the repository
// const getAllClaims = (callback) => {
//   claimRepository.getAllClaims((err, claims) => {
//     if (err) {
//       console.error('Error in service while fetching claims:', err);
//       return callback(err);
//     }
//     callback(null, claims);
//   });
// };

// // Function to get claim by ID using the repository
// const getClaimById = (claimId, callback) => {
//   claimRepository.getClaimById(claimId, (err, claim) => { 
//     if (err) {
//       console.error('Error in service while fetching claim by ID:', err);
//       return callback(err);
//     }
//     callback(null, claim);
//   });
// };

// // Function to create a new claim using the repository
// const createClaim = (claimData, callback) => {
//   claimRepository.createClaim(claimData, (err, claimId) => {
//     if (err) {
//       console.error('Error in service while creating claim:', err);
//       return callback(err);
//     }
//     callback(null, claimId);
//   });
// };

// module.exports = { getAllClaims, getClaimById, createClaim };
