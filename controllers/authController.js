
const authService = require('../services/authService');

// User Signup Controller
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.signup(email, password);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error in signup controller:', error);
        res.status(error.status || 500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
};

// User Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(error.status || 500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
};