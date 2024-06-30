const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const sendVerifyEmail = asyncHandler(async (name, email, userId) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_EMAIL_PASS,
    },
  });

  const mailData = {
    from: process.env.HOST_EMAIL,
    to: email,
    subject: "Email Verification",
    html:
      "<p>Hii " +
      name +
      ', Please click here to <a href="http://localhost:3000/user/verify?id=' +
      userId +
      ' "> Verify </a> your mail. </p>',
  };
  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);
    else console.log("Email has been sent", info.response);
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.query.id });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired link" });
  }

  if (user.isVerified) {
    return res.status(400).json({ error: "User already verified" });
  }

  user.isVerified = true;
  await user.save();

  res.status(200).json({ success: "Email verified successfully" });
});

//GET -> /user/
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(201).json({ users: users });
});

//POST -> /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    throw new Error("User already exists with this email id");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (newUser) {
    sendVerifyEmail(name, email, newUser._id);
  } else {
    throw new Error("Email verification failed! ");
  }
  res.status(201).json({ succes: "New user created", newUser });
});

module.exports = { getAllUsers, registerUser, verifyEmail };
