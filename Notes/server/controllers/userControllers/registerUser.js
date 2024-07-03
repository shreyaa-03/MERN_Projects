const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { sendOTPEmail } = require('../../services/authVerifyService')

//POST -> /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists with this email id");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = randomString.generate({ length: 6, charset: "numeric" });
  const hashedOTP = await bcrypt.hash(otp, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    otp: hashedOTP, // Store the OTP in the database
    otpExpires: Date.now() + 3600000, // OTP expires in 1 hour
  });

  if (newUser) {
    try {
      // Send the verification email
      // await sendVerifyEmail(name, email, newUser._id);
      await sendOTPEmail(name, email, otp);
      console.log("New user created, verification email sent", newUser);
      res.status(201).json({
        message: "New user created, verification email sent",
        newUser,
      });
    } catch (error) {
      // If email sending fails, delete the newly created user
      await User.findByIdAndDelete(newUser._id);
      console.error(
        "User created but email sending failed, user deleted:",
        error
      );
      res.status(500).json({
        message: "User created but email sending failed, user deleted",
      });
    }
  } else {
    res.status(500).json({ message: "User creation failed" });
  }
});

module.exports = registerUser;
