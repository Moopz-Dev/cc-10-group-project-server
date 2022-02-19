const express = require("express");
const userController = require("../controllers/userController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const router = express.Router();

router.get(
	"/users/search/:searchQuery",
	authenticateUser,
	userController.searchUser
);

module.exports = router;
