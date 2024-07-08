const router = require("express").Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Auth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/google/callback/success",
    failureRedirect: "/google/callback/failure",
  })
);

// Success
router.get("/google/callback/success", (req, res) => {
  if (!req.user) res.redirect("/google/callback/failure");
  res.send("Welcome " + req.user.email);
});

// failure
router.get("/google/callback/failure", (req, res) => {
  res.send("Error");
});

module.exports = router;
