const {
    User,
    Post,
    PostMedia,
    PostComment,
    PostLike,
    PostCommentLike,
    Follow,
    sequelize,
} = require('../models');

exports.getAllPosts = async (req, res, next) => {
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

        const posts = await Post.findAll({
            where: {
                userId: targets.map((item) => item.id),
            },
            include: [
                {
                    model: PostLike,
                },
                {
                    model: PostComment,
                    include: { model: PostCommentLike },
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'profileImg'],
                },
                {
                    model: PostMedia,
                },
            ],
        });
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

module.exports.getUserPosts = async (req, res, next) => {
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
        const target = await Post.findAll({ where: { id: userId } });
        res.status(200).json(target);
    } catch (err) {
        next(err);
    }
};

exports.createPost = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { message, media } = req.body;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res
                .status(400)
                .json({ message: 'this user does not exist.' });
        }
        const post = await Post.create(
            { message, userId: user.id },
            { transaction }
        );
        // res.status(201).json(post);
        const newPostMedia = media.map((item) => ({
            ...item,
            postId: post.id,
        }));

        await PostMedia.bulkCreate(newPostMedia, { transaction });
        await transaction.commit();

        const returnPostMedia = await Post.findOne({
            where: { id: post.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: User,
                    attributes: ['username', 'profileImg', 'publicStatus'],
                },
                {
                    model: PostMedia,
                    attributes: ['media, type'],
                },
            ],
        });
        res.status(201).json({ post: returnPostMedia });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { message, media } = req.body;
        const { id } = req.params;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res
                .status(400)
                .json({ message: 'this user does not exist.' });
        }

        const post = await Post.findOne({ where: { id } });
        if (!post) {
            return res
                .status(400)
                .json({ message: 'this post does not exist.' });
        }
        console.log(post.userId);
        console.log(user.id);
        if (post.userId !== user.id) {
            return res.status(403).json({ message: 'Unauthorized request' });
        }

        const postMedia = await PostMedia.findAll({ where: { postId: id } });
        if (!postMedia) {
            return res
                .status(400)
                .json({ message: 'this media does not exist.' });
        }
        console.log(postMedia);
        const newPostMedia = await postMedia.map((item, idx) => {
            item.update(
                {
                    media: media[idx].media,
                    type: media[idx].type,
                },
                { transaction }
            );
        });

        await post.update({ message }, { transaction });
        await transaction.commit();

        const returnPostMedia = await Post.findOne({
            where: { id: post.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: User,
                    attributes: ['username', 'profileImg', 'publicStatus'],
                },
                {
                    model: PostMedia,
                    attributes: ['media, type'],
                },
            ],
        });
        res.status(200).json(returnPostMedia);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const transaction = await sequelize.transaction();
        const { id } = req.params;
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res
                .status(400)
                .json({ message: 'this user does not exist.' });
        }
        const post = await Post.findOne({ where: { id } });
        if (!post) {
            return res
                .status(400)
                .json({ message: 'this post does not exist.' });
        }
        if (post.userId !== user.id) {
            return res.status(403).json({ message: 'Unauthorized request' });
        }

        await PostLike.destroy({ where: { postId: id } }, { transaction });
        await PostCommentLike.destroy(
            { where: { postCommentId: { where: { postId: id } } } },
            { transaction }
        );
        await PostComment.destroy({ where: { postId: id } }, { transaction });
        await post.destroy({ transaction });
        await transaction.commit();
        res.status(204).json();
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};
