
// routes/taskRoutes.js
const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const taskController = require('../controllers/taskController'); 
const authController = require('../controllers/authController');

const router = express.Router();

// Routes for tasks
router.get('/tasks', authenticateToken, taskController.getAllTasks); 
router.post('/tasks', authenticateToken, taskController.createTask); 
router.post('/tasks/:taskId/done', authenticateToken, taskController.markTaskAsDone);
router.get('/tasks/created', authenticateToken, taskController.getTasksCreatedByUser);
router.get('/tasks/assigned', authenticateToken, taskController.getTasksAssignedToUser);
router.get('/tasks/user', authenticateToken, taskController.getTasksForUser);
router.post('/tasks/:taskId/assign', authenticateToken, taskController.assignTaskToUser);


// Routes for user authentication
router.post('/signup', authController.signup);  
router.post('/login', authController.login);    

module.exports = router;



