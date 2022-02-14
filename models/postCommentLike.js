module.exports = (sequelize, DataTypes) => {
  const PostCommentLike = sequelize.define(
    'PostCommentLike',
    {},
    {
      underscored: true,
    }
  );

  PostCommentLike.associate = (models) => {
    PostCommentLike.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    PostCommentLike.belongsTo(models.PostComment, {
      foreignKey: {
        name: 'postCommentId',
        allowNull: false,
      },
    });
  };

  return PostCommentLike;
};
