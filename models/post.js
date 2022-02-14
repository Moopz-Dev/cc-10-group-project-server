module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      message: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    Post.hasMany(models.PostMedia, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
    });
    Post.hasMany(models.PostComment, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
    });

    Post.hasMany(models.PostLike, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
    });
  };

  return Post;
};
