module.exports = (sequelize, DataTypes) => {
  const ReelComment = sequelize.define(
    'ReelComment',
    {
      message: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  ReelComment.associate = (models) => {
    ReelComment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    ReelComment.belongsTo(models.Reel, {
      foreignKey: {
        name: 'reelId',
        allowNull: false,
      },
    });
  };

  return ReelComment;
};
