const express = require("express");
const storyController = require("../controllers/storyController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const router = express.Router();

router.get("/stories/all", authenticateUser, storyController.getAllStories);
router.get(
	"/stories/user/:userId",
	authenticateUser,
	storyController.getUserStories
);
router.post("/stories/", authenticateUser, storyController.createStory);
router.patch("/stories/:id", authenticateUser, storyController.updateStory);
router.delete("/stories/:id", authenticateUser, storyController.deleteStory);

module.exports = router;
