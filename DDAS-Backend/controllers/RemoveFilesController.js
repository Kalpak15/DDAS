

const Team = require('../models/TeamSchema');
const FileDownload = require('../models/FileDownloadModel'); // Import the FileDownload model
const fs = require('fs').promises;
const path = require('path');

const removeFile = async (req, res) => {
  try {
    const { teamId, fileId } = req.params;
    const userId = req.user.userId; // From auth middleware (JWT)
    console.log('Remove file request initiated:', {
      teamId,
      fileId,
      userIdFromToken: userId,
      token: req.header('Authorization')?.replace('Bearer ', '')
    });

    // Find the team and explicitly select createdBy to ensure it’s populated
    const team = await Team.findById(teamId).select('createdBy files');
    if (!team) {
      console.log('Team not found:', teamId);
      return res.status(404).json({ message: 'Team not found' });
    }
    console.log('Team retrieved:', {
      teamId: team._id,
      createdBy: team.createdBy ? team.createdBy.toString() : 'undefined',
      fileCount: team.files.length
    });

    // Check if the user is the creator (admin)
    const isAdmin = team.createdBy && team.createdBy.toString() === userId;
    console.log('Permission check:', {
      userId,
      createdBy: team.createdBy ? team.createdBy.toString() : 'undefined',
      isAdmin
    });
    if (!isAdmin) {
      console.log('Permission denied: User is not the team creator');
      return res.status(403).json({ message: 'Only the team creator can remove files' });
    }

    // Find the file in the team's files array
    const file = team.files.find((f) => f._id && f._id.toString() === fileId);
    if (!file) {
      console.log('File not found in team:', { fileId, teamId });
      return res.status(404).json({ message: 'File not found' });
    }
    console.log('File found:', { fileId, fileName: file.name, filePath: file.path });

    // Remove the file from the team's files array
    team.files = team.files.filter((f) => f._id.toString() !== fileId);
    console.log('File removed from team array, remaining files:', team.files.length);

    // Delete the file entries from the filedownloads collection
    const deleteResult = await FileDownload.deleteMany({
      filePath: file.path, // Match the filePath in filedownloads with file.path from team.files
      teamId: teamId // Ensure it belongs to the correct team
    });
    console.log('File entries deleted from filedownloads:', {
      filePath: file.path,
      teamId,
      deletedCount: deleteResult.deletedCount
    });

    // Delete the file from storage
    const filePath = path.join(__dirname, '../Uploads', file.path);
    try {
      await fs.access(filePath); // Check if file exists before deletion
      await fs.unlink(filePath);
      console.log('File deleted from storage:', filePath);
    } catch (err) {
      console.error('Error deleting file from storage or file not found:', {
        error: err.message,
        filePath
      });
    }

    // Save the updated team with validation
    const savedTeam = await team.save({ validateBeforeSave: true });
    console.log('Team updated successfully:', { teamId, updatedFilesCount: savedTeam.files.length });

    return res.status(200).json({ message: 'File removed successfully' });
  } catch (error) {
    console.error('Unexpected error in removeFile:', {
      error: error.message,
      stack: error.stack
    });
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { removeFile };