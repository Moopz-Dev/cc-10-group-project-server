module.exports = (sequelize, DataTypes) => {
  const PostMedia = sequelize.define(
    'PostMedia',
    {
      media: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  PostMedia.associate = (models) => {
    PostMedia.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    PostMedia.belongTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
    });
  };

  return PostMedia;
};
