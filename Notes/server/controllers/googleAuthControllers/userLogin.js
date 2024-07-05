// // controllers/googleAuthControllers/userLogin.js
// const asyncHandler = require("express-async-handler");
// const passport = require("passport");

// // GET -> /auth/login/success
// const userLoginSuccess = asyncHandler(async (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       message: "Successfully Logged in",
//       user: req.user,
//     });
//   } else {
//     res.status(400).json({
//       error: true,
//       message: "Authorization failed",
//     });
//   }
// });

// // GET -> /auth/login/failed
// const userLoginFailed = (req, res) => {
//   res.status(400).json({
//     error: true,
//     message: "Login failed",
//   });
// };

// // Middleware for /auth/google
// const authenticateUser = passport.authenticate("google", {
//   scope: ["profile", "email"], // Ensure correct scopes are specified
// });

// // Middleware for /auth/google/callback
// const userAuthenticated = passport.authenticate("google", {
//   successRedirect: "/auth/login/success",
//   failureRedirect: process.env.GOOGLE_LOGIN_FAILED_URL,
// });

// // GET -> /auth/logout
// const userLogout = (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({
//         error: true,
//         message: "Logout failed",
//       });
//     }
//     res.redirect(process.env.GOOGLE_LOGIN_SUCCESS_URL);
//   });
// };

// module.exports = {
//   userLoginSuccess,
//   userLoginFailed,
//   userAuthenticated,
//   authenticateUser,
//   userLogout,
// };

const asyncHandler = require("express-async-handler");
const passport = require("passport");

// GET -> /auth/login/success
const userLoginSuccess = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged in",
      user: req.user,
    });
  } else {
    res.status(400).json({
      error: true,
      message: "Authorization failed",
    });
  }
});

// GET -> /auth/login/failed
const userLoginFailed = (req, res) => {
  res.status(400).json({
    error: true,
    message: "Login failed",
  });
};

// Middleware for /auth/google
const authenticateUser = passport.authenticate("google", {
  scope: ["profile", "email"], // Ensure correct scopes are specified
});

// Middleware for /auth/google/callback
const userAuthenticated = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(process.env.GOOGLE_LOGIN_FAILED_URL);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/auth/login/success");
    });
  })(req, res, next);
};

// GET -> /auth/logout
const userLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "Logout failed",
      });
    }
    res.redirect(process.env.GOOGLE_LOGIN_SUCCESS_URL);
  });
};

module.exports = {
  userLoginSuccess,
  userLoginFailed,
  userAuthenticated,
  authenticateUser,
  userLogout,
};
