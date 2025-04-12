const mongoose = require('mongoose');

const calorieLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  mealType: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CalorieLog', calorieLogSchema);