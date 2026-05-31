const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Feedback = require('./models/Feedback');
const User = require('./models/User');
const app = express();
const  dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// 🧩 Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// 📝 Register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// 🔐 Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // ✅ Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in.' });
  }
});

// 🚪 Logout user
app.post('/logout', (req, res) => {
  // No server-side token invalidation unless you implement a blacklist
  res.status(200).json({ message: 'Logged out successfully. Please discard your token.' });
});

// 💬 Submit feedback
app.post('/feedback', async (req, res) => {
  const { rating, comment, productId, username } = req.body;
  try {
    const newFeedback = new Feedback({ rating, comment, productId, username });
    console.log('Saving feedback:', newFeedback);
    await newFeedback.save();
    res.status(200).json({ message: 'Feedback saved successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to save feedback.' });
  }
});

// 📊 Get all feedback
app.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Could not retrieve feedbacks.' });
  }
});

// 🧑‍🤝‍🧑 Get all users (for profile pictures)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username pictureUrl'); // Only return username and pictureUrl
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Could not retrieve users.' });
  }
});

// ❌ Delete feedback
app.delete('/feedback/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: 'Feedback deleted successfully.' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Could not delete feedback.' });
  }
});

module.exports = app;