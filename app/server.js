// server.js
const app = require('../app/app');
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/feedbackApp';

// 🔗 Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(4000, () => console.log('✅ Backend running on port 4000'));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));