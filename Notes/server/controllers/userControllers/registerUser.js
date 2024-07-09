// const asyncHandler = require("express-async-handler");
// const User = require("../../models/userModel");
// const bcrypt = require("bcrypt");
// const randomString = require("randomstring");
// const { sendOtp_email } = require("./verifyEmailOTP");
// const { sendOtp_phone } = require("./verifyPhoneOTP");
// const otpGenerator = require("otp-generator");
// const { sendVerifyEmail } = require("../../services/authVerifyService");

// //POST -> /user/register
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       // throw new Error("User already exists with this email id");
//       return res
//         .status(400)
//         .json({ message: "User already exists with this email id" });
//     }
//     // const userExists = await User.findOne({ phoneNo });
//     // if (userExists) {
//     //   throw new Error("User already exists with this phone no");
//     // }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // const otp = randomString.generate({ length: 6, charset: "numeric" }); // EMAIL-OTP

//     // const otp = otpGenerator.generate(4, {
//     //   upperCaseAlphabets: false,
//     //   specialChars: false,
//     //   lowerCaseAlphabets: false,
//     // }); //PHONE -OTP

//     // const hashedOTP = await bcrypt.hash(otp, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       // phoneNo,
//       password: hashedPassword,
//       // otp: hashedOTP, // Store the OTP in the database
//       // otpExpires: Date.now() + 3600000, // OTP expires in 1 hour
//     });

//     if (newUser) {
//       // sendOtp_email(name,email,otp)
//       // sendOtp_phone(name, phoneNo, otp, hashedOTP);
//       await sendVerifyEmail(name, email, newUser._id);
//       res.status(200).json({ success: "Otp sent successfully!" });
//       console.log("Otp sent successfully");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "User creation failed" });
//   }
// });

// module.exports = registerUser;

const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const { sendVerifyEmail } = require("../../services/authVerifyService");

// POST -> /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // If the user already exists, send a 400 Bad Request response
      return res
        .status(400)
        .json({
          message:
            "This email is already registered. Please try a different email address.",
        });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // If user creation is successful, send the verification email
    if (newUser) {
      await sendVerifyEmail(name, email, newUser._id);
      res.status(200).json({ success: "Otp sent successfully!" });
      console.log("Otp sent successfully");
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    // Send a generic error message
    res.status(500).json({ message: "User creation failed" });
  }
});

module.exports = registerUser;
