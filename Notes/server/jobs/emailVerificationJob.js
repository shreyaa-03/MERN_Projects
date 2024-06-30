const User = require("../models/userModel");

const emailVerificationJob = async () => {
  try {
    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    console.log("Deleted unverified users:", result.deletedCount);
  } catch (error) {
    console.error("Error deleting unverified users:", err);
  }
};

module.exports = emailVerificationJob;
