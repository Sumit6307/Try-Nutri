const CalorieLog = require('../models/CalorieLog');

exports.addCalorieLog = async (req, res) => {
  const { food, calories, protein, carbs, fat, mealType } = req.body;
  try {
    const log = new CalorieLog({
      userId: req.user.id,
      food,
      calories,
      protein,
      carbs,
      fat,
      mealType,
    });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCalorieLogs = async (req, res) => {
  try {
    const logs = await CalorieLog.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCalorieLog = async (req, res) => {
  try {
    const log = await CalorieLog.findById(req.params.id);
    if (!log || log.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Log not found' });
    }
    await log.remove();
    res.json({ message: 'Log deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};