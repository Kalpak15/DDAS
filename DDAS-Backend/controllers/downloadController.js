const crypto = require("crypto");
const Download = require("../models/Download");

// Generate file hash
const getFileChecksum = (fileBuffer) => {
  return crypto.createHash("md5").update(fileBuffer).digest("hex");
};

// 🔍 Check & Record Download
const checkDownload = async (req, res) => {
  try {
    const { filename, size, user, fileBase64 } = req.body;
    const fileBuffer = Buffer.from(fileBase64, 'base64');
    const checksum = getFileChecksum(fileBuffer);

    const existing = await Download.findOne({ checksum });

    if (existing) {
      return res.status(200).json({
        message: "Duplicate file download detected!",
        duplicate: true,
        existingDownload: existing
      });
    }

    await Download.create({
      filename,
      size,
      checksum,
      downloadedBy: user
    });

    res.status(200).json({
      message: "New file download recorded.",
      duplicate: false
    });
  } catch (error) {
    console.error("Error checking download:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {checkDownload}