const bcrypt = require("bcryptjs");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { Op } = require("sequelize");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const phoneNumberRegex =

exports.registerNewUser = async (req, res, next) => {
	try {
		const {
			email = null,
			phoneNumber = null,
			password,
			confirmPassword,
			username,
		} = req.body;

		if (
			(!email && !phoneNumber) ||
			!password ||
			!confirmPassword ||
			!username
		) {
			return res
				.status(400)
				.json({ message: "One or more required fields are empty." });
			//check for username duplication
		}
		const existUsername = await User.findOne({ where: { username: username } });
		if (existUsername) {
			return res
				.status(400)
				.json({ message: "This username is already taken" });
		}

		if (email) {
			//check for invalid email
			const isEmail = email.match(emailRegex);
			if (!isEmail) {
				return res.status(400).json({ message: "Invalid Email Format." });
			}

			//check for email duplication
			const existEmail = await User.findOne({
				where: { email: email },
			});
			if (existEmail) {
				return res
					.status(400)
					.json({ message: "this email is already in use" });
			}
		}
		if (phoneNumber) {
			//check for phoneNumber duplication
			const existPhone = await User.findOne({
				where: { phoneNumber: phoneNumber },
			});
			if (existPhone) {
				return res
					.status(400)
					.json({ message: "this Phone number is already in use" });
			}
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "passwords did not match" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			username,
			phoneNumber,
			email,
			password: hashedPassword,
		});
		const payload = {
			id: user.id,
			username: user.username,
			role: user.role,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: 60 * 60 * 24 * 30 * 1000,
		});
		return res
			.status(200)
			.json({ token, user: { username: user.username, role: user.role } });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { usernameOrPhoneNumberOrEmail, password } = req.body;
		console.log(req.body);
		if (!usernameOrPhoneNumberOrEmail || !password) {
			return res.status(400).json({ message: "One or more fields are empty." });
		}

		const user = await User.findOne({
			where: {
				[Op.or]: [
					{ username: usernameOrPhoneNumberOrEmail },
					{ phoneNumber: usernameOrPhoneNumberOrEmail },
					{ email: usernameOrPhoneNumberOrEmail },
				],
			},
		});
		if (user.facebookLogin) {
			return res.status(400).json({ message: "Please login with Facebook" });
		}
		if (!user) {
			return res
				.status(400)
				.json({ message: "invalid email, phone number or password" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "invalid email, phone number or password" });
		}

		const payload = {
			id: user.id,
			username: user.username,
			role: user.role,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: 60 * 60 * 24 * 30 * 1000,
		});
		return res
			.status(200)
			.json({ token, user: { username: user.username, role: user.role } });
	} catch (err) {
		next(err);
	}
};

exports.getMe = async (req, res, next) => {
	try {
		const { username, role } = req.user;
		res.status(200).json({
			user: { username, role },
		});
	} catch (err) {
		next(err);
	}
};

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
