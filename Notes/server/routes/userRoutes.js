const express = require("express");
const {
  getAllUsers,
  registerUser,
  verifyEmail,
  loginUser,
  verifyForget,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get();
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/verify").get(verifyEmail);
router.route("/forget").post(verifyForget);

module.exports = router;
