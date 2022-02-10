"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			phoneNumber: {
				type: Sequelize.STRING,
				unique: true,
			},
			role: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				// allowNull: false,
			},
			facebookLogin: {
				type: Sequelize.BOOLEAN,
			},
			pronouns: {
				type: Sequelize.STRING,
			},
			website: {
				type: Sequelize.STRING,
			},
			bio: {
				type: Sequelize.STRING,
			},
			profileImg: {
				type: Sequelize.STRING(1234),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Users");
	},
};
