// server.js
const app = require('../app/app');
const mongoose = require('mongoose');
require('dotenv').config();
//  Old local db 'mongodb://localhost:27017/aurellfeedback'
const MONGO_URI = process.env.MONGO_URI;

// 🔗 Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(4000, "0.0.0.0", () => 
      console.log('✅ Backend running on port 4000'));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));