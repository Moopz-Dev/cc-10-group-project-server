const bcrypt = require("bcryptjs");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// exports.register = async (req, res, next) => {
// 	try {
// 		const { email, phoneNumber, password, username } = req.body;

// 		//check for username duplication
// 		const existUsername = await User.findOne({ where: { username: username } });
// 		if (existUsername) {
// 			return res
// 				.status(400)
// 				.json({ message: "This username is already taken" });
// 		}

// 		//check for invalid email
// 		const isEmail = email.match(emailRegex);
// 		if (!isEmail) {
// 			return res.status(400).json({ message: "Invalid Email Format." });
// 		}

// 		//check for email duplication
// 		const existEmail = await User.findOne({
// 			where: { email: email },
// 		});
// 		if (existEmail) {
// 			return res.status(400).json({ message: "this email is already in use" });
// 		}

// 		//check for phoneNumber duplication
// 		const existPhone = await User.findOne({
// 			where: { phoneNumber: phoneNumber },
// 		});
// 		if (existPhone) {
// 			return res
// 				.status(400)
// 				.json({ message: "this Phone number is already in use" });
// 		}

// 		const hashedPassword = await bcrypt.hash(password, 10);
// 		await User.create({
// 			username,
// 			phoneNumber,
// 			email,
// 			password: hashedPassword,
// 		});
// 		return res.status(201).json({ message: "user created" });
// 	} catch (err) {
// 		next(err);
// 	}
// };

// exports.login = async (req, res, next) => {
// 	try {
// 		const { emailOrPhoneNumber, password } = req.body;
// 		const isEmail = emailOrPhoneNumber.match(emailRegex);
// 		let user;
// 		if (isEmail) {
// 			user = await User.findOne({ where: { email: emailOrPhoneNumber } });
// 		} else {
// 			user = await User.findOne({ where: { phoneNumber: emailOrPhoneNumber } });
// 		}
// 		if (!user) {
// 			return res
// 				.status(400)
// 				.json({ message: "invalid email, phone number or password" });
// 		}
// 		const isMatch = await bcrypt.compare(password, user.password);
// 		if (!isMatch) {
// 			return res
// 				.status(400)
// 				.json({ message: "invalid email, phone number or password" });
// 		}

// 		const payload = {
// 			id: user.id,
// 			username: user.username,
// 			role: user.role,
// 		};
// 		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
// 			expiresIn: 60 * 60 * 24 * 30 * 1000,
// 		});
// 		return res
// 			.status(200)
// 			.json({ token, user: { username: user.username, role: user.role } });
// 	} catch (err) {
// 		next(err);
// 	}
// };

// exports.getMe = async (req, res, next) => {
// 	try {
// 		const { username, role, email, phoneNumber } = req.user;
// 		res.status(200).json({
// 			user: { username, role, email, phoneNumber },
// 		});
// 	} catch (err) {
// 		next(err);
// 	}
// };

exports.facebookLogin = async (req, res, next) => {
	try {
		const { name, email, profilePic } = req.body;
		const graphUrl = `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&fb_exchange_token=${req.body.accessToken}`;
		const result = await axios.get(graphUrl);
		let user = await User.findOne({ where: { email } });
		if (!user) {
			user = await User.create({
				name,
				email,
				profileImg: profilePic,
				facebookLogin: true,
			});
		}
		const payload = {
			id: user.id,
			username: user.username,
			role: user.role,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: 60 * 60 * 24 * 30 * 1000,
		});

		// console.log("result ====>", result.data);

		res
			.status(200)
			.json({ token, user: { username: user.username, role: user.role } });
	} catch (error) {
		next(error);
	}
};
