const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { sendOtp_email } = require("./verifyEmailOTP");
const { sendOtp_phone } = require("./verifyPhoneOTP");
const otpGenerator = require("otp-generator");
const { sendVerifyEmail } = require("../../services/authVerifyService");

//POST -> /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phoneNo, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists with this email id");
  }
  // const userExists = await User.findOne({ phoneNo });
  // if (userExists) {
  //   throw new Error("User already exists with this phone no");
  // }
  const hashedPassword = await bcrypt.hash(password, 10);

  // const otp = randomString.generate({ length: 6, charset: "numeric" }); // EMAIL-OTP

  // const otp = otpGenerator.generate(4, {
  //   upperCaseAlphabets: false,
  //   specialChars: false,
  //   lowerCaseAlphabets: false,
  // }); //PHONE -OTP

  // const hashedOTP = await bcrypt.hash(otp, 10);

  const newUser = await User.create({
    name,
    email,
    phoneNo,
    password: hashedPassword,
    otp: hashedOTP, // Store the OTP in the database
    otpExpires: Date.now() + 3600000, // OTP expires in 1 hour
  });

  if (newUser) {
    // sendOtp_email(name,email,otp)
    // sendOtp_phone(name, phoneNo, otp, hashedOTP);
    await sendVerifyEmail(name, email, newUser.id);
    res.status(200).json({ success: "Otp sent successfully!" });
  } else {
    res.status(500).json({ message: "User creation failed" });
  }
});

module.exports = registerUser;
