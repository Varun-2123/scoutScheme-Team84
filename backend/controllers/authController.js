const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token: generateToken(user._id),
      user: { id: user._id, name, email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      success: true,
      message: 'Login successful',
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

// Update profile
exports.updateProfile = async (req, res) => {
  const fields = ['age', 'gender', 'state', 'occupation', 'annualIncome', 'category'];
  const updates = {};
  fields.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
  updates.profileDone = true;

  const user = await User.findByIdAndUpdate(
  req.user.id,
  updates,
  {
    returnDocument: 'after',
    runValidators: true
  }
).select('-password');
  res.json(user);
};