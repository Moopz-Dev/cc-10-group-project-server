const {
  User,
  Post,
  PostMedia,
  PostComment,
  PostLike,
  PostCommentLike,
  Follow,
} = require('../models');

exports.getAllPosts = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const publicUsers = await User.findAll({
      where: { publicStatus: 'PUBLIC' },
    });
    let targets = publicUsers;
    if (user) {
      const followers = await Follow.findAll({
        where: { followtarget: req.user.id },
        attribute: ['follower'],
      });

      const friends = await Follow.findAll({
        where: {
          followTarget: followers.map((item) => item.follower),
          followers: req.user.id,
        },
      });
      targets = [...publicUsers, ...friends];
    }

    const posts = await Post.findAll({
      where: {
        userId: targets.map((item) => item.id),
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
          },
        ],
      },
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
    });
    let targets = publicUsers;
    if (user) {
      const followers = await Follow.findAll({
        where: { followTarget: req.user.id },
        attribute: ['follower'],
      });

      const friends = await Follow.findAll({
        where: {
          followTarget: followers.map((item) => item.follower),
          followers: req.user.id,
        },
      });
      targets = [...publicUsers, ...friends];
    }

    const target = await targets.findOne({ where: { id: userId } });
    if (!target) {
      return res.status(400).json({
        message: 'Only friends can view your target, or they do not exist',
      });
    }
    res.status(200).json(target);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { message, media } = req.body;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'this user does not exist.' });
    }
    const post = await Post.create({ message, userId: user.id });
    if (media) {
      const postMedia = await PostMedia.create({ media, userId: user.id });
      res.status(201).json(postMedia);
    }
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'this user does not exist.' });
    }
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(400).json({ message: 'this post does not exist.' });
    }
    if (post.userId !== user.id) {
      return res.status(403).json({ message: 'Unauthorized request' });
    }
    await Post.update({ message });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePostMedia = async (req, res, next) => {
  try {
    const { media } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'this user does not exist.' });
    }
    const postMedia = await PostMedia.findOne({ where: { id } });
    if (!postMedia) {
      return res.status(400).json({ message: 'this media does not exist.' });
    }
    if (postMedia.userId !== user.id) {
      return res.status(403).json({ message: 'Unauthorized request' });
    }
    await PostMedia.update({ media });
    res.status(200).json(postMedia);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'this user does not exist.' });
    }
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(400).json({ message: 'this post does not exist.' });
    }
    if (post.userId !== user.id) {
      return res.status(403).json({ message: 'Unauthorized request' });
    }

    await PostLike.destroy({ where: { postId: id } }, { transaction });
    await PostComment.destroy({ where: { postId: id } }, { transaction });
    await PostCommentLike.destroy(
      { where: { postCommentId: { where: { postId: id } } } },
      { transaction }
    );
    await Post.destroy({ where: { id } }, { transaction });
    await transaction.commit();
    res.status(204).json();
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
