const Team = require('../models/TeamSchema'); // Adjust path to your Team model
const fs = require('fs');
const path = require('path');
const FileDownload = require('../models/FileDownloadModel')
// Get Team Details
const getTeamDetails = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const userId = req.user.userId;

    const team = await Team.findById(teamId)
      .populate('createdBy', 'email')
      .populate('members', 'email')
      .populate('files.downloadedBy', 'email');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const isAdmin = team.createdBy._id.toString() === userId;
    res.status(200).json({ team, isAdmin });
  } catch (error) {
    console.error('Error fetching team details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Upload File (Admin Only)
const uploadFile = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const userId = req.user.userId;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Only the team admin can upload files' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = {
      name: req.file.originalname,
      path: req.file.path,
      uploadedAt: new Date(),
    };

    team.files.push(file);
    await team.save();

    res.status(200).json({ file });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.alotofstatus(500).json({ message: 'Server error', error: error.message });
  }
};




// All is correct

// const downloadFile = async (req, res) => {
//   try {
//     const teamId = req.params.teamId;
//     const fileId = req.params.fileId;
//     const userId = req.user.userId;

//     const team = await Team.findById(teamId).populate('files.downloadedBy', 'email');
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }

//     const file = team.files.id(fileId);
//     if (!file) {
//       return res.status(404).json({ message: 'File not found' });
//     }

//     // Check central repository for existing download
//     const existingDownload = await FileDownload.findOne({
//       teamId,
//       fileName: file.name,
//     }).populate('downloadedBy', 'email');

//     console.log('Existing download record:', existingDownload); // Debug log
//     console.log('Search criteria:', { teamId, fileName: file.name }); // Debug log

//     if (existingDownload) {
//       const fileUrl = existingDownload._id
//         ? `http://localhost:5050/v1/teams/files/${existingDownload._id}`
//         : `http://localhost:5050/v1/files/invalid`; // Fallback URL
//       console.log('Generated fileUrl:', fileUrl); // Debug log
//       const downloaderEmail = existingDownload.downloadedBy
//         ? existingDownload.downloadedBy.email
//         : 'an unknown user';
//       const message = `This file has already been downloaded by ${downloaderEmail}.`;
//       return res.status(403).json({
//         message,
//         fileUrl,
//       });
//     }

//     // Record download in central repository
//     const fileDownload = new FileDownload({
//       fileName: file.name,
//       filePath: file.path,
//       teamId,
//       downloadedBy: userId,
//     });
//     await fileDownload.save();

//     res.download(file.path, file.name);
//   } catch (error) {
//     console.error('Error downloading file:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


const downloadFile = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const fileId = req.params.fileId;
    const userId = req.user.userId;

    // Find the team and populate downloadedBy for existing files
    const team = await Team.findById(teamId).populate('files.downloadedBy', 'email');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const file = team.files.id(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
  
    // Check central repository for existing download
    const existingDownload = await FileDownload.findOne({
      teamId,
      fileName: file.name,
    }).populate('downloadedBy', 'email');

    console.log('Existing download record:', existingDownload); // Debug log
    console.log('Search criteria:', { teamId, fileName: file.name }); // Debug log

    if (existingDownload) {
      const fileUrl = existingDownload._id
        ? `http://localhost:5050/v1/teams/files/${existingDownload._id}`
        : `http://localhost:5050/v1/files/invalid`; // Fallback URL
      console.log('Generated fileUrl:', fileUrl); // Debug log
      const downloaderEmail = existingDownload.downloadedBy
        ? existingDownload.downloadedBy.email
        : 'an unknown user';
      const message = `This file has already been downloaded by ${downloaderEmail}.`;
      return res.status(403).json({
        message,
        fileUrl,
      });
    }

    // Check if the file already exists in team.files (to avoid duplicates)
    const existingFileInTeam = team.files.find((f) => f._id && f._id.toString() === fileId);
    if (!existingFileInTeam) {
      // Add the file to team.files if it’s not already present
      team.files.push({
        name: file.name,
        path: file.path,
        uploadedAt: file.uploadedAt || new Date(), // Use existing uploadedAt or current time
        downloadedBy: userId, // Record the downloader
      });
      await team.save({ validateBeforeSave: true });
      console.log('File added to team.files:', { fileId, fileName: file.name });
    } else {
      // Update downloadedBy if the file already exists
      existingFileInTeam.downloadedBy = userId;
      await team.save({ validateBeforeSave: true });
      console.log('Updated downloadedBy in team.files:', { fileId, fileName: file.name });
    }

    // Record download in central repository
    const fileDownload = new FileDownload({
      fileName: file.name,
      filePath: file.path,
      teamId,
      downloadedBy: userId,
    });
    await fileDownload.save();
    console.log('File download recorded in filedownloads:', { fileName: file.name, teamId });

    // Serve the file for download
    const filePath = path.join(__dirname, '../Uploads', file.path);
    res.download(filePath, file.name);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { downloadFile };



const serveFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const userId = req.user.userId;

    console.log('Requested fileId:', fileId); // Debug log

    const fileDownload = await FileDownload.findById(fileId).populate('downloadedBy', 'email');
    console.log('Found fileDownload:', fileDownload); // Debug log

    if (!fileDownload) {
      return res.status(404).json({ message: 'File not found in central repository', fileId });
    }

    const team = await Team.findById(fileDownload.teamId);
    if (!team || (!team.members.includes(userId) && team.createdBy.toString() !== userId)) {
      return res.status(403).json({ message: 'You do not have permission to view this file' });
    }

    const filePath = fileDownload.filePath;
    const fileName = fileDownload.fileName;

    console.log('Serving file from path:', filePath); // Debug log
    if (!fs.existsSync(filePath)) {
      console.error('File not found at path:', filePath);
      return res.status(404).json({ message: 'File not found on server', filePath });
    }

    const mime = require('mime-types');
    const mimeType = mime.lookup(fileName) || 'application/octet-stream';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', 'inline; filename="' + fileName + '"');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};







module.exports = { getTeamDetails, uploadFile, downloadFile,serveFile };