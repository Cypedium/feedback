// server/controllers/userController.js
const User = require("../models/User");

exports.getAll = async (req, res) => {
  try {
    const users = await User.find({}, "username pictureUrl");
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Could not retrieve users." });
  }
};
