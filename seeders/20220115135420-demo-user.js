"use strict";
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
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
					profile_img: faker.image.avatar(),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "john",
					name: "John Doe",
					role: "USER",
					email: "john@gmail.com",
					bio: "He is the most popular example name in codecamp",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "andy",
					name: "Andy Warhol",
					role: "USER",
					email: "andy@gmail.com",
					bio: "He is American Artist, (Aug 6,1928 - Feb 22,1987) ",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "jeff",
					role: "USER",
					email: "jeff@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "bruce",
					role: "USER",
					email: "bruce@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "charlie",
					role: "USER",
					email: "charlie@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "danny",
					role: "USER",
					email: "danny@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
					public_status: "PRIVATE",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "eugene",
					role: "USER",
					email: "eugene@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
					public_status: "PUBLIC",
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					username: "fiona",
					role: "USER",
					email: "fiona@gmail.com",
					password: bcrypt.hashSync("123456", 12),
					profile_img: faker.image.avatar(),
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
