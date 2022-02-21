const { User } = require('../models');
const { Op } = require('sequelize');

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

exports.getUserProfile = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};
