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
