// routes/googleAuthRoutes.js
const express = require("express");
const {
  userLoginSuccess,
  userLoginFailed,
  authenticateUser,
  userAuthenticated,
  userLogout,
} = require("../controllers/googleAuthControllers/userLogin");

const router = express.Router();

router.route("/login/success").get(userLoginSuccess);
router.route("/login/failed").get(userLoginFailed);
router.route("/google").get(authenticateUser);
router.route("/google/callback").get(userAuthenticated);
router.route("/logout").get(userLogout);

module.exports = router;
