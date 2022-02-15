const express = require("express");
const followController = require("../controllers/followController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const router = express.Router();

//follow & unfollow a target

router.post("/follow/:id", authenticateUser, followController.followUser);
router.delete("/follow/:id", authenticateUser, followController.unFollowUser);

//get follower count
router.get("/follow/follower/:id", followController.getFollowersCount);

// get following count
router.get("/follow/following/:id", followController.getFollowingCount);

module.exports = router;
