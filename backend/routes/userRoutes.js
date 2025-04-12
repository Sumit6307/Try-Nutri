const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updateProfile, changePassword } = require('../controllers/userController');

// @route   GET /api/user/profile
router.get('/profile', authMiddleware, getProfile);

// @route   PUT /api/user/profile
router.put('/profile', authMiddleware, updateProfile);

// @route   PUT /api/user/change-password
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;