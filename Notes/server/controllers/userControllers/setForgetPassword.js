const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

// POST -> /user/set-forget-pass/:userId
const setForgetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  const { userId } = req.params;

  // Find user by userId
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const matchToken = await bcrypt.compare(token, user.token)

  // Verify that the token matches and is not expired
  if (!matchToken || user.tokenExpires <= Date.now()) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user's password and clear the token and tokenExpires fields
  user.password = hashedPassword;
  user.token = undefined;
  user.tokenExpires = undefined;
  await user.save();

  res.status(200).json({ success: "Password changed successfully!" });
});

module.exports = setForgetPassword;
