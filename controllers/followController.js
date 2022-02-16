const { User, Follow } = require("../models");
const { Op } = require("sequelize");

exports.followUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "current user does not exist" });
		}
		const target = await User.findOne({ where: { id } });
		if (!target) {
			return res.status(400).json({ message: "the target does not exist" });
		}
		const alreadyFollow = await Follow.findOne({
			where: { followTargetId: target.id, followerId: user.id },
		});
		if (alreadyFollow) {
			return res
				.status(400)
				.json({ message: "Bad request, you already follow this user" });
		}
		const result = await Follow.create({
			followTargetId: target.id,
			followerId: user.id,
		});
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

exports.unFollowUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "current user does not exist" });
		}
		const target = await User.findOne({ where: { id } });
		if (!target) {
			return res.status(400).json({ message: "the target does not exist" });
		}
		const alreadyFollow = await Follow.findOne({
			where: { followTargetId: target.id, followerId: user.id },
		});
		if (!alreadyFollow) {
			return res
				.status(400)
				.json({ message: "Bad request, you are not this user's follower" });
		}
		await alreadyFollow.destroy();
		res.status(204).json();
	} catch (error) {
		next(error);
	}
};

exports.getFollowersCount = async (req, res, next) => {
	try {
		const { id } = req.params;
		const target = await User.findOne({ where: { id } });
		if (!target) {
			return res.status(400).json({ message: "the target does not exist" });
		}
		const followersCount = await Follow.count({
			where: { followTargetId: target.id },
		});
		res.status(200).json({ followersCount });
	} catch (error) {
		next(error);
	}
};

exports.getFollowingCount = async (req, res, next) => {
	try {
		const { id } = req.params;
		const target = await User.findOne({ where: { id } });
		if (!target) {
			return res.status(400).json({ message: "the target does not exist" });
		}
		const followingCount = await Follow.count({
			where: { followerId: target.id },
		});
		res.status(200).json({ followingCount });
	} catch (error) {
		next(error);
	}
};
