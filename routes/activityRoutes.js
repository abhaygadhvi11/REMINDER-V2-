const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const activityController = require('../controllers/activityController');

//const { getActivitiesForTask } = require('../controllers/activityController');  

router.post('/activities', authenticateToken, activityController.addActivity);
router.get("/tasks/:task_id/activities", authenticateToken, activityController.getActivitiesForTask);

module.exports = router;
