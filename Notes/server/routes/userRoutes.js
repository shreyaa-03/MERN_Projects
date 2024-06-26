const express = require("express");
const {
  getAllUsers,
  registerUser,
  verifyEmail,
  loginUser,
  verifyForget,
  setForgetpass,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get();
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/verify").get(verifyEmail);
router.route("/forget").post(verifyForget);
router.route("/set-forget-pass/:user_id").post(setForgetpass);

module.exports = router;
