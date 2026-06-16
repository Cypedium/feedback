// server/controllers/feedbackController.js
const Feedback = require("../models/Feedback");

exports.getAll = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Fetch feedbacks error:", error);
    res.status(500).json({ message: "Could not retrieve feedbacks." });
  }
};

exports.create = async (req, res) => {
  const { rating, comment, productId, username, submittedAt } = req.body;
  try {
    const newFeedback = new Feedback({ rating, comment, productId, username, submittedAt });
    await newFeedback.save();
    res.status(200).json({ message: "Feedback saved successfully!" });
  } catch (error) {
    console.error("Save feedback error:", error);
    res.status(500).json({ message: "Failed to save feedback." });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    console.error("Delete feedback error:", error);
    res.status(500).json({ message: "Could not delete feedback." });
  }
};
