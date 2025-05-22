
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const taskRoutes = require('./routes/taskRoutes');
// const activityRoutes = require('./routes/activityRoutes');
// const workflowRoutes = require('./routes/workflowRoutes');
// const workflowStepRoutes = require('./routes/workflowInstanceStepService.js');
// const workflowInstanceRoutes = require('./routes/workflowInstanceRoutes');
// const workflowInstanceStepRoutes = require('./routes/workflowInstanceStepRoutes'); 
// const claimRoutes = require('./routes/claimRoutes');
// const policyRoutes = require('./routes/policyRoutes');
// const authRoutes = require('./routes/authRoutes');
// //const db = require('./models');
// //const logger = require('./utils/logger');

// // Middleware
// app.use(bodyParser.json());


// // Use routes  
// app.use('/api', taskRoutes);
// app.use('/api', activityRoutes);
// app.use('/api', workflowRoutes);
// app.use('/api', workflowStepRoutes);
// app.use('/api', workflowInstanceRoutes);
// app.use('/api', workflowInstanceStepRoutes); 
// app.use('/api', claimRoutes);
// app.use('/api', policyRoutes);
// app.use('/api', authRoutes);


// // Error handling middleware   
// app.use((err, req, res, next) => {
//     res.status(500).json({ error: err.message });
// });


// // app.use(cors({
// // origin: "http://localhost:5173", // allow frontend origin
// // methods: ["GET", "POST", "PUT", "DELETE"],
// // allowedHeaders: ["Content-Type", "Authorization"],
// // credentials: true, // allow cookies, authorization headers
// // }));

// //PORT 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const activityRoutes = require('./routes/activityRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const workflowInstanceRoutes = require('./routes/workflowInstanceRoutes');
const workflowInstanceStepRoutes = require('./routes/workflowInstanceStepRoutes'); 
const claimRoutes = require('./routes/claimRoutes');
const policyRoutes = require('./routes/policyRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Use routes  
app.use('/api', taskRoutes);
app.use('/api', activityRoutes);
app.use('/api', workflowRoutes);
app.use('/api', workflowInstanceRoutes);
app.use('/api', workflowInstanceStepRoutes); 
app.use('/api', claimRoutes);
app.use('/api', policyRoutes);
app.use('/api', authRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handling middleware   
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({ 
        error: err.message || 'Internal server error' 
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});