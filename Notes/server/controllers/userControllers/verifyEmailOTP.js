const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { sendOTPEmail } = require("../../services/authVerifyService");

const sendOtp_email = asyncHandler(async (name, email, otp) => {
  try {
    // Send the verification email
    // await sendVerifyEmail(name, email, newUser._id);
    await sendOTPEmail(name, email, otp);
    console.log("New user created, verification email sent", newUser);
  } catch (error) {
    console.log(error);
  }
});

// GET -> /user/verify/email/otp
const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (user.isVerified) {
    return res.status(400).json({ error: "User already verified" });
  }

  const matchOTP = await bcrypt.compare(otp, user.otp);

  if (!matchOTP || user.otpExpires < Date.now()) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({ success: "Email verified successfully" });
});

module.exports = { verifyEmailOTP, sendOtp_email };
