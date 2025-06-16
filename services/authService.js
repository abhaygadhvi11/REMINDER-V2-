// services/authService.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbConfig'); // Assuming you already have a database configuration

// Service to handle user signup
async function signupUser(email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

        return new Promise((resolve, reject) => {
            db.query(sql, [email, hashedPassword], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    } catch (error) {
        throw new Error('Error during password hashing');
    }
}

// Service to handle user login
async function loginUser(email, password) {
    const sql = 'SELECT * FROM users WHERE email = ?';

    return new Promise((resolve, reject) => {
        db.query(sql, [email], async (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length === 0) {
                reject(new Error('Invalid credentials'));
            } else {
                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    reject(new Error('Invalid credentials'));
                } else {
                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '10h' }
                    );
                    resolve(token);
                }
            }
        });
    });
}

module.exports = { signupUser, loginUser };
