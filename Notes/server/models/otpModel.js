const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  phoneNo: {
    type: Number,
  },
  otp: {
    type: String,
    default:null
  },
  otpExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("otp", otpSchema);
