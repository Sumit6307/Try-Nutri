const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createCalorieLog, getCalorieLogs, deleteCalorieLog } = require('../controllers/calorieController');

// @route   POST /api/calories
router.post('/', authMiddleware, createCalorieLog);

// @route   GET /api/calories
router.get('/', authMiddleware, getCalorieLogs);

// @route   DELETE /api/calories/:id
router.delete('/:id', authMiddleware, deleteCalorieLog);

module.exports = router;