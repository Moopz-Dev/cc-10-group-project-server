const express = require("express");
const userController = require("../controllers/userController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get(
	"/users/search/:searchQuery",
	authenticateUser,
	userController.searchUser
);

router.get("/users/:id", authenticateUser, userController.getUserProfile);
router.patch("/users/:id", authenticateUser, userController.updateProfile);
router.patch(
	"/users/:id/profileImg",
	authenticateUser,
	userController.updateProfileImg
);

module.exports = router;
