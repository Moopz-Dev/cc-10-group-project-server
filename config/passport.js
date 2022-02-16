const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models");
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
	"user-role",
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await User.findOne({ where: { id: payload.id } });
			if (!user) {
				return done(null, false);
			}
			if (user.role !== "USER") {
				return done(null, false);
			}
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	})
);

passport.use(
	"admin-role",
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await User.findOne({ where: { id: payload.id } });
			if (!user) {
				return done(null, false);
			}
			if (user.role !== "ADMIN") {
				return done(null, false);
			}
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	})
);

passport.use(
	"admin-or-user-role",
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await User.findOne({ where: { id: payload.id } });
			if (!user) {
				return done(null, false);
			}
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	})
);
