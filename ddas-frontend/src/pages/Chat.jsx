
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// Single socket instance
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5050', {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    autoConnect: false
});

const Chat = ({ teamId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const userId = useRef(null);
    const messageIds = useRef(new Set());
    const messagesEndRef = useRef(null);
    const hasJoined = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!token) {
            alert('Please log in to access chat');
            navigate('/login');
            return;
        }

        if (!teamId) {
            setError('No team selected');
            return;
        }

        // Decode token to get userId
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            userId.current = decoded.userId;
            console.log('Current userId:', userId.current);
        } catch (err) {
            console.error('Error decoding token:', err);
            setError('Invalid token');
            return;
        }

        // Connect socket if not already connected
        if (!socket.connected) {
            socket.connect();
            console.log('Socket connecting');
        }

        // Join team only once
        if (!hasJoined.current) {
            socket.emit('joinTeam', { teamId, token });
            hasJoined.current = true;
            console.log('Emitted joinTeam for teamId:', teamId);
        }

        const handleChatHistory = (history) => {
            messageIds.current.clear();
            const uniqueMessages = history.filter((msg) => {
                if (messageIds.current.has(msg._id)) return false;
                messageIds.current.add(msg._id);
                return true;
            });
            setMessages(uniqueMessages);
            scrollToBottom();
        };

        const handleMessage = (msg) => {
            if (!messageIds.current.has(msg._id)) {
                messageIds.current.add(msg._id);
                setMessages((prev) => [...prev, msg]);
                scrollToBottom();
            }
        };

        const handleError = (err) => {
            console.error('Socket error:', err);
            setError(err);
            if (err.includes('Invalid or expired token')) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        const handleConnect = () => console.log('Socket.IO connected');
        const handleConnectError = (err) => console.error('Socket.IO connection error:', err);

        socket.on('chatHistory', handleChatHistory);
        socket.on('message', handleMessage);
        socket.on('error', handleError);
        socket.on('connect', handleConnect);
        socket.on('connect_error', handleConnectError);

        return () => {
            socket.off('chatHistory', handleChatHistory);
            socket.off('message', handleMessage);
            socket.off('error', handleError);
            socket.off('connect', handleConnect);
            socket.off('connect_error', handleConnectError);
            socket.emit('leaveTeam', { teamId, token });
            hasJoined.current = false;
            console.log('Left team:', teamId);
            // Only disconnect if no other components are using the socket
            if (socket.connected) {
                socket.disconnect();
                console.log('Socket disconnected');
            }
        };
    }, [teamId, token, navigate]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { message, teamId, token });
            setMessage('');
            console.log('Emitted sendMessage:', message);
        }
    };

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-800">
                <h2>Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Chat</h3>
            <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-50 border rounded max-h-96">
                {messages.map((msg) => {
                    const isSentByMe = msg.userId === userId.current;
                    return (
                        <div
                            key={msg._id}
                            className={`mb-2 flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs p-2 rounded-lg ${
                                    isSentByMe
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                <div className="flex items-baseline">
                                    <span className="font-bold mr-2">
                                        {isSentByMe ? 'Me' : msg.username}
                                    </span>
                                    <span className="text-xs">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;



