const express = require("express");
const postController = require("../controllers/postController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/posts/all", authenticateUser, postController.getAllPosts);
router.get(
	"/posts/user/:userId",
	authenticateUser,
	postController.getUserPosts
);
router.post(
	"/posts/",
	authenticateUser,
	upload.array("media", 9),
	postController.createPost
);
router.patch("/posts/:id", authenticateUser, postController.updatePost);
router.delete("/posts/:id", authenticateUser, postController.deletePost);

module.exports = router;
