const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  filename: String,
  size: Number,
  checksum: String,
  downloadedBy: String,
  downloadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Download", downloadSchema);
