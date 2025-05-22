// repositories/authRepository.js



const db = require('../dbConfig');

// Find user by email
const findUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0] || null);
        });
    });
};

// Create new user                              
const createUser = (email, hashedPassword) => {                             
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';                
    return new Promise((resolve, reject) => {
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

module.exports = {
    findUserByEmail,
    createUser
};




// const db = require('../dbConfig');

// // Find user by email
// const findUserByEmail = (email) => {
//     const sql = 'SELECT * FROM users WHERE email = ?';
//     return new Promise((resolve, reject) => {
//         db.query(sql, [email], (err, results) => {
//             if (err) {
//                 console.error('Database error in findUserByEmail:', err);
//                 return reject(err);
//             }
//             resolve(results[0] || null);
//         });
//     });
// };

// // Create new user                              
// const createUser = (email, hashedPassword) => {                             
//     const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';                
//     return new Promise((resolve, reject) => {
//         db.query(sql, [email, hashedPassword], (err, result) => {
//             if (err) {
//                 console.error('Database error in createUser:', err);
//                 // Handle duplicate email error
//                 if (err.code === 'ER_DUP_ENTRY') {
//                     const error = new Error('Email already exists');
//                     error.status = 409;
//                     return reject(error);
//                 }
//                 return reject(err);
//             }
//             resolve(result.insertId);
//         });
//     });
// };

// module.exports = {
//     findUserByEmail,
//     createUser
// };



