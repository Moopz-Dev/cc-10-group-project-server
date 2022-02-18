"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"posts",
			[
				{
					message: "Test message for Story 1",
					media: "https://picsum.photos/200/300",
					user_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Story 2",
					media: "https://picsum.photos/200/300",
					user_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Story 3",
					media: "https://picsum.photos/200/300",
					user_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Story 4",
					media: "https://picsum.photos/200/300",
					user_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "",
					media: "https://picsum.photos/200/300",
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
