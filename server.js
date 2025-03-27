require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); 
const activityRoutes = require('./routes/activityRoutes');
const jwt = require('jsonwebtoken'); 

const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET; 

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', activityRoutes); 

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

