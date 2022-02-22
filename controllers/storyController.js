const {
    User,
    Story,
    StoryLike,
    StoryComment,
    StoryCommentLike,
    Follow,
} = require('../models');
const { Op } = require('sequelize');

exports.getAllStories = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        const publicUsers = await User.findAll({
            where: { publicStatus: 'PUBLIC' },
            raw: true,
        });
        let targets = publicUsers;
        if (user) {
            const followers = await Follow.findAll({
                where: { followTargetId: req.user.id },
                raw: true,
                attribute: ['followerId'],
            });

            let friends = await Follow.findAll({
                where: {
                    followTargetId: followers.map((item) => item.followerId),
                    followerId: req.user.id,
                },
                raw: true,
            });

            friends = await User.findAll({
                where: { id: friends.map((item) => item.followTargetId) },
                raw: true,
            });
            targets = [...publicUsers, ...friends];
        }
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const stories = await Story.findAll({
            where: {
                userId: targets.map((item) => item.id),
                updatedAt: { [Op.gte]: yesterday },
            },
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
                    attributes: ['id', 'username', 'profileImg'],
                },
            ],
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
            where: { publicStatus: 'PUBLIC' },
            raw: true,
        });
        let targets = publicUsers;
        if (user) {
            const followers = await Follow.findAll({
                where: { followTargetId: req.user.id },
                raw: true,
                attributes: ['followerId'],
            });

            let friends = await Follow.findAll({
                where: {
                    followTargetId: followers.map((item) => item.followerId),
                    followerId: req.user.id,
                },
                raw: true,
            });

            friends = await User.findAll({
                where: { id: friends.map((item) => item.followTargetId) },
                raw: true,
            });
            targets = [...publicUsers, ...friends];
        }

        const canView = targets.filter((item) => item.id == userId);

        if (canView.length === 0) {
            return res.status(400).json({
                message:
                    'Only friends can view your target, or they do not exist',
            });
        }

        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const target = await Story.findAll({
            where: {
                userId,
                updatedAt: { [Op.gte]: yesterday },
            },
        });
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
            return res
                .status(400)
                .json({ message: 'this user does not exist.' });
        }
        if (!media) {
            return res
                .status(400)
                .json({ message: 'Bad request, post media is required.' });
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
            return res
                .status(400)
                .json({ message: 'this user does not exist.' });
        }
        const story = await Story.findOne({ where: { id } });
        if (!story) {
            return res
                .status(400)
                .json({ message: 'this story does not exist.' });
        }
        if (story.userId !== user.id) {
            return res.status(403).json({ message: 'Unauthorized request' });
        }
        await story.update({ message, media });
        res.status(200).json(story);
    } catch (error) {
        next(error);
    }
};

exports.deleteStory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res
                .status(400)
                .json({ message: 'this user does not exist.' });
        }
        const story = await Story.findOne({ where: { id } });
        if (!story) {
            return res
                .status(400)
                .json({ message: 'this story does not exist.' });
        }
        if (story.userId !== user.id) {
            return res.status(403).json({ message: 'Unauthorized request' });
        }
        await story.destroy();
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
