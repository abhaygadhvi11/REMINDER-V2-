// ============================================
// SERVICE (services/policyService.js)
// ============================================
const policyRepository = require('../repositories/policyRepository');

// Function to get all policies using the repository
const getAllPolicies = (callback) => {
  policyRepository.getAllPolicies((err, policies) => {
    if (err) {
      console.error('Error in service while fetching policies:', err);
      return callback(err);
    } 
    callback(null, policies);
  });
};

// Function to get policy by ID using the repository    
const getPolicyById = (policyId, callback) => {
  policyRepository.getPolicyById(policyId, (err, policy) => {
    if (err) {
      console.error('Error in service while fetching policy by ID:', err);
      return callback(err);
    }
    callback(null, policy);
  });
};

// Function to create a new policy using the repository
const createPolicy = (policyData, callback) => {
  policyRepository.createPolicy(policyData, (err, policyId) => {
    if (err) {
      console.error('Error in service while creating policy:', err);
      return callback(err);
    }
    callback(null, policyId);
  }); 
};

module.exports = { getAllPolicies, getPolicyById, createPolicy };