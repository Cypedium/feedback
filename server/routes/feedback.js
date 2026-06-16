// routes/feedback.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Note: The order of routes matters. More specific routes should be defined before less specific ones.
// Define routes for feedback operations -
// Note: When you define app.use("/api/feedback", feedbackRoutes); 
// in your main server file, all routes defined in this router will 
// be prefixed with /api/feedback. So, the GET route defined here will
//  actually be accessible at /api/feedback/ and the 
// POST|GET route at /api/feedback/, and the DELETE route at /api/feedback/:id.
router.get("/", feedbackController.getAll);
router.post("/", feedbackController.create);
router.delete("/:id", feedbackController.remove);

module.exports = router;