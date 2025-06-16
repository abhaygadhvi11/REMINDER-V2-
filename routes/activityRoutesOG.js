/*const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const db = require('../dbConfig');

// GET: Fetch all activities for a specific task, including assigned tasks
router.get("/tasks/:task_id/activities", authenticateToken, (req, res) => {
    const user_id = req.user.id;
    const task_id = req.params.task_id;
    const user_email = req.user.email;

    const sql = `
        SELECT 
            t.id AS taskid, 
            t.description AS task_description,                                                          
            t.startdate,                                                                                          
            t.enddate,
            t.email AS task_email,
            t.assigned_to_email AS task_assigned_to_email,
            t.assigned_to_user_id AS task_assigned_to_user_id,
            t.assigned_sequence, -- Stored as TEXT
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

    db.query(sql, [user_id, user_id, user_id, task_id], (err, results) => {
        if (err) {
            console.error("Error fetching activities:", err);
            return res.status(500).json({ error: "Server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "No activities found for this task or user" });
        }

        const taskData = {
            taskid: task_id,
            description: results[0]?.task_description || null,
            startdate: results[0]?.startdate || null,
            enddate: results[0]?.enddate || null,
            email: results[0]?.task_email || null,
            assigned_to_email: results[0]?.task_assigned_to_email || null,
            assigned_to_user_id: results[0]?.task_assigned_to_user_id || null,
            task_status: results[0]?.task_status || null,
            assigned_sequence: results[0]?.assigned_sequence || "", 
            activities: results.map((activity) => ({
                activityid: activity.activityid,
                task_id: activity.taskid,
                email: activity.activity_email,
                description: activity.activity_description || null,
                date: activity.date,
            })),
        };

        res.json(taskData);
    });
});

// POST: Add a new activity
router.post("/activities", authenticateToken, (req, res) => {
    const { task_id, description, date } = req.body; 
    const user_id = req.user.id;
    const email = req.user.email;
    const activityDate = date ? new Date(date) : new Date();
  
    if (!task_id || !description) {
      return res.status(400).json({ error: "Task ID and Description are required" });
    }
  
    const checkTaskQuery = `SELECT * FROM tasks  
            WHERE id = ? AND (user_id = ? OR assigned_to_user_id = ? OR assigned_to_email = ?)`;
  
    db.query(checkTaskQuery, [task_id, user_id, user_id, email], (err, taskResults) => {
        if (err) {
          console.error("Error checking task:", err);
          return res.status(500).json({ error: "Server error" });
        }
  
        if (taskResults.length === 0) {
          return res.status(403).json({
            error: "Task not found or you are not authorized to add an activity",
          });
        }
  
        const insertActivityQuery =
          "INSERT INTO activity (tasks_id, date, email, description) VALUES (?, ?, ?, ?)";
        db.query(insertActivityQuery, [task_id, activityDate, email, description], (err, result) => {
            if (err) {
              console.error("Error inserting activity:", err);
              return res.status(500).json({ error: err.message });
            }
            res.json({
              message: "Activity added successfully",
              insertedId: result.insertId,
            });
        });
    });
})

// Export the router
module.exports = router;*/
