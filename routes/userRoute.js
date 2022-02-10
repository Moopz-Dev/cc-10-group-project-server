const express = require("express");
const authController = require("../controllers/authController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const router = express.Router();

//register & login

router.post("/facebooklogin", authController.facebookLogin);

module.exports = router;
