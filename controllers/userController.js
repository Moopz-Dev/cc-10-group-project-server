const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { User } = require("../models");
const { Op } = require("sequelize");
const util = require("util");
const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.searchUser = async (req, res, next) => {
	try {
		const { searchQuery } = req.params;
		const result = await User.findAll({
			where: { username: { [Op.substring]: searchQuery } },
		});
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

exports.getAllUsers = async (req, res, next) => {
	try {
		const result = await User.findAll({
			attributes: ["name", "bio", "username", "email", "phoneNumber"],
		});
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

exports.getUserProfile = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });

		if (id === user.id) {
			return res.status(200).json({
				username: user.username,
				name: user.name,
				bio: user.bio,
				profileImg: user.profileImg,
				email: user.email,
				phoneNumber: user.PhoneNumber,
			});
		} else {
			const profile = await User.findOne({ where: { id } });

			res.status(200).json({
				username: profile.username,
				name: profile.name,
				bio: profile.bio,
				profileImg: profile.profileImg,
				email: profile.email,
				phoneNumber: profile.PhoneNumber,
			});
		}
	} catch (err) {
		next(err);
	}
};

exports.updateProfile = async (req, res, next) => {
	try {
		const { name, bio, username, email, phoneNumber, publicStatus } = req.body;
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		const profile = await User.findOne({ where: { id } });
		if (!profile) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		if (profile.id !== user.id) {
			return res.status(403).json({ message: "Unauthorized request" });
		}
		await profile.update({ name, bio, username, email, phoneNumber });

		const resultNewProfile = await User.findOne({
			where: { id: user.id },
			attributes: [
				"name",
				"bio",
				"username",
				"email",
				"phoneNumber",
				"publicStatus",
			],
		});
		res.status(200).json(resultNewProfile);
	} catch (err) {
		next(err);
	}
};

exports.updateProfileImg = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		if (!req.file) {
			await user.update({ profileImg: null });
			return res.status(200).json({ message: "profilePic removed" });
		}
		console.log(req.file);

		result = await uploadPromise(
			req.file.path,
			(options = { resource_type: "auto" })
		);
		console.log(result);
		// const type = result.resource_type === "image" ? "img" : "video";
		await user.update({
			profileImg: result.secure_url,
		});
		fs.unlinkSync(req.file.path);

		res.status(201).json({ user });
	} catch (error) {
		next(error);
	}
};
