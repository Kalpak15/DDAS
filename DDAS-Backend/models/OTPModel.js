const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: '5m' } },
  signupData: { type: Object, required: true }, // Store all signup data temporarily
});

module.exports = mongoose.model('OTP', otpSchema);