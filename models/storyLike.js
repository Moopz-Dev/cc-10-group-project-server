module.exports = (sequelize, DataTypes) => {
  const StoryLike = sequelize.define(
    'StoryLike',
    {},
    {
      underscored: true,
    }
  );

  StoryLike.associate = (models) => {
    StoryLike.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    StoryLike.belongsTo(models.Story, {
      foreignKey: {
        name: 'storyId',
        allowNull: false,
      },
    });
  };

  return StoryLike;
};
