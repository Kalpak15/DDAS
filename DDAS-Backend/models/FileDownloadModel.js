const mongoose = require('mongoose');

const fileDownloadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  downloadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  downloadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FileDownload', fileDownloadSchema);