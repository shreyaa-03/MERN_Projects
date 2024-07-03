const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

//POST -> /user/set-forget-pass/:user_id
const setForgetPassword = asyncHandler(async (req, res) => {
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


module.exports = setForgetPassword