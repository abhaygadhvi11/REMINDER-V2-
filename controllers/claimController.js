// controllers/claimController.js
const claimService = require('../services/claimService');

const getAllClaims = (req, res) => {
  claimService.getAllClaims((error, claims) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching claims' });
    }
    res.status(200).json(claims); 
  });
};


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
//     res.status(200).json(claim); 
//   });
// };

// CONTROLLER
// API to get claim by Policy ID
const getClaimByPolicyId = (req, res) => {
  const policyId = req.params.id;

  if (!policyId) {
    return res.status(400).json({ message: 'Policy ID is missing' });
  }

  claimService.getClaimByPolicyId(policyId, (error, claims) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching claims' });
    }
    if (!claims || claims.length === 0) {
      return res.status(404).json({ message: 'No claims found for this policy' });
    }
    res.status(200).json(claims); 
  });
};


// API to create a new claim
const createClaim = (req, res) => {
  const user_id = req.user?.id || req.user?.userId;
  
  if (!user_id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { policy_id, claim_amount, status } = req.body;

  if (!policy_id || !claim_amount) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  const claimData = {
    user_id,
    policy_id,
    claim_amount,
    status: status || 'pending',
    //workflow_id
  };
      
  claimService.createClaim(claimData, (error, claimId) => {
    if (error) {
      return res.status(500).json({ message: 'Error creating claim' });
    }
    res.status(201).json({ message: 'Claim created successfully', claimId });
  });
};

module.exports = { getAllClaims, getClaimByPolicyId, createClaim };