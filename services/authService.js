
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// User Signup Service
const signup = async (email, password) => {
    // Validation
    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
    }

    if (!emailRegex.test(email)) {
        const error = new Error('Please provide a valid email address');
        error.status = 400;
        throw error;
    }

    if (password.length < 6) {
        const error = new Error('Password must be at least 6 characters long');
        error.status = 400;
        throw error;
    }

    try {
        // Check if user already exists
        const existingUser = await authRepository.findUserByEmail(email);
        if (existingUser) {
            const error = new Error('User with this email already exists');
            error.status = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security
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

        // Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '10h' }
        );

        return { 
            token,
            user: {
                id: user.id,
                email: user.email
            }
        };
    } catch (error) {
        console.error('Error during user login:', error);
        throw error;
    }
};

module.exports = {
    signup,
    login
};