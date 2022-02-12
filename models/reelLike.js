module.exports = (sequelize, DataTypes) => {
  const ReelLike = sequelize.define(
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
