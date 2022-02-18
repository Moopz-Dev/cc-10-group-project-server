module.exports = (sequelize, DataTypes) => {
  const Reel = sequelize.define(
    'Reel',
    {
      message: DataTypes.STRING,
      media: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Reel.associate = (models) => {
    Reel.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });

    Reel.hasMany(models.ReelComment, {
      foreignKey: {
        name: 'reelId',
        allowNull: false,
      },
    });

    Reel.hasMany(models.ReelLike, {
      foreignKey: {
        name: 'reelId',
        allowNull: false,
      },
    });
  };

  return Reel;
};
