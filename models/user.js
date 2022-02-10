module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			name: {
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
			},
			phoneNumber: {
				type: DataTypes.STRING,
				unique: true,
				defaultValue: false,
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
			underscored: false,
		}
	);
	return User;
};
