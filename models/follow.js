module.exports = (sequelize, DataTypes) => {
	const Follow = sequelize.define(
		"Follow",
		{},
		{
			underscored: true,
		}
	);
	Follow.associate = models => {
		Follow.belongsTo(models.User, {
			as: "follower",
			foreignKey: {
				name: "followerId",
				allowNull: false,
			},
		});
		Follow.belongsTo(models.User, {
			as: "followTarget",
			foreignKey: {
				name: "followTargetId",
				allowNull: false,
			},
		});
	};
	return Follow;
};
