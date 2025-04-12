const express = require('express');
const router = express.Router();
const calorieController = require('../controllers/calorieController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, calorieController.addCalorieLog);
router.get('/', authMiddleware, calorieController.getCalorieLogs);
router.delete('/:id', authMiddleware, calorieController.deleteCalorieLog);

module.exports = router;