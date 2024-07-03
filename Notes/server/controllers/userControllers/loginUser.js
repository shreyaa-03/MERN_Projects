const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = loginUser;
