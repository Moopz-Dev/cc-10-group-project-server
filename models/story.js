module.exports = (sequqlize, DataTypes) => {
  const Story = sequqlize.define(
    'Story',
    {
      message: DataTypes.STRING,

      media: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  Story.associate = (models) => {
    Story.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    Story.hasMany(models.StoryComment, {
      foreignKey: {
        name: 'storyId',
        allowNull: false,
      },
    });

    Story.hasMany(models.StoryLike, {
      foreignKey: {
        name: 'storyId',
        allowNull: false,
      },
    });
  };

  return Story;
};
