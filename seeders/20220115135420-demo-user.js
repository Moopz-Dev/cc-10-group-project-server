"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"users",
			[
				{
					username: "admin",
					role: "ADMIN",
					email: "admin@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "john",
					role: "USER",
					email: "john@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "andy",
					role: "USER",
					email: "andy@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "jeff",
					role: "USER",
					email: "jeff@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "bruce",
					role: "USER",
					email: "bruce@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "charlie",
					role: "USER",
					email: "charlie@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "danny",
					role: "USER",
					email: "danny@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "eugene",
					role: "USER",
					email: "eugene@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "fiona",
					role: "USER",
					email: "fiona@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("users", null, {});
	},
};
