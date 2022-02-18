module.exports = (sequelize, DataTypes) => {
	const Story = sequelize.define(
		"Story",
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

	Story.associate = models => {
		Story.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});

		Story.hasMany(models.StoryComment, {
			foreignKey: {
				name: "storyId",
				allowNull: false,
			},
		});

		Story.hasMany(models.StoryLike, {
			foreignKey: {
				name: "storyId",
				allowNull: false,
			},
		});
	};

	return Story;
};
