// const express = require('express'); 
// const router = express.Router(); 
// const upload =require('../utils/multer')
// const authMiddleware =require('../middleware/auth-middleware')
// const { createTeams, joinTeam,getMyTeams } = require('../controllers/createTeamsController');
// const { getTeamDetails, uploadFile, downloadFile,serveFile} = require('../controllers/TeamsDashboardController');
// const { removeFile} = require('../controllers/RemoveFilesController');



// router.post('/create/:userId',authMiddleware ,createTeams);
// router.post('/join',authMiddleware ,joinTeam);
// router.get('/my-teams',authMiddleware, getMyTeams);
// router.get('/:teamId', authMiddleware, getTeamDetails);
// router.post('/:teamId/upload', authMiddleware, upload.single('file'), uploadFile);
// router.get('/:teamId/download/:fileId', authMiddleware, downloadFile);
// router.get('/files/:fileId', authMiddleware, serveFile);
// router.delete('/:teamId/files/:fileId', authMiddleware, removeFile);


// module.exports = router; 


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const upload = require('../utils/multer');
const authMiddleware = require('../middleware/auth-middleware');
const { createTeams, joinTeam, getMyTeams } = require('../controllers/createTeamsController');
const { getTeamDetails, uploadFile, downloadFile, serveFile } = require('../controllers/TeamsDashboardController');
const { removeFile } = require('../controllers/RemoveFilesController');

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.teamId)) {
        return res.status(400).json({ success: false, message: 'Invalid team ID' });
    }
    next();
};

router.post('/create/:userId', authMiddleware, createTeams);
router.post('/join', authMiddleware, joinTeam);
router.get('/my-teams', authMiddleware, getMyTeams);
router.get('/:teamId', authMiddleware, validateObjectId, getTeamDetails);
router.post('/:teamId/upload', authMiddleware, validateObjectId, upload.single('file'), uploadFile);
router.get('/:teamId/download/:fileId', authMiddleware, validateObjectId, downloadFile);
router.get('/files/:fileId', authMiddleware, serveFile);
router.delete('/:teamId/files/:fileId', authMiddleware, validateObjectId, removeFile);

module.exports = router;