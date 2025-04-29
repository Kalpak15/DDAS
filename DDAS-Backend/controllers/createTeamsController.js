// // routes/teams.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const User = require('../models/UserModel'); // Your User model
// const Team = require('../models/TeamSchema'); // Your Team model


// // Create a team
// const createTeams = async (req, res) => {
//   const { teamName, memberEmails } = req.body;
//   // const { userId } = req.params;
//   try {

//     console.log('Request body:', req.body); // Log incoming data
//     console.log('Authenticated user:', req.user.useId); // Log authenticated user
//     // Verify all emails exist in the database
//     const users = await User.find({ email: { $in: memberEmails } });
//     if (users.length !== memberEmails.length) {
//       return res.status(400).json({ message: 'One or more emails not found' });
//     }

//     // Include the creator in the team
//     const creator = await User.findById(req.userId);
//     if (!creator) {
//       return res.status(400).json({ message: 'Creator not found' });
//     }

//     // Create the team
//     const team = new Team({
//       name: teamName,
//       members: [...users.map((u) => u._id), creator._id],
//       createdBy: req.userId,
//     });

//     await team.save();
//     res.status(200).json({ message: 'Team created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }

// };

// module.exports = {createTeams};



const express = require('express');
const User = require('../models/UserModel');
const Team = require('../models/TeamSchema');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateRandomPassword(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Create a team
const createTeams = async (req, res) => {
  const { teamName, memberEmails } = req.body;

  try {
    console.log('Request body:', req.body);
    console.log('Authenticated user:', req.user);

    if (!Array.isArray(memberEmails) || memberEmails.length === 0) {
      return res.status(400).json({ message: 'memberEmails must be a non-empty array' });
    }

    const users = await User.find({ email: { $in: memberEmails.map(email => email.trim()) } });
    if (users.length !== memberEmails.length) {
      return res.status(400).json({ message: 'One or more emails not found' });
    }

    const creator = await User.findById(req.user.userId);
    if (!creator) {
      return res.status(400).json({ message: 'Creator not found' });
    }


    const teamPassword = generateRandomPassword();
    

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(teamPassword, saltRounds);

    const team = new Team({
      name: teamName || 'Default Team',
      members: [creator._id], // Start with creator only
      createdBy: req.user.userId,
      password: hashedPassword, // Store the generated password
    });

    await team.save();

    // Send password to members
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: memberEmails.join(','),
      subject: 'Team Invitation',
      text: `You have been invited to join the team "${teamName || 'Default Team'}". Use this password to join: ${teamPassword}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Team created successfully, password sent to members' });
  } catch (error) {
    console.error('Error creating team:', error);
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ message: 'A team with this name already exists for the creator' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Join a team
const joinTeam = async (req, res) => {
  const { teamName, password } = req.body;
  const userId = req.user.userId;

  try {
    const team = await Team.findOne({ name: teamName });
    if (!team) {
      return res.status(400).json({ message: 'Team not found' });
    }
    

    const isPasswordMatch = await bcrypt.compare(password, team.password);
        if (!isPasswordMatch) {
          return res.status(400).json({ message: "Invalid email or password." });
    }

    // if (team.password !== password) {
    //   return res.status(400).json({ message: 'Incorrect password' });
    // }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();
    }

    res.status(200).json({ message: 'Successfully joined the team' });
  } catch (error) {
    console.error('Error joining team:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const getMyTeams = async (req, res) => {
  try {
    const userId = req.user.userId;
    const teams = await Team.find({ members: userId })
      .populate('members', 'email')
      .populate('createdBy', 'email');
    res.status(200).json({ teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTeams, joinTeam, getMyTeams };