// ********* EMAIL VERIFICATION BY OTP ***********
const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { sendOtp_email } = require("./verifyEmailOTP");

//POST -> /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists && userExists.isVerified === "true") {
      return res
        .status(400)
        .json({ message: "User already exists with this email id" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = randomString.generate({ length: 6, charset: "numeric" }); // EMAIL-OTP

    const hashedOTP = await bcrypt.hash(otp, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp: hashedOTP, // Store the OTP in the database
      otpExpires: Date.now() + 3600000, // OTP expires in 1 hour
    });

    if (newUser) {
      sendOtp_email(name, email, otp);
      res
        .status(200)
        .json({ success: true, message: "Otp sent successfully!" });
      console.log("Otp sent successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User creation failed" });
  }
});

module.exports = registerUser;
