const {
	User,
	Story,
	StoryLike,
	StoryComment,
	StoryCommentLike,
	Follow,
} = require("../models");
const { Op } = require("sequelize");

exports.getAllStories = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		const publicUsers = await User.findAll({
			where: { publicStatus: "PUBLIC" },
		});
		let targets = publicUsers;
		if (user) {
			const followers = await Follow.findAll({
				where: { followTarget: req.user.id },
				attribute: ["follower"],
			});

			const friends = await Follow.findAll({
				where: {
					followTarget: followers.map(item => item.follower),
					followers: req.user.id,
				},
			});
			targets = [...publicUsers, ...friends];
		}

		const stories = await Story.findAll({
			where: {
				userId: targets.map(item => item.id),
				include: [
					{
						model: StoryLike,
					},
					{
						model: StoryComment,
						include: { model: StoryCommentLike },
					},
					{
						model: User,
					},
				],
			},
		});
		res.status(200).json(stories);
	} catch (error) {
		next(error);
	}
};

exports.getUserStories = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		const { userId } = req.params;

		const publicUsers = await User.findAll({
			where: { publicStatus: "PUBLIC" },
		});
		let targets = publicUsers;
		if (user) {
			const followers = await Follow.findAll({
				where: { followTarget: req.user.id },
				attribute: ["follower"],
			});

			const friends = await Follow.findAll({
				where: {
					followTarget: followers.map(item => item.follower),
					followers: req.user.id,
				},
			});
			targets = [...publicUsers, ...friends];
		}
		const target = await targets.findOne({ where: { id: userId } });
		if (!target) {
			return res.status(400).json({
				message: "Only friends can view your target, or they do not exist",
			});
		}
		res.status(200).json(target);
	} catch (error) {
		next(error);
	}
};

exports.createStory = async (req, res, next) => {
	try {
		const { message, media } = req.body;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		const story = await Story.create({ message, media, userId: user.id });
		res.status(201).json(story);
	} catch (error) {
		next(error);
	}
};

exports.updateStory = async (req, res, next) => {
	try {
		const { message, media } = req.body;
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		const story = await Story.findOne({ where: { id } });
		if (!story) {
			return res.status(400).json({ message: "this story does not exist." });
		}
		if (story.userId !== user.id) {
			return res.status(403).json({ message: "Unauthorized request" });
		}
		await story.update({ message, media });
		res.status(200).json(story);
	} catch (error) {
		next(error);
	}
};

exports.delete = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "this user does not exist." });
		}
		const story = await Story.findOne({ where: { id } });
		if (!story) {
			return res.status(400).json({ message: "this story does not exist." });
		}
		if (story.userId !== user.id) {
			return res.status(403).json({ message: "Unauthorized request" });
		}
		await story.delete();
		res.status(204).json();
	} catch (error) {
		next(error);
	}
};
