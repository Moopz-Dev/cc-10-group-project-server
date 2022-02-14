module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    'PostLike',
    {},
    {
      underscored: true,
    }
  );

  PostLike.associate = (models) => {
    PostLike.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    PostLike.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
    });
  };

  return PostLike;
};
