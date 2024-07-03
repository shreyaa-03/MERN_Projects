const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const randomString = require("randomstring");
const { sendResetEmail } = require("../../services/authVerifyService");

//POST -> /user/forget
const verifyForgetPassEmail = asyncHandler(async (req, res) => {
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

  await sendResetEmail(user.name, user.email, token);

  res.json({ message: "Check your email to reset password" });
});

module.exports = verifyForgetPassEmail;
