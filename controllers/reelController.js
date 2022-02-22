const {
	User,
	Reel,
	ReelLike,
	ReelComment,
	ReelCommentLike,
	Follow,
	sequelize,
} = require("../models");
const { Op } = require("sequelize");
const util = require("util");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const uploadPromise = util.promisify(cloudinary.uploader.upload);

exports.getAllReels = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		const publicUsers = await User.findAll({
			where: { publicStatus: "PUBLIC" },
			raw: true,
		});
		let targets = publicUsers;
		if (user) {
			const followers = await Follow.findAll({
				where: { followTarget: req.user.id },
				raw: true,
				attributes: ["followerId"],
			});

			let friends = await Follow.findAll({
				where: {
					followTargetId: followers.map(item => item.followerId),
					followerId: req.user.id,
				},
				raw: true,
			});

			friends = await User.findAll({
				where: { id: friends.map(item => item.followTargetId) },
				raw: true,
			});
			targets = [...publicUsers, ...friends];
		}

		const reels = await Reel.findAll({
			where: {
				userId: targets.map(item => item.id),
			},
			include: [
				{
					model: ReelLike,
				},
				{
					model: ReelComment,
					include: { model: ReelCommentLike },
				},
				{
					model: User,
					attributes: ["id", "username", "profileImg"],
				},
			],
		});
		res.status(200).json(reels);
	} catch (error) {
		next(error);
	}
};

exports.getUserReels = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		const { userId } = req.params;

		const publicUsers = await User.findAll({
			where: { publicStatus: "PUBLIC" },
			raw: true,
		});
		let targets = publicUsers;
		if (user) {
			const followers = await Follow.findAll({
				where: { followTarget: req.user.id },
				raw: true,
				attributes: ["followerId"],
			});

			let friends = await Follow.findAll({
				where: {
					followTargetId: followers.map(item => item.followerId),
					followerId: req.user.id,
				},
				raw: true,
			});

			friends = await User.findAll({
				where: { id: friends.map(item => item.followTargetId) },
				raw: true,
			});
			targets = [...publicUsers, ...friends];
		}

		const canView = targets.filter(item => item.id == userId);

		if (canView.length === 0) {
			return res.status(400).json({
				message: "Only friends can view your target, or they do not exist",
			});
		}
		const target = await Reel.findAll({ where: { id: userId } });
		res.status(200).json(target);
	} catch (error) {
		next(error);
	}
};

exports.createReel = async (req, res, next) => {
	const transaction = await sequelize.transaction();
	// console.log(req.body);
	// console.log(req.body.message);
	// console.log(req.files);
	try {
		if (!req.body.message) {
			return res.status(400).json({ message: "Message cannot be empty." });
		}
		if (req.files.length === 0) {
			return res
				.status(400)
				.json({ message: "At least one media is required." });
		}
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		result = await uploadPromise(
			req.files[0].path,
			(options = { resource_type: "auto" })
		);
		console.log("aaaaaaaaaaaaaa");
		const type = result.resource_type === "image" ? "img" : "video";
		const reel = await Reel.create(
			{
				message: req.body.message,
				media: result.secure_url,
				userId: user.id,
				type,
			},
			{ transaction }
		);
		fs.unlinkSync(req.files[0].path);

		await transaction.commit();

		const returnReel = await Reel.findOne({
			where: { id: reel.id },
			attributes: { exclude: ["createdAt", "updatedAt"] },
			include: [
				{
					model: User,
					attributes: ["username", "profileImg", "publicStatus"],
				},
			],
		});
		res.status(201).json({ story: returnReel });
	} catch (error) {
		// await transaction.rollback();
		next(error);
	}
};

exports.updateReel = async (req, res, next) => {
	try {
		const { message, media } = req.body;
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		const reel = await Reel.findOne({ where: { id } });
		if (!reel) {
			return res.status(400).json({ message: "this reel does not exist." });
		}
		if (reel.userId !== user.id) {
			return res.status(403).json({ message: "Unauthorized request" });
		}
		await Reel.update({ message, media });
		res.status(200).json(reel);
	} catch (error) {
		next(error);
	}
};

exports.deleteReel = async (req, res, next) => {
	try {
		const transaction = await sequelize.transaction();
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		const reel = await Reel.findOne({ where: { id } });
		if (!reel) {
			return res.status(400).json({ message: "this reel does not exist." });
		}
		if (reel.userId !== user.id) {
			return res.status(403).json({ message: "Unauthorized request" });
		}

		await ReelLike.destroy({ where: { reelId: id } }, { transaction });
		await ReelCommentLike.destroy(
			{ where: { reelCommentId: { where: { reelId: id } } } },
			{ transaction }
		);
		await ReelComment.destroy({ where: { reelId: id } }, { transaction });
		await reel.destroy({ transaction });
		await transaction.commit();
		res.status(204).json();
	} catch (error) {
		await transaction.rollback();
		next(error);
	}
};
