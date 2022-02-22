const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { User } = require("../models");
const { Op } = require("sequelize");

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
		const { name, bio, username, email, phoneNumber } = req.body;
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
			attributes: ["name", "bio", "username", "email", "phoneNumber"],
		});
		res.status(200).json(resultNewProfile);
	} catch (err) {
		next(err);
	}
};

exports.updateProfileImg = (req, res, next) => {
	cloudinary.uploader.upload(req.file.path, async (err, result) => {
		if (err) return next(err);

		await User.update(
			{ profileImg: result.secure_url },
			{ where: { id: req.user.id } }
		);

		if (req.user.profileImg) {
			const splited = req.user.profileImg.split("/");
			cloudinary.uploader.destroy(splited[splited.length - 1].split(".")[0]);
		}

		fs.unlinkSync(req.file.path);
		res.json({
			message: "upload profile image completed",
			profileImg: result.secure_url,
		});
	});
};
