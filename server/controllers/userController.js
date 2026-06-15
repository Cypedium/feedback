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

exports.Usernames = async (req, res) => {
  try {
    const users = await User.find({}, "username");
    const usernames = users.map(user => user.username);
    res.status(200).json(usernames);
  } catch (error) {
    console.error("Fetch usernames error:", error);
    res.status(500).json({ message: "Could not retrieve usernames." });
  }
};

exports.create = async (req, res) => {
  const { username, pictureUrl } = req.body;
  try {
    const newUser = new User({ username, pictureUrl });
    await newUser.save();
    res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Failed to create user." });
  }
};