const express = require("express");
const authController = require("../controllers/authController");
const {
	authenticateUser,
	authenticateAdminOrUser,
} = require("../middlewares/authenticate");
const router = express.Router();

//register & login

router.post("/auth/facebooklogin", authController.facebookLogin);
router.post("/auth/register", authController.registerNewUser);

module.exports = router;
