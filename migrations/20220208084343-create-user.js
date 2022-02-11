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
			phone_number: {
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
			facebook_login: {
				type: Sequelize.BOOLEAN,
			},
			website: {
				type: Sequelize.STRING,
			},
			bio: {
				type: Sequelize.STRING,
			},
			profile_img: {
				type: Sequelize.STRING(1234),
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Users");
	},
};
