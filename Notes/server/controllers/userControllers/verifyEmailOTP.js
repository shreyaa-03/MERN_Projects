const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

// GET -> /user/verify-otp
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (user.isVerified) {
    return res.status(400).json({ error: "User already verified" });
  }

  const matchOTP = await bcrypt.compare(user.otp, otp);

  if (!matchOTP || user.otpExpires < Date.now()) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ success: "Email verified successfully" });
});

module.exports = verifyOTP