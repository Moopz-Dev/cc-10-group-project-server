const {
  User,
  Reel,
  ReelLike,
  ReelComment,
  ReelCommentLike,
  Follow,
} = require('../models');
const { Op } = require('sequelize');

exports.getAllReels = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
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

    const reels = await Reel.findAll({
      where: {
        userId: targets.map((item) => item.id),
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
          },
        ],
      },
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
  } catch (error) {
    next(error);
  }
};

exports.createReel = async (req, res, next) => {
  try {
    const { message } = req.body;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'this user does not exist.' });
    }
    const reel = await Reel.create({ message, userId: user.id });
    res.status(201).json(reel);
  } catch (error) {
    next(error);
  }
};

exports.updateReel = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'this user does not exist.' });
    }
    const reel = await Reel.findOne({ where: { id } });
    if (!reel) {
      return res.status(400).json({ message: 'this reel does not exist.' });
    }
    if (reel.userId !== user.id) {
      return res.status(403).json({ message: 'Unauthorized request' });
    }
    await Reel.update({ message, media });
    res.status(200).json(reel);
  } catch (error) {
    next(error);
  }
};

exports.deleteReel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: 'this user does not exist.' });
    }
    const reel = await Reel.findOne({ where: { id } });
    if (!reel) {
      return res.status(400).json({ message: 'this reel does not exist.' });
    }
    if (reel.userId !== user.id) {
      return res.status(403).json({ message: 'Unauthorized request' });
    }
    await Reel.delete();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
