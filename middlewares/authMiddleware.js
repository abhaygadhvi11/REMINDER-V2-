const jwt = require('jsonwebtoken');
require('dotenv').config();

//const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

    const token = authHeader.split(' ')[1]; 
    if (!token) return res.status(401).json({ error: 'Access Denied: Invalid Token Format' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid Token' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

