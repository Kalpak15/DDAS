const express = require('express'); 
const router = express.Router(); 
const upload =require('../utils/multer')
const { signup, verifySignupOTP,login,changePassword} = require('../controllers/signuploginController');

const {forgotPassword,verifyOTP,resetPassword,resendOTP} = require('../controllers/authController');



router.post('/signup',upload.single("profilePicture"), signup); 
// router.post('/login', login); 
router.post('/verify-otp', verifySignupOTP); 
router.post('/login', login);
router.post('/changepassword', changePassword);


router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOTP);

module.exports = router; 