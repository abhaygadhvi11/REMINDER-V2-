const db = require('../dbConfig');

//
const checkTaskOwnership = (task_id, user_id, email) => {
    const query = `
        SELECT * FROM tasks  
        WHERE id = ? AND (user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [task_id, user_id, user_id, email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0] || null);
        });
    });
};

//TO ADD A NEW ACTIVITY
const insertActivity = (task_id, activityDate, email, description) => {
    const query = `
        INSERT INTO activity (tasks_id, date, email, description)
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [task_id, activityDate, email, description], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

//TO GET AN ACTIVITY FOR A TASK 
const getActivitiesForTask = (user_id, user_email, task_id) => {
    const sql = `
        SELECT 
            t.id AS taskid, 
            t.description AS task_description,                                                          
            t.startdate,                                                                                          
            t.enddate,
            t.email AS task_email,
            t.assigned_to_email AS task_assigned_to_email,
            t.assigned_to_user_id AS task_assigned_to_user_id,
            t.assigned_sequence,
            t.status AS task_status,
            a.id AS activityid,
            a.date,      
            a.email AS activity_email,    
            a.description AS activity_description    
        FROM activity a
        JOIN tasks t ON a.tasks_id = t.id
        WHERE (
            t.user_id = ? 
            OR t.assigned_to_user_id = ?  
            OR FIND_IN_SET(?, t.assigned_sequence) > 0 
        ) 
        AND t.id = ?
        ORDER BY a.date
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, [user_id, user_id, user_id, task_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    checkTaskOwnership,
    insertActivity,
    getActivitiesForTask
};