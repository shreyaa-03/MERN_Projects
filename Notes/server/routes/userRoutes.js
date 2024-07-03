const express = require("express");
const {
  getAllUsers,
  registerUser,
  // verifyEmail,
  loginUser,
  verifyForgetPassEmail,
  setForgetpassword,
  verifyOTP,
} = require("../controllers/userControllers/USER_CONTROLLER");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get();
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
// router.route("/verify-email").get(verifyEmail);
router.route("/verify-otp").post(verifyOTP);
router.route("/forget").post(verifyForgetPassEmail);
router.route("/set-forget-pass/:user_id").post(setForgetpassword);

module.exports = router;
