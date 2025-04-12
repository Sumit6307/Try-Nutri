const CalorieLog = require('../models/CalorieLog');

// @desc    Create a calorie log
// @route   POST /api/calories
const createCalorieLog = async (req, res) => {
  const { food, calories, protein, carbs, fat, mealType } = req.body;

  try {
    const log = new CalorieLog({
      user: req.user.userId,
      food,
      calories,
      protein,
      carbs,
      fat,
      mealType,
    });

    await log.save();
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all calorie logs
// @route   GET /api/calories
const getCalorieLogs = async (req, res) => {
  try {
    const logs = await CalorieLog.find({ user: req.user.userId }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a calorie log
// @route   DELETE /api/calories/:id
const deleteCalorieLog = async (req, res) => {
  try {
    const log = await CalorieLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }

    if (log.user.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await log.deleteOne();
    res.json({ message: 'Log deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createCalorieLog, getCalorieLogs, deleteCalorieLog };