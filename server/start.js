// server/start.js
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');


let app;

// Try to require app.js from a couple of likely locations based on different file layouts.
// Adjust these paths if your project structure differs.
try {
  // If this file lives in a bin/ or scripts/ folder and app.js is in server/
  app = require(path.join(__dirname, '..', 'server', 'app.js'));
} catch (err1) {
  try {
    // If this file lives in the server/ folder next to app.js
    app = require(path.join(__dirname, 'app.js'));
  } catch (err2) {
    console.error('❌ Could not locate server app module. Tried:', err1?.message, err2?.message);
    process.exit(1);
  }
}

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined. Check your .env file.');
  process.exit(1);
}

if (!PORT) {
  console.error('❌ PORT is not defined. Check your .env file.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Fail fast if cannot connect
})
  .then(() => {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server started on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\nReceived ${signal}. Closing server and MongoDB connection...`);
      
      // Stop accepting new requests with promise-based close
      server.close(async () => {
        try {
          await mongoose.connection.close(false);
          console.log("MongoDB connection closed.");
        } catch (err) {
          console.error("Error closing MongoDB:", err);
        } finally {
          process.exit(0);
        }
      });

      // Force exit after 10s
      setTimeout(() => {
        console.warn('Forcing shutdown.');
        process.exit(1);
      }, 10000).unref();
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Export app for testing or other uses
module.exports = app;
