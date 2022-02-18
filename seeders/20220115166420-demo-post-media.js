"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"post_medias",
			[
				{
					media: "https://picsum.photos/200/300",
					post_id: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 5,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 5,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/200/300",
					post_id: 5,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("post_medias", null, {});
	},
};
