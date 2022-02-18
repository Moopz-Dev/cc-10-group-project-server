"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"posts",
			[
				{
					message: "Test message for Post 1",
					user_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Post 2",
					user_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Post 3",
					user_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Post 4",
					user_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Post 5",
					user_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("posts", null, {});
	},
};
