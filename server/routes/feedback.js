const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/feedback", feedbackController.create);
router.get("/feedbacks", feedbackController.getAll);
router.delete("/feedback/:id", feedbackController.remove);

module.exports = router;