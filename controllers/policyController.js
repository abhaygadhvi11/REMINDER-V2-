// ============================================
// CONTROLLER (controllers/policyController.js)
// ============================================
const policyService = require('../services/policyService');

// API to get all policies
const getAllPolicies = (req, res) => {
  policyService.getAllPolicies((error, policies) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching policies' });
    }
    res.status(200).json({ message: 'Policies retrieved successfully', policies });
  });
};
   
// API to get policy by ID
const getPolicyById = (req, res) => {
  const policyId = req.params.id;

  if (!policyId) {
    return res.status(400).json({ message: 'Policy ID is missing' });
  }

  policyService.getPolicyById(policyId, (error, policy) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching policy' });
    }
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.status(200).json({ message: 'Policy retrieved successfully', policy });
  });
};

// API to create a new policy
const createPolicy = (req, res) => {
  // Get user_id from JWT token
  const user_id = req.user?.id || req.user?.userId;
  
  if (!user_id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { policy_number, type, coverage_amount, premium, start_date, end_date, status } = req.body;

  if (!policy_number || !type || !coverage_amount || !premium || !start_date || !end_date) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  // Set default status if not provided
  const policyData = {       
    user_id, // Now taken from JWT token
    policy_number,  
    type,
    coverage_amount,
    premium,
    start_date,
    end_date,
    status: status || 'active'
  };

  policyService.createPolicy(policyData, (error, policyId) => {
    if (error) {
      return res.status(500).json({ message: 'Error creating policy' });
    }
    res.status(201).json({ message: 'Policy created successfully', policyId });
  });
};

module.exports = { getAllPolicies, getPolicyById, createPolicy };