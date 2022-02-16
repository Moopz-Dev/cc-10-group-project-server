"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"follows",
			[
				{
					follower_id: 2,
					follow_target_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 2,
					follow_target_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 2,
					follow_target_id: 5,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 3,
					follow_target_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 4,
					follow_target_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 5,
					follow_target_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 6,
					follow_target_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 4,
					follow_target_id: 7,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					follower_id: 8,
					follow_target_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("follows", null, {});
	},
};
