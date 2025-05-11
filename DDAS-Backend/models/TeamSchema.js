// const mongoose = require('mongoose');

// const teamSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     default: 'Default Team',
//   },
//   members: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   ],
//   password: {
//     type: String,
//     required: true, // Ensures a password is always set
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// teamSchema.index({ name: 1, createdBy: 1 }, { unique: true }); // Prevent duplicate team names per creator

// // Update `updatedAt` timestamp on save
// teamSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model('Team', teamSchema);


const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'Default Team',
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  password: {
    type: String,
    required: true, // Ensures a password is always set
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  files: [
    {
      name: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      hash: { type: String, required: true },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
      downloadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    },
  ],
});

teamSchema.index({ name: 1, createdBy: 1 }, { unique: true }); // Prevent duplicate team names per creator

// Update `updatedAt` timestamp on save
teamSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Team', teamSchema);