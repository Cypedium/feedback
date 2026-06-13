// server.js
const app = require('../app/app.js');
const mongoose = require('mongoose');
require('dotenv').config();
//  Old local db 'mongodb://localhost:27017/aurellfeedback'
const MONGO_URI = process.env.MONGO_URI;

// 🔗 Connect to MongoDB
const PORT = process.env.PORT || 4000;
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server started on port", PORT);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
  