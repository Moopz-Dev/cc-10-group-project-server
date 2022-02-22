const express = require("express");
const likeController = require("../controllers/likeController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const router = express.Router();

router.post("/like/story/:id", authenticateUser, likeController.likeStory);
router.post(
	"like/story-comment/:id",
	authenticateUser,
	likeController.likeStoryComment
);
router.post("/like/reel/:id", authenticateUser, likeController.likeReel);
router.post(
	"like/reel-comment/:id",
	authenticateUser,
	likeController.likeReelComment
);
router.post("/like/post/:id", authenticateUser, likeController.likePost);
router.post(
	"like/post-comment/:id",
	authenticateUser,
	likeController.likePostComment
);

module.exports = router;
