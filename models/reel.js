module.exports = (sequqlize, DataTypes) => {
  const Reel = sequqlize.define(
    'Reel',
    {
      message: DataTypes.STRING,
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
