const Team = require('../models/TeamSchema'); // Adjust path to your Team model
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
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


// It the whole who is
// const downloadFile = async (req, res) => {
//   try {
//     const teamId = req.params.teamId;
//     const fileId = req.params.fileId;
//     const userId = req.user.userId;
//     console.log('Download request:', { teamId, fileId, userId });

//     // Validate ObjectIDs
//     if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(fileId)) {
//       console.log('Invalid ID format:', { teamId, fileId });
//       return res.status(400).json({ message: 'Invalid teamId or fileId' });
//     }

//     // Find the team
//     const team = await Team.findById(teamId).populate('files.downloadedBy', 'email');
//     if (!team) {
//       console.log('Team not found:', teamId);
//       return res.status(404).json({ message: 'Team not found' });
//     }
//     console.log('Team found:', team._id);

//     const file = team.files.id(fileId);
//     if (!file) {
//       console.log('File not found:', fileId);
//       return res.status(404).json({ message: 'File not found' });
//     }
//     console.log('File found:', { fileId, fileName: file.name, filePath: file.path });

//     // Check if the file has been downloaded by anyone in the team
//     const existingDownload = await FileDownload.findOne({
//       teamId,
//       fileName: file.name,
//     }).populate('downloadedBy', 'email');
//     console.log('Existing download record:', existingDownload);

//     if (existingDownload) {
//       const downloaderEmail = existingDownload.downloadedBy
//         ? existingDownload.downloadedBy.email
//         : 'an unknown user';
//       const message = `This file has already been downloaded by ${downloaderEmail}.`;
//       let cloudinaryUrl = existingDownload.cloudinaryUrl;

//       if (!cloudinaryUrl) {
//         console.log('cloudinaryUrl missing, re-uploading...');
//         const filePath = file.path;
//         if (!fs.existsSync(filePath)) {
//           return res.status(404).json({ message: `File not found at path: ${filePath}` });
//         }
//         try {
//           const uploadResult = await cloudinary.uploader.upload(filePath, {
//             resource_type: 'raw',
//             public_id: `team_files/teams/${teamId}/${fileId}/${file.name}`, // Specify the folder here
//             overwrite: true,
//           });
//           cloudinaryUrl = uploadResult.secure_url;
//           existingDownload.cloudinaryUrl = cloudinaryUrl;
//           await existingDownload.save();
//           console.log('Re-uploaded to Cloudinary:', cloudinaryUrl);
//         } catch (uploadError) {
//           console.error('Cloudinary re-upload failed:', uploadError);
//           return res.status(500).json({ message: 'Failed to re-upload to Cloudinary', error: uploadError.message });
//         }
//       }

//       return res.status(403).json({
//         message,
//         fileUrl: cloudinaryUrl,
//       });
//     }

//     // File not downloaded yet, proceed with download process
//     const filePath = file.path;
//     if (!fs.existsSync(filePath)) {
//       console.log('File not found at path:', filePath);
//       return res.status(404).json({ message: `File not found at path: ${filePath}` });
//     }

//     // Upload to Cloudinary in the specified folder
//     let cloudinaryUrl;
//     try {
//       const uploadResult = await cloudinary.uploader.upload(filePath, {
//         resource_type: 'raw',
//         public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`, // Specify the folder here
//         overwrite: true,
//       });
//       cloudinaryUrl = uploadResult.secure_url;
//       console.log('Uploaded to Cloudinary:', cloudinaryUrl);
//     } catch (uploadError) {
//       console.error('Cloudinary upload failed:', uploadError);
//       return res.status(500).json({ message: 'Failed to upload to Cloudinary', error: uploadError.message });
//     }

//     // Update team.files with downloadedBy
//     const existingFileInTeam = team.files.find((f) => f._id && f._id.toString() === fileId);
//     if (existingFileInTeam) {
//       existingFileInTeam.downloadedBy = userId;
//     } else {
//       team.files.push({
//         name: file.name,
//         path: file.path,
//         uploadedAt: new Date(),
//         downloadedBy: userId,
//       });
//     }
//     await team.save({ validateBeforeSave: true });
//     console.log('Updated team.files with downloadedBy:', { fileId, fileName: file.name });

//     // Record download in FileDownload collection
//     const fileDownload = new FileDownload({
//       fileName: file.name,
//       filePath: file.path,
//       teamId,
//       downloadedBy: userId,
//       cloudinaryUrl,
//     });
//     await fileDownload.save();
//     console.log('Download recorded:', { fileName: file.name, teamId });

//     // Stream the file for download
//     res.set({
//       'Content-Type': 'application/octet-stream',
//       'Content-Disposition': `attachment; filename="${file.name}"`,
//     });
//     fs.createReadStream(filePath).pipe(res);
//   } catch (error) {
//     console.error('Error serving file:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = { downloadFile };





const downloadFile = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const fileId = req.params.fileId;
    const userId = req.user.userId;
    console.log('Download request:', { teamId, fileId, userId });

    // Validate ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(fileId)) {
      console.log('Invalid ID format:', { teamId, fileId });
      return res.status(400).json({ message: 'Invalid teamId or fileId' });
    }

    // Find the team
    const team = await Team.findById(teamId).populate('files.downloadedBy', 'email');
    if (!team) {
      console.log('Team not found:', teamId);
      return res.status(404).json({ message: 'Team not found' });
    }
    console.log('Team found:', team._id);

    const file = team.files.id(fileId);
    if (!file) {
      console.log('File not found:', fileId);
      return res.status(404).json({ message: 'File not found' });
    }
    console.log('File found:', { fileId, fileName: file.name, filePath: file.path });

    // Determine file type based on extension
    const fileExtension = path.extname(file.name).toLowerCase().replace('.', '');
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
    const isImage = imageExtensions.includes(fileExtension);
    const resourceType = isImage ? 'image' : 'raw';
    console.log('File extension:', fileExtension, 'Is image:', isImage, 'Resource type:', resourceType);

    // Check if the file has been downloaded by anyone in the team
    const existingDownload = await FileDownload.findOne({
      teamId,
      fileName: file.name,
    }).populate('downloadedBy', 'email');
    console.log('Existing download record:', existingDownload);

    if (existingDownload) {
      const downloaderEmail = existingDownload.downloadedBy
        ? existingDownload.downloadedBy.email
        : 'an unknown user';
      const message = `This file has already been downloaded by ${downloaderEmail}.`;
      let cloudinaryUrl = existingDownload.cloudinaryUrl;

      if (!cloudinaryUrl) {
        console.log('cloudinaryUrl missing, re-uploading...');
        const filePath = file.path;
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ message: `File not found at path: ${filePath}` });
        }
        try {
          const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: resourceType, // Dynamically set resource type
            public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`,
            overwrite: true,
          });
          cloudinaryUrl = uploadResult.secure_url;
          existingDownload.cloudinaryUrl = cloudinaryUrl;
          await existingDownload.save();
          console.log('Re-uploaded to Cloudinary:', cloudinaryUrl);

          // Delete local file after successful upload (no streaming needed here)
          try {
            fs.unlinkSync(filePath);
            console.log('Deleted local file after re-upload:', filePath);
          } catch (deleteError) {
            console.error('Failed to delete local file after re-upload:', deleteError);
          }
        } catch (uploadError) {
          console.error('Cloudinary re-upload failed:', uploadError);
          return res.status(500).json({ message: 'Failed to re-upload to Cloudinary', error: uploadError.message });
        }
      }

      return res.status(403).json({
        message,
        fileUrl: cloudinaryUrl,
      });
    }

    // File not downloaded yet, proceed with download process
    const filePath = file.path;
    if (!fs.existsSync(filePath)) {
      console.log('File not found at path:', filePath);
      return res.status(404).json({ message: `File not found at path: ${filePath}` });
    }

    // Upload to Cloudinary in the specified folder
    let cloudinaryUrl;
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: resourceType, // Dynamically set resource type
        public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`,
        overwrite: true,
      });
      cloudinaryUrl = uploadResult.secure_url;
      console.log('Uploaded to Cloudinary:', cloudinaryUrl);
    } catch (uploadError) {
      console.error('Cloudinary upload failed:', uploadError);
      return res.status(500).json({ message: 'Failed to upload to Cloudinary', error: uploadError.message });
    }

    // Update team.files with downloadedBy
    const existingFileInTeam = team.files.find((f) => f._id && f._id.toString() === fileId);
    if (existingFileInTeam) {
      existingFileInTeam.downloadedBy = userId;
    } else {
      team.files.push({
        name: file.name,
        path: file.path,
        uploadedAt: new Date(),
        downloadedBy: userId,
      });
    }
    await team.save({ validateBeforeSave: true });
    console.log('Updated team.files with downloadedBy:', { fileId, fileName: file.name });

    // Record download in FileDownload collection
    const fileDownload = new FileDownload({
      fileName: file.name,
      filePath: file.path,
      teamId,
      downloadedBy: userId,
      cloudinaryUrl,
    });
    await fileDownload.save();
    console.log('Download recorded:', { fileName: file.name, teamId });

    // Stream the file for download, then delete it
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.name}"`,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    // Delete the file after streaming is complete
    readStream.on('end', () => {
      fs.unlink(filePath, (deleteError) => {
        if (deleteError) {
          console.error('Failed to delete local file after streaming:', deleteError);
        } else {
          console.log('Deleted local file after streaming:', filePath);
        }
      });
    });

    readStream.on('error', (streamError) => {
      console.error('Error streaming file:', streamError);
      res.status(500).json({ message: 'Error streaming file', error: streamError.message });
    });
  } catch (error) {
    console.error('Error serving file:', error);
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