module.exports = (sequqlize, DataTypes) => {
  const ReelCommentLike = sequqlize.define(
    'ReelCommentLike',
    {},
    {
      underscored: true,
    }
  );

  ReelCommentLike.associate = (models) => {
    ReelCommentLike.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    ReelCommentLike.belongsTo(models.ReelComment, {
      foreignKey: {
        name: 'reelCommentId',
        allowNull: false,
      },
    });
  };

  return ReelCommentLike;
};
