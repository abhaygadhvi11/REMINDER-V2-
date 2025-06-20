// services/claimService.js
const claimRepository = require('../repositories/claimRepository');

// Function to get all claims using the repository
const getAllClaims = (callback) => {
  claimRepository.getAllClaims((err, claims) => {
    if (err) {
      console.error('Error in service while fetching claims:', err);
      return callback(err);
    }
    callback(null, claims);
  });
};

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

// SERVICE
// Function to get claims by Policy ID using the repository
const getClaimByPolicyId = (policyId, callback) => {
  claimRepository.getClaimByPolicyId(policyId, (err, claims) => { 
    if (err) {
      console.error('Error in service while fetching claims by Policy ID:', err);
      return callback(err);
    }
    callback(null, claims);
  });
};

// Function to create a new claim using the repository
const createClaim = (claimData, callback) => {
  claimRepository.createClaim(claimData, (err, claimId) => {
    if (err) {
      console.error('Error in service while creating claim:', err);
      return callback(err);
    }
    callback(null, claimId);
  });
};        

module.exports = { getAllClaims, getClaimByPolicyId, createClaim };