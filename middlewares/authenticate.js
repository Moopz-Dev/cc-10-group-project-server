const passport = require("passport");

exports.authenticateAdmin = passport.authenticate("admin-role", {
	session: false,
});

exports.authenticateUser = passport.authenticate("user-role", {
	session: false,
});

exports.authenticateAdminOrUser = passport.authenticate("admin-or-user-role", {
	session: false,
});
