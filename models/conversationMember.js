module.exports = (sequelize, DataTypes) => {
	const ConversationMember = sequelize.define(
		"ConversationMember",
		{},
		{
			underscored: true,
		}
	);

	ConversationMember.associate = models => {
		ConversationMember.belongsTo(models.Conversation, {
			foreignKey: {
				name: "conversationId",
				allowNull: false,
			},
		});

		ConversationMember.belongsTo(models.User, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});

		ConversationMember.hasMany(models.ConversationMessage, {
			foreignKey: {
				name: "memberId",
				allowNull: false,
			},
		});
	};

	return ConversationMember;
};
