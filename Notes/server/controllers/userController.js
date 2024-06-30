const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

//POST -> /user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401);
      throw new Error("User not registered");
    }

    if (!user.isVerified) {
      res.status(401).json({ message: "Email not verified" });
      return;
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

const sendResetLink = asyncHandler(async (name, email, token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //gmail smtp uses 587 port for TLS/STARTTLS connections.
    secure: false,
    requireTLS: true, // ensure that the connection is encrypted.
    auth: {
      user: "shreyashedge490@gmail.com",
      pass: "ufpo xicm buco fzkz",
    },
  });
  const mailData = {
    from: "shreyashedge490@gmail.com",
    to: email,
    subject: "For reset password",
    html:
      "<p>Hii " +
      name +
      ', Please click here to <a href="http://localhost:3000/user/forget-pass?token=' +
      token +
      ' "> to Reset </a> your password. </p>',
  };
  transporter.sendMail(mailData, (err) => {
    if (err) console.log(err);
    else console.log("email has been sent: ", info.response);
  });
});

//POST -> /user/forget
const verifyForget = asyncHandler(async (req, res) => {
  const { email } = req.body
  console.log(email)
  const user = await User.findOne({ email: email })
  if (user) {
    if (user.isVerified === 0) {
      res.render('forget', {message: 'Please verify your email'})
    } else {
    const token = randomString.generate()
      const updated = await User.updateOne({ email: email }, { $set: { token: token } })
      sendResetLink(user.name, user.email, token)
      res.render('forget',{message: 'Check your email to reset password'})
    }
  } else {
    res.render('forget',{message: 'User email is incorrect'})
  }
})


module.exports = { getAllUsers, registerUser, verifyEmail, loginUser, verifyForget };
