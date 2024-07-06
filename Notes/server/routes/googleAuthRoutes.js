// // routes/googleAuthRoutes.js
// const express = require("express");
// const {
//   userLoginSuccess,
//   userLoginFailed,
//   authenticateUser,
//   userAuthenticated,
//   userLogout,
// } = require("../controllers/googleAuthControllers/userLogin");

// const router = express.Router();

// router.route("/login/success").get(userLoginSuccess);
// router.route("/login/failed").get(userLoginFailed);
// router.route("/google").get(authenticateUser);
// router.route("/google/callback").get(userAuthenticated);
// router.route("/logout").get(userLogout);

// module.exports = router;

const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
