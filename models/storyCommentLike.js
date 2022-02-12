module.exports = (sequelize, DataTypes) => {
  const StoryCommentLike = sequelize.define(
    'StoryCommentLike',
    {},
    {
      underscored: true,
    }
  );

  StoryCommentLike.associate = (models) => {
    StoryCommentLike.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    StoryCommentLike.belongsTo(models.StoryComment, {
      foreignKey: {
        name: 'storyCommentId',
        allowNull: false,
      },
    });
  };

  return StoryCommentLike;
};
