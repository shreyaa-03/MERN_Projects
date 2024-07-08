const getAllUsers = require("./getAllUsers");
const registerUser = require("./registerUser");
const { verifyEmailOTP } = require("./verifyEmailOTP");
const loginUser = require("./loginUser");
const verifyForgetPassEmail = require("./verifyForgetPassEmail");
const setForgetpassword = require("./setForgetPassword");
const { verifyPhoneOTP } = require("./verifyPhoneOTP");
const verifyEmail = require('./verifyEmail')

module.exports = {
  getAllUsers,
  registerUser,
  verifyEmailOTP,
  loginUser,
  verifyForgetPassEmail,
  setForgetpassword,
  verifyPhoneOTP,
  verifyEmail
};
