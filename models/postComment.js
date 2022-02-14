module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define(
    'PostComment',
    {
      message: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  PostComment.associate = (models) => {
    PostComment.hasMany(models.PostCommentLike, {
      foreignKey: {
        name: 'postCommentId',
        allowNull: false,
      },
    });

    PostComment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    PostComment.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
    });
  };

  return PostComment;
};
