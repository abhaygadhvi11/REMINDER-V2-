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
