const activityRepository = require('../repositories/activityRepository');

//TO ADD AN NEW ACTIVITY 
const addActivity = async (user_id, email, task_id, description, date) => {
    if (!task_id || !description) {
        const error = new Error("Task ID and Description are required");
        error.status = 400;
        throw error;
    }

    const task = await activityRepository.checkTaskOwnership(task_id, user_id, email);
    if (!task) {
        const error = new Error("Task not found or you are not authorized to add an activity");
        error.status = 403;
        throw error;
    }

    const activityDate = date ? new Date(date) : new Date();
    const insertedId = await activityRepository.insertActivity(task_id, activityDate, email, description);

    return {
        message: "Activity added successfully",
        insertedId
    };
};

//TO GET AN ACTIVITY FOR A SPECIFIC TASK 
const getActivitiesForTask = async (user_id, user_email, task_id) => {
    const results = await activityRepository.getActivitiesForTask(user_id, user_email, task_id);

    if (!results.length) return null;

    return {
        taskid: task_id,
        description: results[0]?.task_description || null,
        startdate: results[0]?.startdate || null,
        enddate: results[0]?.enddate || null,
        email: results[0]?.task_email || null,
        assigned_to_email: results[0]?.task_assigned_to_email || null,
        assigned_to_user_id: results[0]?.task_assigned_to_user_id || null,
        task_status: results[0]?.task_status || null,
        assigned_sequence: results[0]?.assigned_sequence || "",
        activities: results.map(activity => ({
            activityid: activity.activityid,
            task_id: activity.taskid,
            email: activity.activity_email,
            description: activity.activity_description || null,
            date: activity.date,
        })),
    };
};

module.exports = {
    addActivity,
    getActivitiesForTask
};
