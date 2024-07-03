const getAllUsers = require("./getAllUsers");
const registerUser = require("./registerUser");
const verifyOTP = require("./verifyEmailOTP");
const loginUser = require("./loginUser");
const verifyForgetPassEmail = require("./verifyForgetPassEmail");
const setForgetpassword = require("./setForgetPassword");

module.exports = {
  getAllUsers,
  registerUser,
  verifyOTP,
  loginUser,
  verifyForgetPassEmail,
  setForgetpassword,
};

