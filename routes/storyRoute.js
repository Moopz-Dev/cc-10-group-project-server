const express = require("express");
const storyController = require("../controllers/storyController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/stories/all", authenticateUser, storyController.getAllStories);
router.get(
	"/stories/user/:userId",
	authenticateUser,
	storyController.getUserStories
);
router.post(
	"/stories/",
	authenticateUser,
	upload.array("media", 9),
	storyController.createStory
);
router.patch("/stories/:id", authenticateUser, storyController.updateStory);
router.delete("/stories/:id", authenticateUser, storyController.deleteStory);

module.exports = router;
