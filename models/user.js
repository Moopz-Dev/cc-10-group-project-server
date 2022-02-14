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
				defaultValue: "USER",
				validate: {
					isIn: [["USER", "ADMIN"]],
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					isEmail: true,
				},
				defaultValue: null,
			},
			phoneNumber: {
				type: DataTypes.STRING,
				unique: true,
				defaultValue: null,
			},
			facebookLogin: {
				type: DataTypes.BOOLEAN,
			},
			password: {
				type: DataTypes.STRING,
				// allowNull: false,
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
