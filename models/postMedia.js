module.exports = (sequelize, DataTypes) => {
	const PostMedia = sequelize.define(
		"PostMedia",
		{
			media: DataTypes.STRING,
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "img",
				validate: {
					isIn: [["img", "video"]],
				},
			},
		},

		{
			underscored: true,
		}
	);

	PostMedia.associate = models => {
		PostMedia.belongsTo(models.Post, {
			foreignKey: {
				name: "postId",
				allowNull: false,
			},
		});
	};

	return PostMedia;
};
