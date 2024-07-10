const express = require("express");
const {
  getAllUsers,
  registerUser,
  verifyEmail,
  loginUser,
  verifyForgetPassEmail,
  verifyEmailOTP,
  verifyPhoneOTP,
  setForgetPassword,
} = require("../controllers/userControllers/USER_CONTROLLER");
const {
  resendEmailVerificationLink,
} = require("../controllers/userControllers/emailLinkVerfication/resendEmailVerificationLink");
const router = express.Router();

router.route("/").get(getAllUsers);
// router.route("/:id").get();
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

router.route("/verify/email").get(verifyEmail);
router.route("/resend/verification/link").post(resendEmailVerificationLink);

router.route("/verify/email/otp").post(verifyEmailOTP);

router.route("/verify-phone-otp").post(verifyPhoneOTP);

router.route("/reset/password/request").post(verifyForgetPassEmail);
router.route("/reset/password").post(setForgetPassword);

module.exports = router;
