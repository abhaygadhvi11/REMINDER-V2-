/*require('dotenv').config();
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
*/
/*
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const activityRoutes = require('./routes/activityRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const workflowStepRoutes = require('./routes/workflowStepRoutes');
const workflowInstanceRoutes = require('./routes/workflowInstanceRoutes');


app.use(bodyParser.json());

// Use routes
app.use('/api', taskRoutes);
//app.use(taskRoutes); 
app.use('/api', activityRoutes);
//app.use(activityRoutes);
app.use('/api', workflowRoutes);
//
app.use('/api', workflowStepRoutes);
//
app.use('/api', workflowInstanceRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const activityRoutes = require('./routes/activityRoutes');
const workflowRoutes = require('./routes/workflowRoutes');
const workflowStepRoutes = require('./routes/workflowInstanceStepService.js');
const workflowInstanceRoutes = require('./routes/workflowInstanceRoutes');
const workflowInstanceStepRoutes = require('./routes/workflowInstanceStepRoutes'); 
const claimRoutes = require('./routes/claimRoutes');
const policyRoutes = require('./routes/policyRoutes');
const db = require('./models');
//const logger = require('./utils/logger');

app.use(bodyParser.json());

// Use routes  
app.use('/api', taskRoutes);
app.use('/api', activityRoutes);
app.use('/api', workflowRoutes);
app.use('/api', workflowStepRoutes);
app.use('/api', workflowInstanceRoutes);
app.use('/api', workflowInstanceStepRoutes); 
app.use('/api', claimRoutes);
app.use('/api', policyRoutes);

// Error handling middleware   
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
