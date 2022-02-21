const {
	User,
	PostLike,
	PostCommentLike,
	ReelLike,
	ReelCommentLike,
	StoryLike,
	StoryCommentLike,

	sequelize,
} = require("../models");

exports.likeStory = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "missing parameter" });
		}
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "This user does not exist." });
		}
		let like = await StoryLike.findOne({
			where: { userId: user.id, storyId: id },
		});
		if (!like) {
			like = await StoryLike.create({ userId: user.id, storyId: id });
			return res.status(201).json({ message: "You just liked this story." });
		} else {
			like.destroy();
			return res.status(204).json({ message: "You just unliked this story." });
		}
	} catch (error) {
		next(error);
	}
};

exports.likeStoryComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "missing parameter" });
		}
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "This user does not exist." });
		}
		let like = await StoryCommentLike.findOne({
			where: { userId: user.id, storyCommentId: id },
		});
		if (!like) {
			like = await StoryCommentLike.create({
				userId: user.id,
				storyCommentId: id,
			});
			return res.status(201).json({ message: "You just liked this comment." });
		} else {
			like.destroy();
			return res
				.status(204)
				.json({ message: "You just unliked this comment." });
		}
	} catch (error) {
		next(error);
	}
};
exports.likeReel = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "missing parameter" });
		}
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "This user does not exist." });
		}
		let like = await ReelLike.findOne({
			where: { userId: user.id, reelId: id },
		});
		if (!like) {
			like = await ReelLike.create({
				userId: user.id,
				reelId: id,
			});
			return res.status(201).json({ message: "You just liked this reel." });
		} else {
			like.destroy();
			return res.status(204).json({ message: "You just unliked this reel." });
		}
	} catch (error) {
		next(error);
	}
};
exports.likeReelComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "missing parameter" });
		}
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "This user does not exist." });
		}
		let like = await ReelCommentLike.findOne({
			where: { userId: user.id, reelCommentId: id },
		});
		if (!like) {
			like = await ReelCommentLike.create({
				userId: user.id,
				reelCommentId: id,
			});
			return res.status(201).json({ message: "You just liked this comment." });
		} else {
			like.destroy();
			return res
				.status(204)
				.json({ message: "You just unliked this comment." });
		}
	} catch (error) {
		next(error);
	}
};
exports.likePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "missing parameter" });
		}
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "This user does not exist." });
		}
		let like = await PostLike.findOne({
			where: { userId: user.id, postId: id },
		});
		if (!like) {
			like = await PostLike.create({
				userId: user.id,
				postId: id,
			});
			return res.status(201).json({ message: "You just liked this post." });
		} else {
			like.destroy();
			return res.status(204).json({ message: "You just unliked this post." });
		}
	} catch (error) {
		next(error);
	}
};
exports.likePostComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({ message: "missing parameter" });
		}
		const user = await User.findOne({ where: { id: req.user.id } });
		if (!user) {
			return res.status(400).json({ message: "This user does not exist." });
		}
		let like = await PostCommentLike.findOne({
			where: { userId: user.id, postCommentId: id },
		});
		if (!like) {
			like = await PostCommentLike.create({
				userId: user.id,
				postCommentId: id,
			});
			return res.status(201).json({ message: "You just liked this post." });
		} else {
			like.destroy();
			return res.status(204).json({ message: "You just unliked this post." });
		}
	} catch (error) {
		next(error);
	}
};
