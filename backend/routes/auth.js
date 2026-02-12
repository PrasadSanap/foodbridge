const express = require('express');
const bcrypt = require('bcryptjs');   // switched from bcrypt to bcryptjs
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;
    const hashed = await bcrypt.hash(password, 10);   // hashing with bcryptjs
    const user = new User({ name, email, password: hashed, role, location });
    await user.save();
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }   // optional: token expiry
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

module.exports = router;