"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"post_media",
			[
				{
					media: "https://picsum.photos/id/8/200/300",
					type: "img",
					post_id: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/9/200/300",
					type: "img",
					post_id: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/10/200/300",
					type: "img",
					post_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/11/200/300",
					type: "img",
					post_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/12/200/300",
					type: "img",
					post_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/80/200/300",
					type: "img",
					post_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/13/200/300",
					type: "img",
					post_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/14/200/300",
					type: "img",
					post_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/15/200/300",
					type: "img",
					post_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/16/200/300",
					type: "img",
					post_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/17/200/300",
					type: "img",
					post_id: 5,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/18/200/300",
					type: "img",
					post_id: 5,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					media: "https://picsum.photos/id/19/200/300",
					type: "img",
					post_id: 5,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("post_media", null, {});
	},
};
