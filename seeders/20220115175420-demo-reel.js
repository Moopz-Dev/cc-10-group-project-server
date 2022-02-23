"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"reels",
			[
				{
					message: "Test message for Reel 1",
					media: "https://picsum.photos/id/1/200/300",
					song: "https://instrumentalfx.co/wp-content/upload/11/Unison-Aperture-NCS-Release.mp3",
					user_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Reel 2",
					media: "https://picsum.photos/id/2/200/300",
					song: "https://instrumentalfx.co/wp-content/upload/11/Unison-Aperture-NCS-Release.mp3",
					user_id: 2,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Reel 3",
					media: "https://picsum.photos/id/3/200/300",
					song: "https://instrumentalfx.co/wp-content/upload/11/Unison-Aperture-NCS-Release.mp3",
					user_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Reel 4",
					media: "https://picsum.photos/id/4/200/300",
					song: "https://instrumentalfx.co/wp-content/upload/11/Unison-Aperture-NCS-Release.mp3",
					user_id: 3,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Reel 5",
					media: "https://picsum.photos/id/5/200/300",
					song: "https://instrumentalfx.co/wp-content/upload/11/Unison-Aperture-NCS-Release.mp3",
					user_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Reel 6",
					media: "https://picsum.photos/id/6/200/300",
					song: "https://instrumentalfx.co/wp-content/upload/11/Unison-Aperture-NCS-Release.mp3",
					user_id: 4,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					message: "Test message for Reel 7",
					media: "https://picsum.photos/id/7/200/300",
					song: "https://instrumentalfx.co/wp-content/upload/11/Unison-Aperture-NCS-Release.mp3",
					user_id: 6,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("stories", null, {});
	},
};
