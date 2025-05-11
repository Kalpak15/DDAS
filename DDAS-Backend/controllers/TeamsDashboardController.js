const Team = require('../models/TeamSchema'); // Adjust path to your Team model
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const FileDownload = require('../models/FileDownloadModel')
const crypto = require('crypto');
const mammoth = require('mammoth');
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

// 1st write
// Upload File (Admin Only)
// const uploadFile = async (req, res) => {
//   try {
//     const teamId = req.params.teamId;
//     const userId = req.user.userId;

//     const team = await Team.findById(teamId);
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }

//     if (team.createdBy.toString() !== userId) {
//       return res.status(403).json({ message: 'Only the team admin can upload files' });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const file = {
//       name: req.file.originalname,
//       path: req.file.path,
//       uploadedAt: new Date(),
//     };

//     team.files.push(file);
//     await team.save();

//     res.status(200).json({ file });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.alotofstatus(500).json({ message: 'Server error', error: error.message });
//   }
// };



// const computeFileHash = (filePath) => {
//   return new Promise((resolve, reject) => {
//     if (!fs.existsSync(filePath)) {
//       return reject(new Error(`File not found at path: ${filePath}`));
//     }
//     const hash = crypto.createHash('sha256');
//     const stream = fs.createReadStream(filePath);
//     stream.on('data', (data) => hash.update(data));
//     stream.on('end', () => resolve(hash.digest('hex')));
//     stream.on('error', (err) => reject(err));
//   });
// };



// 2nd correct
// const uploadFile = async (req, res) => {
//   try {
//     console.log('Uploaded file:', req.file); // Debug log
//     const teamId = req.params.teamId;
//     const userId = req.user.userId;
//     const file = req.file; // Assuming multer is used for file uploads

//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Validate teamId
//     if (!mongoose.Types.ObjectId.isValid(teamId)) {
//       console.log('Invalid teamId:', teamId);
//       if (fs.existsSync(file.path)) {
//         fs.unlinkSync(file.path); // Clean up
//       }
//       return res.status(400).json({ message: 'Invalid teamId' });
//     }

//     // Compute file hash
//     let fileHash;
//     try {
//       fileHash = await computeFileHash(file.path);
//       console.log('Computed file hash:', fileHash);
//     } catch (error) {
//       console.error('Failed to compute hash:', error.message);
//       if (fs.existsSync(file.path)) {
//         fs.unlinkSync(file.path); // Clean up
//       }
//       return res.status(500).json({ message: 'Failed to compute file hash', error: error.message });
//     }

//     // Check if a file with the same hash exists in the team
//     const team = await Team.findById(teamId);
//     if (!team) {
//       if (fs.existsSync(file.path)) {
//         fs.unlinkSync(file.path); // Clean up
//       }
//       return res.status(404).json({ message: 'Team not found' });
//     }

//     const existingFile = team.files.find((f) => f.hash && f.hash === fileHash);
//     if (existingFile) {
//       // Delete the uploaded file since it's a duplicate
//       if (fs.existsSync(file.path)) {
//         fs.unlinkSync(file.path);
//       }
//       return res.status(409).json({
//         message: `A file with the same content already exists: ${existingFile.name}`,
//         existingFile: {
//           id: existingFile._id,
//           name: existingFile.name,
//         },
//       });
//     }

//     // Proceed with saving the file
//     const newFile = {
//       name: file.originalname,
//       path: file.path,
//       hash: fileHash,
//       uploadedAt: new Date(),
//     };

//     team.files.push(newFile);
//     await team.save();

//     res.status(201).json({
//       message: 'File uploaded successfully',
//       file: newFile,
//     });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     if (fs.existsSync(req.file?.path)) {
//       fs.unlinkSync(req.file.path); // Clean up on error
//     }
//     res.status(500).json({ message: 'Failed to upload file', error: error.message });
//   }
// };





// 2nd correct
const computeFileHash = async (filePath) => {
  try {
    const ext = filePath.split('.').pop().toLowerCase();
    if (ext === 'docx') {
      // Extract text from .docx file
      const result = await mammoth.extractRawText({ path: filePath });
      const text = result.value;
      const hash = crypto.createHash('sha256');
      hash.update(text);
      return hash.digest('hex');
    } else {
      // Hash the raw file for other formats
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
          return reject(new Error(`File not found at path: ${filePath}`));
        }
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (err) => reject(err));
      });
    }
  } catch (error) {
    throw new Error(`Failed to compute hash: ${error.message}`);
  }
};

const uploadFile = async (req, res) => {
  try {
    console.log('Uploaded file:', req.file); // Debug log
    const teamId = req.params.teamId;
    const userId = req.user.userId;
    const file = req.file; // Assuming multer is used

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Validate teamId
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
      console.log('Invalid teamId:', teamId);
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return res.status(400).json({ message: 'Invalid teamId' });
    }

    // Normalize file path
    const normalizedPath = path.normalize(file.path);
    console.log('Normalized file path:', normalizedPath);

    // Compute file hash
    let fileHash;
    try {
      fileHash = await computeFileHash(normalizedPath);
      console.log('Computed file hash:', fileHash);
    } catch (error) {
      console.error('Failed to compute hash:', error.message);
      if (fs.existsSync(normalizedPath)) {
        fs.unlinkSync(normalizedPath);
      }
      return res.status(500).json({ message: 'Failed to compute file hash', error: error.message });
    }

    // Check if a file with the same hash exists in the team
    const team = await Team.findById(teamId);
    if (!team) {
      if (fs.existsSync(normalizedPath)) {
        fs.unlinkSync(normalizedPath);
      }
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check for duplicates, computing hashes for files without them
    let existingFile = null;
    for (const f of team.files) {
      if (f.hash && f.hash === fileHash) {
        existingFile = f;
        break;
      }
      if (!f.hash && fs.existsSync(f.path)) {
        try {
          const existingHash = await computeFileHash(f.path);
          if (existingHash === fileHash) {
            f.hash = existingHash; // Update hash in database
            existingFile = f;
            break;
          }
        } catch (error) {
          console.error(`Failed to compute hash for existing file ${f.name}:`, error.message);
        }
      }
    }

    if (existingFile) {
      if (fs.existsSync(normalizedPath)) {
        fs.unlinkSync(normalizedPath);
      }
      return res.status(409).json({
        message: `A file with the same content already exists: ${existingFile.name}`,
        existingFile: {
          id: existingFile._id,
          name: existingFile.name,
        },
      });
    }

    // Proceed with saving the file
    const newFile = {
      name: file.originalname,
      path: normalizedPath,
      hash: fileHash,
      uploadedAt: new Date(),
    };

    team.files.push(newFile);
    await team.save({ validateBeforeSave: true });
    console.log('File saved successfully:', newFile);

    res.status(201).json({
      message: 'File uploaded successfully',
      file: newFile,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    if (fs.existsSync(req.file?.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Failed to upload file', error: error.message });
  }
};



// 1st correct
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

//     // Determine file type based on extension
//     const fileExtension = path.extname(file.name).toLowerCase().replace('.', '');
//     const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
//     const isImage = imageExtensions.includes(fileExtension);
//     const resourceType = isImage ? 'image' : 'raw';
//     console.log('File extension:', fileExtension, 'Is image:', isImage, 'Resource type:', resourceType);

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
//             resource_type: resourceType,
//             public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`,
//             overwrite: true,
//           });
//           cloudinaryUrl = uploadResult.secure_url;
//           existingDownload.cloudinaryUrl = cloudinaryUrl;
//           await existingDownload.save();
//           console.log('Re-uploaded to Cloudinary:', cloudinaryUrl);

//           // Delete local file after successful upload
//           try {
//             fs.unlinkSync(filePath);
//             console.log('Deleted local file after re-upload:', filePath);
//           } catch (deleteError) {
//             console.error('Failed to delete local file after re-upload:', deleteError);
//           }
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
//         resource_type: resourceType,
//         public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`,
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

//     // Stream the file for download, then delete it
//     res.set({
//       'Content-Type': 'application/octet-stream',
//       'Content-Disposition': `attachment; filename="${file.name}"`,
//     });

//     const readStream = fs.createReadStream(filePath);
//     readStream.pipe(res);

//     // Delete the file after streaming is complete
//     readStream.on('end', () => {
//       fs.unlink(filePath, (deleteError) => {
//         if (deleteError) {
//           console.error('Failed to delete local file after streaming:', deleteError);
//         } else {
//           console.log('Deleted local file after streaming:', filePath);
//         }
//       });
//     });

//     readStream.on('error', (streamError) => {
//       console.error('Error streaming file:', streamError);
//       res.status(500).json({ message: 'Error streaming file', error: streamError.message });
//     });
//   } catch (error) {
//     console.error('Error serving file:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };






// 2nd corrcet
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
//     console.log('File found:', { fileId, fileName: file.name, filePath: file.path, fileHash: file.hash });

//     // Compute file hash if not already stored
//     let fileHash = file.hash;
//     if (!fileHash) {
//       fileHash = await computeFileHash(file.path);
//       file.hash = fileHash;
//       await team.save();
//       console.log('Computed and saved file hash:', fileHash);
//     }

//     // Determine file type based on extension
//     const fileExtension = path.extname(file.name).toLowerCase().replace('.', '');
//     const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
//     const isImage = imageExtensions.includes(fileExtension);
//     const resourceType = isImage ? 'image' : 'raw';
//     console.log('File extension:', fileExtension, 'Is image:', isImage, 'Resource type:', resourceType);

//     // Check if the file has been downloaded by anyone in the team (based on hash)
//     const existingDownload = await FileDownload.findOne({
//       teamId,
//       hash: fileHash,
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
//             resource_type: resourceType,
//             public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`,
//             overwrite: true,
//           });
//           cloudinaryUrl = uploadResult.secure_url;
//           existingDownload.cloudinaryUrl = cloudinaryUrl;
//           await existingDownload.save();
//           console.log('Re-uploaded to Cloudinary:', cloudinaryUrl);

//           // Delete local file after successful upload
//           try {
//             fs.unlinkSync(filePath);
//             console.log('Deleted local file after re-upload:', filePath);
//           } catch (deleteError) {
//             console.error('Failed to delete local file after re-upload:', deleteError);
//           }
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
//         resource_type: resourceType,
//         public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`,
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
//         hash: fileHash,
//         uploadedAt: new Date(),
//         downloadedBy: userId,
//       });
//     }
//     await team.save({ validateBeforeSave: true });
//     console.log('Updated team.files with downloadedBy:', { fileId, fileName: file.name, fileHash });

//     // Record download in FileDownload collection
//     const fileDownload = new FileDownload({
//       fileName: file.name,
//       filePath: file.path,
//       hash: fileHash,
//       teamId,
//       downloadedBy: userId,
//       cloudinaryUrl,
//     });
//     await fileDownload.save();
//     console.log('Download recorded:', { fileName: file.name, hash: fileHash, teamId });

//     // Stream the file for download, then delete it
//     res.set({
//       'Content-Type': 'application/octet-stream',
//       'Content-Disposition': `attachment; filename="${file.name}"`,
//     });

//     const readStream = fs.createReadStream(filePath);
//     readStream.pipe(res);

//     // Delete the file after streaming is complete
//     readStream.on('end', () => {
//       fs.unlink(filePath, (deleteError) => {
//         if (deleteError) {
//           console.error('Failed to delete local file after streaming:', deleteError);
//         } else {
//           console.log('Deleted local file after streaming:', filePath);
//         }
//       });
//     });

//     readStream.on('error', (streamError) => {
//       console.error('Error streaming file:', streamError);
//       res.status(500).json({ message: 'Error streaming file', error: streamError.message });
//     });
//   } catch (error) {
//     console.error('Error serving file:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };




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
    console.log('File found:', { fileId, fileName: file.name, filePath: file.path, fileHash: file.hash });

    // Compute file hash if not already stored
    let fileHash = file.hash;
    if (!fileHash) {
      try {
        fileHash = await computeFileHash(file.path);
        file.hash = fileHash;
        await team.save({ validateBeforeSave: true });
        console.log('Computed and saved file hash:', fileHash);
      } catch (error) {
        console.error('Failed to compute hash:', error.message);
        return res.status(500).json({ message: 'Failed to compute file hash', error: error.message });
      }
    }

    // Determine file type based on extension
    const fileExtension = path.extname(file.name).toLowerCase().replace('.', '');
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
    const isImage = imageExtensions.includes(fileExtension);
    const resourceType = isImage ? 'image' : 'raw';
    console.log('File extension:', fileExtension, 'Is image:', isImage, 'Resource type:', resourceType);

    // Check if the file has been downloaded by anyone in the team (based on hash)
    const existingDownload = fileHash
      ? await FileDownload.findOne({
          teamId,
          hash: fileHash,
        }).populate('downloadedBy', 'email')
      : null;
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
            resource_type: resourceType,
            public_id: `profile_pictures/teams/${teamId}/${fileId}/${file.name}`,
            overwrite: true,
          });
          cloudinaryUrl = uploadResult.secure_url;
          existingDownload.cloudinaryUrl = cloudinaryUrl;
          existingDownload.hash = fileHash;
          await existingDownload.save();
          console.log('Re-uploaded to Cloudinary:', cloudinaryUrl);

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

    // Upload to Cloudinary
    let cloudinaryUrl;
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: resourceType,
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
      existingFileInTeam.hash = fileHash;
    } else {
      team.files.push({
        name: file.name,
        path: file.path,
        hash: fileHash,
        uploadedAt: new Date(),
        downloadedBy: userId,
      });
    }
    await team.save({ validateBeforeSave: true });
    console.log('Updated team.files with downloadedBy:', { fileId, fileName: file.name, fileHash });

    // Record download in FileDownload collection
    const fileDownload = new FileDownload({
      fileName: file.name,
      filePath: file.path,
      hash: fileHash,
      teamId,
      downloadedBy: userId,
      cloudinaryUrl,
    });
    await fileDownload.save();
    console.log('Download recorded:', { fileName: file.name, hash: fileHash, teamId });

    // Stream the file for download, then delete it
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.name}"`,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

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