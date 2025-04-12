const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { name, email, trialStart: user.trialStart } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { name: user.name, email, trialStart: user.trialStart } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'NutriAI Password Reset',
      html: `Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.`,
    });

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };