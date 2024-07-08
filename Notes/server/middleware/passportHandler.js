const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "123029380661-s6evfrgbt1m42dehgt0ua761cj2prtst.apps.googleusercontent.com", // Your Credentials here.
      clientSecret: "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", // Your Credentials here.
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["email", "profile"],
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
