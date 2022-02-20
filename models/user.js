module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				unique: true,
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
				defaultValue: false,
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
			publicStatus: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "PRIVATE",
				validate: {
					isIn: [["PRIVATE", "PUBLIC"]],
				},
			},
		},
		{
			underscored: true,
		}
	);

	User.associate = models => {
		User.hasMany(models.Follow, {
			as: "follower",
			foreignKey: {
				name: "followerId",
				allowNull: false,
			},
		});
		User.hasMany(models.Follow, {
			as: "followTarget",
			foreignKey: {
				name: "followTargetId",
				allowNull: false,
			},
		});
		User.hasMany(models.Post, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.PostComment, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.PostLike, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.PostCommentLike, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.Reel, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.ReelComment, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.ReelCommentLike, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.ReelLike, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.Story, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.StoryComment, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.StoryCommentLike, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
		User.hasMany(models.StoryLike, {
			foreignKey: {
				name: "userId",
				allowNull: false,
			},
		});
	};
	return User;
};
