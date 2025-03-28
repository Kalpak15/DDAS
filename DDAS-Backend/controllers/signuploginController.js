const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const cloudinary=require('../config/cloudinary')
const nodemailer = require('nodemailer');
const User = require('../models/UserModel');
const OTP = require('../models/OTPModel');
const fs=require('fs')



require('dotenv').config(

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, //jyachkade janar
    pass: process.env.EMAIL_PASS, //jo pathavnar
  },
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Step 1: Signup with OTP request
const signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
    age,
    gender,
    countryCode,
    phoneNumber,
    address,
  } = req.body;

  // Basic validation for all required fields
  if (  email || password ||  confirmPassword || firstName || middleName || lastName ||   age||  gender ||  countryCode || phoneNumber || address) {
    return res.status(400).json({ success: false, message: 'All required fields must be provided' });
  }
  
//   if (!formData.profilePicture) {
//     alert('Please select a profile picture');
//     return;
// }
  // Check if password matches confirmPassword
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Password and Confirm Password do not match' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    
    // let profilePicture = null;
    
    // if (req.file) {
    //   console.log('File:', req.file)
    //   const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "profile_pictures",
    //   });
    //   profilePicture = {
    //     url: uploadResult.secure_url,
    //     publicId: uploadResult.public_id,
    //   };
    //   fs.unlinkSync(req.file.path);
    // }
    
    let profilePicture = null;
    if (req.file) {
      console.log('Uploading to Cloudinary:', req.file.path);
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'profile_pictures',
        });
        console.log('Cloudinary Upload Result:', uploadResult);
        profilePicture = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };
        fs.unlinkSync(req.file.path); // Clean up the temporary file
      } catch (uploadError) {
        console.error('Cloudinary Upload Error:', uploadError);
        return res.status(500).json({ success: false, message: 'Failed to upload profile picture to Cloudinary' });
      }
    } else {
      console.log('No file uploaded, proceeding without profile picture');
    }
    

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP and all signup data temporarily in OTP collection
    await OTP.findOneAndUpdate(
      { email },
      {
        otp,
        expiresAt,
        signupData: {
          email,
          password, // Stored unhashed temporarily
          firstName,
          middleName,
          lastName,
          age,
          gender,
          countryCode,
          phoneNumber,
          address,
          profilePicture,
          role: role || 'user',
        },
      },
      { upsert: true, new: true }
    );
    
    

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Signup OTP',
      text: `Your OTP for signup is ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'OTP sent to your email', email });
  } catch (error) {
    console.error('Error in signupRequestOTP:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Step 2: Verify OTP and complete signup
const verifySignupOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email)
  console.log(otp)
  // Basic validation
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    // Check OTP
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Extract signup data from OTP record
    const { signupData } = otpRecord;

    // Check if user already exists (double-check)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(signupData.password, salt);

    // Create new user
    const user = new User({
      email: signupData.email,
      password: hashedPassword,
      firstName: signupData.firstName,
      middleName: signupData.middleName,
      lastName: signupData.lastName,
      age: signupData.age,
      gender: signupData.gender,
      countryCode: signupData.countryCode,
      phoneNumber: signupData.phoneNumber,
      address: signupData.address,
      profilePicture :signupData.profilePicture?.url,
      role: signupData.role,
    });
    console.log(user)
    await user.save();

    // Delete OTP record
    await OTP.deleteOne({ email });

    res.status(201).json({ success: true, message: 'Signup completed successfully' });
  } catch (error) {
    console.error('Error in verifySignupOTP:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.firstName + " " + user.lastName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );
    
    
    res.status(200).json({
      message: "Login successful.",
      userId: user._id,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};


module.exports = { signup, verifySignupOTP,login,changePassword};





// $2b$10$FJ6ACpprvKlRru3DzerkG.hafNf/6f.sBdznxeHDlFF6F6CA0rZX6
