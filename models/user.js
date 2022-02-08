module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				default: "USER",
				validate: {
					isIn: [["USER", "ADMIN"]],
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			website: {
				type: DataTypes.STRING,
			},

			bio: {
				type: DataTypes.STRING,
			},

			profileImg: {
				type: DataTypes.STRING,
			},
		},
		{
			underscored: true,
		}
	);
	return User;
};
