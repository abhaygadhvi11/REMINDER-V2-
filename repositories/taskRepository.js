const db = require('../dbConfig');

const getAllTasks = (filter) => {
    let sql = 'SELECT * FROM tasks ORDER BY enddate ASC';

    if (filter === 1) {
        sql = `SELECT * FROM tasks WHERE enddate >= CURDATE() AND enddate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY) ORDER BY enddate ASC`;
    } else if (filter === 2) {
        sql = `SELECT * FROM tasks WHERE enddate >= CURDATE() AND enddate <= DATE_ADD(CURDATE(), INTERVAL 31 DAY) ORDER BY enddate ASC`;
    }

    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};

const createTask = (taskData) => {
    const { description, email, startdate, enddate, reminder, reminderDate, user_id, assignedSequence, initialAssignedUser } = taskData;

    const sql = `
        INSERT INTO tasks 
        (description, email, startdate, enddate, reminder, reminder_date, user_id, assigned_sequence, assigned_to_user_id, current_index, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, [description, email, startdate, enddate, reminder, reminderDate, user_id, assignedSequence, initialAssignedUser, 0, 'pending'], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

const getTasksCreatedByUser = (user_id, filter) => {
    let sql = `
        SELECT * FROM tasks 
        WHERE user_id = ? 
        ORDER BY enddate ASC
    `;

    if (filter == 1) {
        sql = `
            SELECT * FROM tasks 
            WHERE user_id = ? 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY) 
            ORDER BY enddate ASC
        `;
    } else if (filter == 2) {
        sql = `
            SELECT * FROM tasks 
            WHERE user_id = ? 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 31 DAY) 
            ORDER BY enddate ASC
        `;
    }

    return new Promise((resolve, reject) => {
        db.query(sql, [user_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getTasksAssignedToUser = (user_id, user_email, filter) => {
    let sql = `
        SELECT * FROM tasks 
        WHERE assigned_to_user_id = ? OR assigned_to_email = ? 
        ORDER BY enddate ASC
    `;

    if (filter == 1) {
        sql = `
            SELECT * FROM tasks 
            WHERE (assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
            ORDER BY enddate ASC
        `;
    } else if (filter == 2) {
        sql = `
            SELECT * FROM tasks 
            WHERE (assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 31 DAY)
            ORDER BY enddate ASC
        `;
    }

    return new Promise((resolve, reject) => {
        db.query(sql, [user_id, user_email], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getTasksForUser = (user_id, user_email, filter) => {
    let sql = `
        SELECT * FROM tasks 
        WHERE user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ? 
        ORDER BY enddate ASC
    `;

    if (filter == 1) {
        sql = `
            SELECT * FROM tasks 
            WHERE (user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY) 
            ORDER BY enddate ASC
        `;
    } else if (filter == 2) {
        sql = `
            SELECT * FROM tasks 
            WHERE (user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 31 DAY) 
            ORDER BY enddate ASC
        `;
    }

    return new Promise((resolve, reject) => {
        db.query(sql, [user_id, user_id, user_email], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const getTaskById = (taskId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        db.query(sql, [taskId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM users WHERE email = ?';
        db.query(sql, [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const updateTaskAssignment = (taskId, userId, email) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tasks SET assigned_to_user_id = ?, assigned_to_email = ? WHERE id = ?';
        db.query(sql, [userId, email, taskId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


module.exports = {
    getAllTasks,
    createTask,
    getTasksCreatedByUser,
    getTasksAssignedToUser,
    getTasksForUser,
    getTaskById,
    getUserByEmail,
    updateTaskAssignment,

};
