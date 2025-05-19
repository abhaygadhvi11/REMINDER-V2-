const authService = require('../services/authService');

// User Signup
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.signup(email, password);
        res.json(result);
    } catch (error) {
        console.error('Error in signup controller:', error);
        res.status(error.status || 500).json({ error: error.message || 'Server error' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(error.status || 500).json({ error: error.message || 'Server error' });
    }
};