
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ddas = require("./routes/auth");
const downloadRoutes = require("./routes/download");
const teams = require("./routes/teams");
const Message = require("./models/MessageModel");
const sanitizeHtml = require('sanitize-html');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;
const server = http.createServer(app);

const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options('*', cors());
app.use(express.json());

const dbConnect = require("./config/Database");
dbConnect();

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

console.log('Socket.IO server initialized');

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinTeam', async ({ teamId, token }) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log('Decoded JWT:', decoded);

            if (!mongoose.Types.ObjectId.isValid(teamId)) {
                socket.emit('error', 'Invalid team ID');
                return;
            }

            const isMember = await mongoose.model('Team').findOne({
                _id: teamId,
                members: decoded.userId
            });
            if (!isMember) {
                socket.emit('error', 'Not authorized for this team');
                return;
            }

            socket.join(teamId);
            console.log(`${decoded.username || 'Unknown'} joined team ${teamId}`);

            const messages = await Message.find({ teamId })
                .sort({ timestamp: 1 })
                .limit(50);
            socket.emit('chatHistory', messages);
            console.log(`Sent chat history to ${socket.id} for team ${teamId}:`, messages.length, 'messages');
        } catch (err) {
            console.error('Socket.IO error in joinTeam:', err.message);
            socket.emit('error', 'Authentication failed: Invalid or expired token');
        }
    });

    socket.on('sendMessage', async ({ message, teamId, token }) => {
        try {
            if (!token) {
                throw new Error('jwt must be provided');
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log('Decoded JWT in sendMessage:', decoded);

            if (!mongoose.Types.ObjectId.isValid(teamId)) {
                socket.emit('error', 'Invalid team ID');
                return;
            }

            const isMember = await mongoose.model('Team').findOne({
                _id: teamId,
                members: decoded.userId
            });
            if (!isMember) {
                socket.emit('error', 'Not authorized for this team');
                return;
            }

            const cleanMessage = sanitizeHtml(message, {
                allowedTags: [],
                allowedAttributes: {}
            });
            if (!cleanMessage.trim()) return;

            const msg = new Message({
                teamId,
                userId: decoded.userId,
                username: decoded.username || decoded.name || 'Unknown',
                message: cleanMessage
            });
            await msg.save();
            console.log(`Message saved for team ${teamId} by ${decoded.username}:`, msg.message);

            io.to(teamId).emit('message', msg);
            console.log(`Emitted message to team ${teamId}:`, msg.message);
        } catch (err) {
            console.error('Socket.IO error in sendMessage:', err.message);
            socket.emit('error', 'Failed to send message: ' + err.message);
        }
    });

    socket.on('leaveTeam', ({ teamId, token }) => {
        if (mongoose.Types.ObjectId.isValid(teamId)) {
            socket.leave(teamId);
            console.log(`User ${socket.id} left team ${teamId}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

app.use("/v1/teams", teams);
app.use("/v1/auth", ddas);
app.use("/v1/auth/download", downloadRoutes);

app.get('/', (req, res) => {
    res.send('Hello, this is my first backend!');
});

server.listen(port, () => {
    console.log(`Server running at ${port}`);
});