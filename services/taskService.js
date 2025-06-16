const db = require('../dbConfig');

const taskRepository = require('../repositories/taskRepository');

const getAllTasks = async (filter) => {
    try {
        const tasks = await taskRepository.getAllTasks(filter);
        return tasks;
    } catch (err) {
        throw new Error('Error fetching tasks: ' + err.message);
    }
};

const createTask = async (taskData) => {
    try {
        const result = await taskRepository.createTask(taskData);
        return result;
    } catch (err) {
        throw new Error('Error creating task: ' + err.message);
    }
};

const markTaskAsDone = (taskId, userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject(new Error('Task not found'));

            const task = results[0];
            const assignedSequence = task.assigned_sequence.split(',').map(Number);
            const currentIndex = Number(task.current_index) || 0;
            const completedBy = JSON.parse(task.completed_by || '[]');

            if (completedBy.includes(userId)) {
                return reject(new Error('You have already marked this task as done'));
            }

            completedBy.push(userId);
            const updatedCompletedBy = JSON.stringify(completedBy);
            let newStatus = task.status;

            if (currentIndex === 0 && task.status === 'pending') {
                newStatus = 'in progress';
            }

            if (currentIndex === assignedSequence.length - 1) {
                newStatus = 'done';
                db.query(
                    'UPDATE tasks SET status = ?, completed_by = ? WHERE id = ?',
                    [newStatus, updatedCompletedBy, taskId],
                    (updateErr) => {
                        if (updateErr) return reject(updateErr);
                        resolve({ message: 'Task completed', status: 'done' });
                    }
                );
            } else {
                const nextUserId = assignedSequence[currentIndex + 1];
                db.query(
                    'UPDATE tasks SET assigned_to_user_id = ?, current_index = ?, completed_by = ?, status = ? WHERE id = ?',
                    [nextUserId, currentIndex + 1, updatedCompletedBy, newStatus, taskId],
                    (updateErr) => {
                        if (updateErr) return reject(updateErr);
                        resolve({
                            message: `Task reassigned to User ${nextUserId}`,
                            status: newStatus
                        });
                    }
                );
            }
        });
    });
};


// Tasks Created By User
const getTasksCreatedByUser = async (user_id, filter) => {
    return await taskRepository.getTasksCreatedByUser(user_id, filter);
};

// Tasks Assigned to User
const getTasksAssignedToUser = async (user_id, user_email, filter) => {
    return await taskRepository.getTasksAssignedToUser(user_id, user_email, filter);
};

const getTasksForUser = async (user_id, user_email, filter) => {
    return await taskRepository.getTasksForUser(user_id, user_email, filter);
};

const assignTaskToUser = async (taskId, assigned_to_email) => {
    if (!assigned_to_email) {
        throw { status: 400, message: 'Assigned_to_email is required' };
    }

    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
        throw { status: 404, message: 'Task not found' };
    }

    const user = await taskRepository.getUserByEmail(assigned_to_email);
    if (!user) {
        throw { status: 404, message: 'Assigned user not found' };
    }

    const assigned_to_user_id = user.id;
    await taskRepository.updateTaskAssignment(taskId, assigned_to_user_id, assigned_to_email);

    return {
        message: 'Task assigned successfully',
        assigned_to_user_id,
        assigned_to_email,
    };
};


module.exports = {
    getAllTasks,
    createTask,
    markTaskAsDone,
    getTasksCreatedByUser,
    getTasksAssignedToUser,
    getTasksForUser,
    assignTaskToUser
};
