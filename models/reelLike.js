module.exports = (sequqlize, DataTypes) => {
  const ReelLike = sequqlize.define(
    'ReelLike',
    {},
    {
      underscored: true,
    }
  );

  ReelLike.associate = (models) => {
    ReelLike.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    ReelLike.belongsTo(models.Reel, {
      foreignKey: {
        name: 'reelId',
        allowNull: false,
      },
    });
  };

  return ReelLike;
};
