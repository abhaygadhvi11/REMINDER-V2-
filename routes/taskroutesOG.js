/*const express = require('express');
const db = require('../dbConfig');
const authenticateToken = require('../middlewares/authMiddleware'); 

const router = express.Router();

// GET: Fetch all tasks
router.get('/tasks', authenticateToken, (req, res) => {  
    const { f } = req.query;                                  
    let sql = 'SELECT * FROM tasks ORDER BY enddate ASC';

    if (f == 1) { 
        sql = `SELECT * FROM tasks WHERE enddate >= CURDATE() AND enddate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY) ORDER BY enddate ASC`;
    } else if (f == 2) {
        sql = `SELECT * FROM tasks WHERE enddate >= CURDATE() AND enddate <= DATE_ADD(CURDATE(), INTERVAL 31 DAY) ORDER BY enddate ASC`;
    } 

    db.query(sql, (err, results) => {        
        if (err) {        
            return res.status(500).json({ error: err.message });
        }
        res.json(results);      
    });
});

// POST: Add a new task   
router.post('/tasks', authenticateToken, (req, res) => {
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

    const sql = `
        INSERT INTO tasks 
        (description, email, startdate, enddate, reminder, reminder_date, user_id, assigned_sequence, assigned_to_user_id, current_index, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [description, user_email, startdate, enddate, reminderValue, reminderDate, user_id, assignedSequence, initialAssignedUser, 0, 'pending'], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Task added successfully',
            id: result.insertId,
            assigned_to: initialAssignedUser,
            reminder: reminderValue,
            reminder_date: reminderDate
        });
    });
});

// POST: Mark a task as done
router.post('/tasks/:taskId/done', authenticateToken, (req, res) => {
    const taskId = Number(req.params.taskId);
    const userId = req.user.id;

    if (isNaN(taskId)) {    
        return res.status(400).json({ error: 'Invalid Task ID' });   
    }
    
    db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
        if (err) {
            console.error('Error fetching task:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        } 

        let task = results[0];

        
        let assignedSequence = task.assigned_sequence.split(',').map(Number);
        
        if (!Array.isArray(assignedSequence) || assignedSequence.length === 0) {
            console.error('Invalid assigned_sequence format:', task.assigned_sequence);
            return res.status(500).json({ error: 'Invalid assigned_sequence format' });
        }

        let currentIndex = Number(task.current_index) || 0;
        let completedBy = JSON.parse(task.completed_by || '[]');

        if (completedBy.includes(userId)) {
            return res.status(400).json({ error: 'You have already marked this task as done' });
        }

        completedBy.push(userId);
        const updatedCompletedBy = JSON.stringify(completedBy);

        
        let newStatus = task.status;

        
        if (currentIndex === 0 && task.status === 'pending') {
            newStatus = 'in progress';
        }

        
        if (currentIndex === assignedSequence.length - 1) {
            newStatus = 'done';
        }

        if (newStatus === 'done') {
          
            db.query(
                'UPDATE tasks SET status = ?, completed_by = ? WHERE id = ?',
                [newStatus, updatedCompletedBy, taskId],
                (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating task status:', updateErr);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    res.json({ message: 'Task completed', status: 'done' });
                }
            );
        } else {
            
            let nextUserId = assignedSequence[currentIndex + 1];

            db.query(
                'UPDATE tasks SET assigned_to_user_id = ?, current_index = ?, completed_by = ?, status = ? WHERE id = ?',
                [nextUserId, currentIndex + 1, updatedCompletedBy, newStatus, taskId],
                (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating task:', updateErr);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    res.json({ message: `Task reassigned to User ${nextUserId}`, status: newStatus });
                }
            );
        }
    });
});

//GET: Fetch tasks for a specific user
router.get('/tasks/user', authenticateToken, (req, res) => {
    const user_id = req.user.id;  
    const user_email = req.user.email;         
    const { f } = req.query;           

    let sql = `
        SELECT * FROM tasks 
        WHERE user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ? 
        ORDER BY enddate ASC
    `;

    if (f == 1) { 
        sql = `
            SELECT * FROM tasks 
            WHERE (user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY) 
            ORDER BY enddate ASC
        `;
    } else if (f == 2) {
        sql = `
            SELECT * FROM tasks 
            WHERE (user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 31 DAY) 
            ORDER BY enddate ASC
        `;
    }

    db.query(sql, [user_id, user_id, user_email], (err, results) => {    
        if (err) {  
            return res.status(500).json({ error: err.message });
        }                  
        if (results.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }
        res.json(results);  
    });
});

// GET: Fetch tasks created by the user
router.get('/tasks/created', authenticateToken, (req, res) => {
    const user_id = req.user.id;
    const { f } = req.query; 

    let sql = `
        SELECT * FROM tasks 
        WHERE user_id = ? 
        ORDER BY enddate ASC
    `;

    if (f == 1) { 
        sql = `
            SELECT * FROM tasks 
            WHERE user_id = ? 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY) 
            ORDER BY enddate ASC
        `;
    } else if (f == 2) {
        sql = `
            SELECT * FROM tasks 
            WHERE user_id = ? 
            AND enddate >= CURDATE() 
            AND enddate <= DATE_ADD(CURDATE(), INTERVAL 31 DAY) 
            ORDER BY enddate ASC
        `;
    }

    db.query(sql, [user_id], (err, results) => {    
        if (err) {  
            return res.status(500).json({ error: err.message });
        }                  
        if (results.length === 0) {
            return res.status(404).json({ error: 'No tasks created by this user' });
        }
        res.json(results);  
    });
});

// GET: Fetch tasks assigned to the user
router.get('/tasks/assigned', authenticateToken, (req, res) => {
    const user_id = req.user.id;
    const user_email = req.user.email;
    const { f } = req.query;

    let sql = `
        SELECT * FROM tasks 
        WHERE assigned_to_user_id = ? OR assigned_to_email = ? 
        ORDER BY enddate ASC
    `;

    if (f == 1) {
        sql = `
            SELECT * FROM tasks 
            WHERE (assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
            ORDER BY enddate ASC
        `;
    } else if (f == 2) {
        sql = `
            SELECT * FROM tasks 
            WHERE (assigned_to_user_id = ? OR assigned_to_email = ?) 
            AND enddate BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 31 DAY)
            ORDER BY enddate ASC
        `;
    }

    db.query(sql, [user_id, user_email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No tasks assigned to this user' });
        }
        res.json(results);
    });
});

    // POST: Assign task to a user using email
    router.post('/tasks/:taskId/assign', authenticateToken, (req, res) => {
        const { assigned_to_email } = req.body;
        const taskId = req.params.taskId;

        if (!assigned_to_email) {
            return res.status(400).json({ error: 'Assigned_to_email is required' });
        }

        const taskQuery = 'SELECT * FROM tasks WHERE id = ?';
        db.query(taskQuery, [taskId], (err, taskResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (taskResults.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            const userQuery = 'SELECT id FROM users WHERE email = ?';
            db.query(userQuery, [assigned_to_email], (err, userResults) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                if (userResults.length === 0) {
                    return res.status(404).json({ error: 'Assigned user not found' });
                }

                const assigned_to_user_id = userResults[0].id;
                const updateQuery = 'UPDATE tasks SET assigned_to_user_id = ?, assigned_to_email = ? WHERE id = ?';
                db.query(updateQuery, [assigned_to_user_id, assigned_to_email, taskId], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json({ 
                        message: 'Task assigned successfully', 
                        assigned_to_user_id, 
                        assigned_to_email 
                    });
                });
            });
        });
    });

module.exports = router;
*/