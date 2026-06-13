const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  pictureUrl: { type: String, default: 'https://example.com/default-profile.png' }, // Default profile picture
});

module.exports = mongoose.model('User', userSchema);