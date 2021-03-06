module.exports = (sequelize, DataTypes) => {
  const StoryComment = sequelize.define(
    'StoryComment',
    {
      message: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  StoryComment.associate = (models) => {
    StoryComment.hasMany(models.StoryCommentLike, {
      foreignKey: {
        name: 'storyCommentId',
        allowNull: false,
      },
    });
    StoryComment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    StoryComment.belongsTo(models.Story, {
      foreignKey: {
        name: 'storyId',
        allowNull: false,
      },
    });
  };

  return StoryComment;
};
