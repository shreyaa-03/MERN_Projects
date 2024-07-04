const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const twilio = require("twilio");
const otpGenerator = require("otp-generator");

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
    `<a href="http://localhost:5173/email-verified?id=${userId}">Verify</a> your email.</p>`;
  // `<a href="http://localhost:3000/user/verify?id=${userId}">Verify</a> your email.</p>`;
  await sendEmail(email, "Email Verification", html);
});

const sendOTPEmail = asyncHandler(async (name, email, otp) => {
  const html = `<p>Hi ${name},</p><p>Your OTP code is: <strong>${otp}</strong></p>`;
  await sendEmail(email, "Email Verification OTP", html);
});

const sendResetEmail = asyncHandler(async (name, email, token) => {
  const html =
    `<p>Hi ${name}, Please click here to ` +
    `<a href="http://localhost:3000/user/verify-forget-pass?token=${token}">Reset</a> your password.</p>`;
  await sendEmail(email, "Password Reset", html);
});

const accountSid = "ACd42bc65ce7d647be94a69861d32a5d1a";
const authToekn = "";
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToekn = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NO;

const twilioClient = new twilio(accountSid, authToekn);

const sendPhoneOTP = asyncHandler(async (name, phoneNo, otp) => {
  const sendOtp = await twilioClient.messages.create({
    body: `Hi ${name}! Your otp is: ${otp}`,
    to: phoneNo,
    from: twilioPhone,
  });
  if (!sendOtp) {
    console.error("Error sending OTP:");
    throw new Error("Failed to send OTP");
  }
  console.log("OTP sent successfully");
});

module.exports = {
  sendEmail,
  sendVerifyEmail,
  sendOTPEmail,
  sendResetEmail,
  sendPhoneOTP,
};
