const activityService = require('../services/activityService');

//TO ADD AN NEW ACTIVITY 
const addActivity = async (req, res) => {
    try {
        const user_id = req.user.id;
        const email = req.user.email;
        const { task_id, description, date } = req.body;

        const result = await activityService.addActivity(user_id, email, task_id, description, date);
        res.json(result);
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

//TO GET AN ACTIVITY FOR A SPECIFIC TASK    
const getActivitiesForTask = async (req, res) => {
    const user_id = req.user.id;
    const user_email = req.user.email;    
    const task_id = req.params.task_id;

    try {
        const taskData = await activityService.getActivitiesForTask(user_id, user_email, task_id);

        if (!taskData) {
            return res.status(404).json({ error: "No activities found for this task or user" });
        }

        res.json(taskData);
    } catch (error) {
        console.error("Error fetching activities:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    getActivitiesForTask,
    addActivity
};