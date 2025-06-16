    const taskService = require('../services/taskService');
    const authService = require('../services/authService');


    const getAllTasks = async (req, res) => {
        try {
            const { f } = req.query;
            const tasks = await taskService.getAllTasks(f);
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    const createTask = async (req, res) => {
        try {
            const { description, startdate, enddate, reminder } = req.body;
            const user_id = req.user.id;
            const user_email = req.user.email;

            if (!description || !startdate || !enddate) {
                return res.status(400).json({ error: 'Description, Start Date, and End Date are required' });
            }

            const assignedSequence = "1,2,3,4";
            const initialAssignedUser = 1;
            const reminderValue = reminder ? 1 : 0;

            let reminderDate = null;
            if (reminderValue === 1) {
                let tempReminderDate = new Date(enddate);
                tempReminderDate.setDate(tempReminderDate.getDate() - 15);
                reminderDate = tempReminderDate.toISOString().split("T")[0];
            }

            const taskData = {
                description,
                email: user_email,
                startdate,
                enddate,
                reminder: reminderValue,
                reminderDate,
                user_id,
                assignedSequence,
                initialAssignedUser
            };

            const result = await taskService.createTask(taskData);
            res.json({
                message: 'Task added successfully',
                id: result.insertId,
                assigned_to: initialAssignedUser,
                reminder: reminderValue,
                reminder_date: reminderDate
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };


// MARK TASK AS DONE 
    const markTaskAsDone = async (req, res) => {
        const taskId = Number(req.params.taskId);
        const userId = req.user.id;
    
        if (isNaN(taskId)) {
            return res.status(400).json({ error: 'Invalid Task ID' });
        }
    
        try {
            const result = await taskService.markTaskAsDone(taskId, userId);
            res.json(result);
        } catch (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: err.message });
        }
    };
    
//get Tasks Created By User    
const getTasksCreatedByUser = async (req, res) => {
    const user_id = req.user.id;
    const filter = req.query.f;

    try {
        const tasks = await taskService.getTasksCreatedByUser(user_id, filter);
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get Tasks Assigned To User
const getTasksAssignedToUser = async (req, res) => {
    const user_id = req.user.id;
    const user_email = req.user.email;
    const filter = req.query.f;

    try {
        const tasks = await taskService.getTasksAssignedToUser(user_id, user_email, filter);
        if (!tasks.length) {
            return res.status(404).json({ error: 'No tasks assigned to this user' });
        }
        res.json(tasks);
    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
    
//get Tasks of specific user 
const getTasksForUser = async (req, res) => {
        const user_id = req.user.id;
        const user_email = req.user.email;
        const filter = req.query.f;
    
        try {
            const tasks = await taskService.getTasksForUser(user_id, user_email, filter);
            if (!tasks.length) {
                return res.status(404).json({ error: 'No tasks found for this user' });
            }
            res.json(tasks);
        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    const assignTaskToUser = async (req, res) => {
        try {
            const { assigned_to_email } = req.body;
            const taskId = req.params.taskId;
            const result = await taskService.assignTaskToUser(taskId, assigned_to_email);
            res.json(result);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    };
    
    
    module.exports = {
        
        getAllTasks,
        createTask,
        ...require('./taskController'), 
        markTaskAsDone,
        getTasksAssignedToUser,
        getTasksCreatedByUser,
        getTasksForUser,
        assignTaskToUser
    };