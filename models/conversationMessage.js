module.exports = (sequelize, DataTypes) => {
	const ConversationMessage = sequelize.define(
		"ConversationMessage",
		{
			message: DataTypes.STRING,
		},
		{
			underscored: true,
		}
	);

	ConversationMessage.associate = models => {
		ConversationMessage.belongsTo(models.ConversationMember, {
			foreignKey: {
				name: "memberId",
				allowNull: false,
			},
		});

		ConversationMessage.belongsTo(models.Conversation, {
			foreignKey: {
				name: "conversationId",
				allowNull: false,
			},
		});
	};

	return ConversationMessage;
};
