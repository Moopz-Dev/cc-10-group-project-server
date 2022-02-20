module.exports = (sequelize, DataTypes) => {
	const Conversation = sequelize.define(
		"Conversation",
		{},
		{
			underscored: true,
		}
	);

	Conversation.associate = models => {
		Conversation.hasMany(models.ConversationMember, {
			foreignKey: {
				name: "conversationId",
				allowNull: false,
			},
		});
		Conversation.hasMany(models.ConversationMessage, {
			foreignKey: {
				name: "conversationId",
				allowNull: false,
			},
		});
	};

	return Conversation;
};
