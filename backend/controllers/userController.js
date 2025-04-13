const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get user profile
// @route   GET /api/user/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
const updateProfile = async (req, res) => {
  const { name, weight, goal } = req.body;

  try {
    console.log('Received profile update:', { name, weight, goal, userId: req.user.userId });
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name.trim();
    if (weight !== null && weight !== undefined) {
      if (isNaN(weight) || weight <= 0) {
        return res.status(400).json({ message: 'Weight must be a positive number' });
      }
      user.weight = Number(weight);
    }
    if (goal && !['Maintain', 'Lose Weight', 'Gain Muscle'].includes(goal)) {
      return res.status(400).json({ message: 'Invalid goal' });
    }
    user.goal = goal || user.goal;

    await user.save();
    console.log('Profile updated:', {
      id: user._id,
      name: user.name,
      weight: user.weight,
      goal: user.goal,
    });
    res.json({
      message: 'Profile updated',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        weight: user.weight,
        goal: user.goal,
        trialStart: user.trialStart,
      },
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(400).json({ message: err.message || 'Failed to update profile' });
  }
};

// @desc    Change user password
// @route   PUT /api/user/change-password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile, changePassword };