const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");

const sendEmail = asyncHandler(async (to, subject, html) => {
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
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailData);
});

const sendVerifyEmail = asyncHandler(async (name, email, userId) => {
  const html =
    `<p>Hi ${name}, Please click here to ` +
    `<a href="http://localhost:3000/user/verify?id=${userId}">Verify</a> your email.</p>`;
  await sendEmail(email, "Email Verification", html);
});

const sendResetLink = asyncHandler(async (name, email, token) => {
  const html =
    `<p>Hi ${name}, Please click here to ` +
    `<a href="http://localhost:3000/user/forget-pass?token=${token}">Reset</a> your password.</p>`;
  await sendEmail(email, "Password Reset", html);
});

//GET -> /user/verify
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
  res.status(200).json({ users });
});

//POST -> /user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists with this email id");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    try {
      // Send the verification email
      await sendVerifyEmail(name, email, newUser._id);
      console.log("New user created, verification email sent", newUser);
      res
        .status(201)
        .json({
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
      res
        .status(500)
        .json({
          message: "User created but email sending failed, user deleted",
        });
    }
  } else {
    res.status(500).json({ message: "User creation failed" });
  }
});

//POST -> /user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("User not registered");
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      res.status(401);
      throw new Error("Login credentials are incorrect");
    }

    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          user_id: user.id,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({ message: "Logged In", accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST -> /user/forget
const verifyForget = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User email is incorrect" });
  }

  if (!user.isVerified) {
    return res.status(400).json({ message: "Please verify your email" });
  }

  const token = randomString.generate();

  await User.updateOne({ email }, { $set: { token } });

  await sendResetLink(user.name, user.email, token);

  res.json({ message: "Check your email to reset password" });
});

//POST -> /user/set-forget-pass/:user_id
const setForgetpass = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { user_id } = req.params;

  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedPassword = await User.findByIdAndUpdate(
    user_id,
    { $set: { password: hashedPassword, token: "" } },
    { new: true }
  );

  if (!updatedPassword) {
    throw new Error("Password not updated");
  }

  res.status(200).json({ success: "Password changed successfully!" });
});

module.exports = {
  getAllUsers,
  registerUser,
  verifyEmail,
  loginUser,
  verifyForget,
  setForgetpass,
};
