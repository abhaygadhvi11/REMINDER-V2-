const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

// User Signup Service
const signup = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertId = await authRepository.createUser(email, hashedPassword);
        
        return {
            message: 'User registered successfully',
            id: insertId
        };
    } catch (error) {
        console.error('Error during user registration:', error);
        throw error;
    }
};

// User Login Service
const login = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
    }

    try {
        const user = await authRepository.findUserByEmail(email);
        
        if (!user) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '10h' }
        );

        return { token };
    } catch (error) {
        console.error('Error during user login:', error);
        throw error;
    }
};

module.exports = {
    signup,
    login
};
