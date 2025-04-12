const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight: { type: Number },
  goal: { type: String, enum: ['Maintain', 'Lose Weight', 'Gain Muscle'] },
  trialStart: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);