// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import io from 'socket.io-client';
// // // // // // // // import axios from 'axios';

// // // // // // // // const PORT=import.meta.env.VITE_SECRET_KEY;

// // // // // // // // const socket = io(PORT || 'http://localhost:5050');

// // // // // // // // const Chat = () => {
// // // // // // //     //     const [teamId, setTeamId] = useState('');
// // // // // // //     //     const [teams, setTeams] = useState([]);
// // // // // // //     //     const [messages, setMessages] = useState([]);
// // // // // // //     //     const [message, setMessage] = useState('');
// // // // // // //     //     const token = localStorage.getItem('token');
    
// // // // // // //     //     // Fetch teams
// // // // // // //     //     useEffect(() => {
// // // // // // //         //         axios.get(`${PORT  || 'http://localhost:5050'}/v1/teams/my-teams`, {
// // // // // // //             //             headers: { Authorization: `Bearer ${token}` }
// // // // // // //             //         }).then(response => {
// // // // // // //                 //             setTeams(response.data);
// // // // // // //                 //             if (response.data.length > 0) setTeamId(response.data[0]._id);
// // // // // // //                 //         }).catch(err => {
// // // // // // //                     //             console.error('Error fetching teams:', err);
// // // // // // //                     //             alert('Failed to load teams');
// // // // // // //                     //         });
// // // // // // //                     //     }, []);
                    
// // // // // // //                     //     // Join team room and handle messages
// // // // // // //                     //     useEffect(() => {
// // // // // // //                         //         if (teamId && token) {
// // // // // // //                             //             socket.emit('joinTeam', { teamId, token });
                            
// // // // // // //                             //             socket.on('chatHistory', (history) => {
// // // // // // //                                 //                 setMessages(history);
// // // // // // //                                 //             });
                                
// // // // // // //                                 //             socket.on('message', (msg) => {
// // // // // // //                                     //                 setMessages((prev) => [...prev, msg]);
// // // // // // //                                     //             });
                                    
// // // // // // //                                     //             socket.on('error', (err) => {
// // // // // // //                                         //                 console.error('Socket error:', err);
// // // // // // //                                         //                 alert(err);
// // // // // // //                                         //             });
                                        
// // // // // // //                                         //             return () => {
// // // // // // //                                             //                 socket.off('chatHistory');
// // // // // // //                                             //                 socket.off('message');
// // // // // // //                                             //                 socket.off('error');
// // // // // // //                                             //             };
// // // // // // //                                             //         }
// // // // // // //                                             //     }, [teamId]);
                                            
// // // // // // //                                             //     // Send message
// // // // // // //                                             //     const sendMessage = () => {
// // // // // // //                                                 //         if (message.trim()) {
// // // // // // //                                                     //             socket.emit('sendMessage', { message });
// // // // // // //                                                     //             setMessage('');
// // // // // // //                                                     //         }
// // // // // // //                                                     //     };
                                                    
// // // // // // //                                                     //     return (
// // // // // // //                                                         //         <div className="p-4 bg-gray-100 h-screen flex flex-col">
// // // // // // //                                                         //             <h2 className="text-xl font-bold mb-4 text-blue-800">Team Chat</h2>
// // // // // // //                                                         //             <select
// // // // // // //                                                         //                 value={teamId}
// // // // // // //                                                         //                 onChange={(e) => setTeamId(e.target.value)}
// // // // // // //                                                         //                 className="mb-4 p-2 border rounded bg-white text-gray-700"
// // // // // // //                                                         //             >
// // // // // // //                                                         //                 <option value="">Select a team</option>
// // // // // // //                                                         //                 {teams.map((team) => (
// // // // // // //                                                             //                     <option key={team._id} value={team._id}>{team.name}</option>
// // // // // // //                                                             //                 ))}
// // // // // // //                                                             //             </select>
// // // // // // //                                                             //             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white border rounded shadow-sm">
// // // // // // //                                                             //                 {messages.map((msg, index) => (
// // // // // // //                                                                 //                     <div key={index} className="mb-2">
// // // // // // //                                                                 //                         <span className="font-bold text-blue-600">{msg.username}: </span>
// // // // // // //                                                                 //                         <span>{msg.message}</span>
// // // // // // //                                                                 //                         <span className="text-gray-500 text-sm ml-2">
// // // // // // //                                                                 //                             {new Date(msg.timestamp).toLocaleTimeString()}
// // // // // // //                                                                 //                         </span>
// // // // // // //                                                                 //                     </div>
// // // // // // //                                                                 //                 ))}
// // // // // // //                                                                 //             </div>
// // // // // // //                                                                 //             <div className="flex">
// // // // // // //                                                                 //                 <input
// // // // // // //                                                                 //                     type="text"
// // // // // // //                                                                 //                     value={message}
// // // // // // //                                                                 //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // //                                                                 //                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
// // // // // // //                                                                 // const PORT=import.meta.env.VITE_SECRET_KEY;
// // // // // // // //                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600"
// // // // // // // //                     placeholder="Type a message..."
// // // // // // // //                 />
// // // // // // // //                 <button
// // // // // // // //                     onClick={sendMessage}
// // // // // // // //                     className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-r hover:from-blue-700 hover:to-blue-900"
// // // // // // // //                 >
// // // // // // // //                     Send
// // // // // // // //                 </button>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // export default Chat;



// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import io from 'socket.io-client';
// // // // // // // import axios from 'axios';
// // // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // // const PORT=import.meta.env.VITE_SECRET_KEY;
// // // // // // // const socket = io(PORT || 'http://localhost:5050', {
// // // // // // //     withCredentials: true,
// // // // // // //     transports: ['websocket', 'polling']
// // // // // // // });

// // // // // // // const Chat = () => {
// // // // // // //     const [teamId, setTeamId] = useState('');
// // // // // // //     const [teams, setTeams] = useState([]);
// // // // // // //     const [messages, setMessages] = useState([]);
// // // // // // //     const [message, setMessage] = useState('');
// // // // // // //     const token = localStorage.getItem('token');
// // // // // // //     const navigate = useNavigate();

// // // // // // //     // Redirect to login if no token
// // // // // // //     useEffect(() => {
// // // // // // //         if (!token) {
// // // // // // //             alert('Please log in to access chat');
// // // // // // //             navigate('/login');
// // // // // // //             return;
// // // // // // //         }

// // // // // // //         // Fetch teams
// // // // // // //         axios.get(`${PORT|| 'http://localhost:5050'}/v1/teams/my-teams`, {
// // // // // // //             headers: { Authorization: `Bearer ${token}` }
// // // // // // //         }).then(response => {
// // // // // // //             setTeams(response.data);
// // // // // // //             if (response.data.length > 0) setTeamId(response.data[0]._id);
// // // // // // //         }).catch(err => {
// // // // // // //             console.error('Error fetching teams:', err);
// // // // // // //             alert('Failed to load teams: ' + (err.response?.data?.message || err.message));
// // // // // // //             if (err.response?.status === 401) {
// // // // // // //                 localStorage.removeItem('token');
// // // // // // //                 navigate('/login');
// // // // // // //             }
// // // // // // //         });
// // // // // // //     }, [token, navigate]);

// // // // // // //     // Join team room and handle messages
// // // // // // //     useEffect(() => {
// // // // // // //         if (teamId && token) {
// // // // // // //             socket.emit('joinTeam', { teamId, token });

// // // // // // //             socket.on('chatHistory', (history) => {
// // // // // // //                 setMessages(history);
// // // // // // //             });

// // // // // // //             socket.on('message', (msg) => {
// // // // // // //                 setMessages((prev) => [...prev, msg]);
// // // // // // //             });

// // // // // // //             socket.on('error', (err) => {
// // // // // // //                 console.error('Socket error:', err);
// // // // // // //                 alert(err);
// // // // // // //                 if (err.includes('Invalid or expired token')) {
// // // // // // //                     localStorage.removeItem('token');
// // // // // // //                     navigate('/login');
// // // // // // //                 }
// // // // // // //             });

// // // // // // //             // Debug Socket.IO connection
// // // // // // //             socket.on('connect', () => console.log('Socket.IO connected'));
// // // // // // //             socket.on('connect_error', (err) => console.error('Socket.IO connection error:', err));

// // // // // // //             return () => {
// // // // // // //                 socket.off('chatHistory');
// // // // // // //                 socket.off('message');
// // // // // // //                 socket.off('error');
// // // // // // //                 socket.off('connect');
// // // // // // //                 socket.off('connect_error');
// // // // // // //             };
// // // // // // //         }
// // // // // // //     }, [teamId, token, navigate]);

// // // // // // //     // Send message
// // // // // // //     const sendMessage = () => {
// // // // // // //         if (message.trim()) {
// // // // // // //             socket.emit('sendMessage', { message });
// // // // // // //             setMessage('');
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="p-4 bg-gray-100 h-screen flex flex-col">
// // // // // // //             <h2 className="text-xl font-bold mb-4 text-blue-800">Team Chat</h2>
// // // // // // //             <select
// // // // // // //                 value={teamId}
// // // // // // //                 onChange={(e) => setTeamId(e.target.value)}
// // // // // // //                 className="mb-4 p-2 border rounded bg-white text-gray-700"
// // // // // // //             >
// // // // // // //                 <option value="">Select a team</option>
// // // // // // //                 {teams.map((team) => (
// // // // // // //                     <option key={team._id} value={team._id}>{team.name}</option>
// // // // // // //                 ))}
// // // // // // //             </select>
// // // // // // //             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white border rounded shadow-sm">
// // // // // // //                 {messages.map((msg, index) => (
// // // // // // //                     <div key={index} className="mb-2">
// // // // // // //                         <span className="font-bold text-blue-600">{msg.username}: </span>
// // // // // // //                         <span>{msg.message}</span>
// // // // // // //                         <span className="text-gray-500 text-sm ml-2">
// // // // // // //                             {new Date(msg.timestamp).toLocaleTimeString()}
// // // // // // //                         </span>
// // // // // // //                     </div>
// // // // // // //                 ))}
// // // // // // //             </div>
// // // // // // //             <div className="flex">
// // // // // // //                 <input
// // // // // // //                     type="text"
// // // // // // //                     value={message}
// // // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // // //                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
// // // // // // //                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600"
// // // // // // //                     placeholder="Type a message..."
// // // // // // //                 />
// // // // // // //                 <button
// // // // // // //                     onClick={sendMessage}
// // // // // // //                     className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-r hover:from-blue-700 hover:to-blue-900"
// // // // // // //                 >
// // // // // // //                     Send
// // // // // // //                 </button>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default Chat;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import io from 'socket.io-client';
// // // // // // import axios from 'axios';
// // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // const PORT=import.meta.env.VITE_SECRET_KEY;

// // // // // // const socket = io(PORT || 'http://localhost:5050', {
// // // // // //     withCredentials: true,
// // // // // //     transports: ['websocket', 'polling']
// // // // // // });

// // // // // // const Chat = () => {
// // // // // //     const [teamId, setTeamId] = useState('');
// // // // // //     const [teams, setTeams] = useState([]); // Initialize as empty array
// // // // // //     const [messages, setMessages] = useState([]);
// // // // // //     const [message, setMessage] = useState('');
// // // // // //     const [error, setError] = useState(null); // For error boundary
// // // // // //     const token = localStorage.getItem('token');
// // // // // //     const navigate = useNavigate();

// // // // // //     // Fetch teams
// // // // // //     useEffect(() => {
// // // // // //         if (!token) {
// // // // // //             alert('Please log in to access chat');
// // // // // //             navigate('/login');
// // // // // //             return;
// // // // // //         }

// // // // // //         axios.get(`${PORT || 'http://localhost:5050'}/v1/teams/my-teams`, {
// // // // // //             headers: { Authorization: `Bearer ${token}` }
// // // // // //         }).then(response => {
// // // // // //             // Ensure response.data is an array
// // // // // //             const fetchedTeams = Array.isArray(response.data) ? response.data : [];
// // // // // //             setTeams(fetchedTeams);
// // // // // //             if (fetchedTeams.length > 0) setTeamId(fetchedTeams[0]._id);
// // // // // //         }).catch(error => {
// // // // // //             console.error('Error fetching teams:', error);
// // // // // //             setError('Failed to load teams: ' + (error.response?.data?.message || error.message));
// // // // // //             if (error.response?.status === 401) {
// // // // // //                 localStorage.removeItem('token');
// // // // // //                 navigate('/login');
// // // // // //             }
// // // // // //         });
// // // // // //     }, [navigate, token]);

// // // // // //     // Join team room and handle messages
// // // // // //     useEffect(() => {
// // // // // //         if (teamId && token) {
// // // // // //             socket.emit('joinTeam', { teamId, token });

// // // // // //             socket.on('chatHistory', (history) => {
// // // // // //                 setMessages(history);
// // // // // //             });

// // // // // //             socket.on('message', (msg) => {
// // // // // //                 setMessages((prev) => [...prev, msg]);
// // // // // //             });

// // // // // //             socket.on('error', (err) => {
// // // // // //                 console.error('Socket error:', err);
// // // // // //                 setError(err);
// // // // // //                 if (err.includes('Invalid or expired token')) {
// // // // // //                     localStorage.removeItem('token');
// // // // // //                     navigate('/login');
// // // // // //                 }
// // // // // //             });

// // // // // //             socket.on('connect', () => console.log('Socket.IO connected'));
// // // // // //             socket.on('connect_error', (err) => console.error('Socket.IO connection error:', err));

// // // // // //             return () => {
// // // // // //                 socket.off('chatHistory');
// // // // // //                 socket.off('message');
// // // // // //                 socket.off('error');
// // // // // //                 socket.off('connect');
// // // // // //                 socket.off('connect_error');
// // // // // //             };
// // // // // //         }
// // // // // //     }, [teamId, token, navigate]);

// // // // // //     // Send message
// // // // // //     const sendMessage = () => {
// // // // // //         if (message.trim()) {
// // // // // //             socket.emit('sendMessage', { message });
// // // // // //             setMessage('');
// // // // // //         }
// // // // // //     };

// // // // // //     // Error boundary fallback
// // // // // //     if (error) {
// // // // // //         return (
// // // // // //             <div className="p-4 bg-red-100 text-red-800">
// // // // // //                 <h2>Error</h2>
// // // // // //                 <p>{error}</p>
// // // // // //                 <button
// // // // // //                     onClick={() => navigate('/login')}
// // // // // //                     className="p-2 bg-blue-600 text-white rounded"
// // // // // //                 >
// // // // // //                     Go to Login
// // // // // //                 </button>
// // // // // //             </div>
// // // // // //         );
// // // // // //     }

// // // // // //     return (
// // // // // //         <div className="p-4 bg-gray-100 h-screen flex flex-col">
// // // // // //             <h2 className="text-xl font-bold mb-4 text-blue-800">Team Chat</h2>
// // // // // //             <select
// // // // // //                 value={teamId}
// // // // // //                 onChange={(e) => setTeamId(e.target.value)}
// // // // // //                 className="mb-4 p-2 border rounded bg-white text-gray-700"
// // // // // //             >
// // // // // //                 <option value="">Select a team</option>
// // // // // //                 {teams.map((team) => (
// // // // // //                     <option key={team._id} value={team._id}>{team.name}</option>
// // // // // //                 ))}
// // // // // //             </select>
// // // // // //             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white border rounded shadow-sm">
// // // // // //                 {messages.map((msg, index) => (
// // // // // //                     <div key={index} className="mb-2">
// // // // // //                         <span className="font-bold text-blue-600">{msg.username}: </span>
// // // // // //                         <span>{msg.message}</span>
// // // // // //                         <span className="text-gray-500 text-sm ml-2">
// // // // // //                             {new Date(msg.timestamp).toLocaleTimeString()}
// // // // // //                         </span>
// // // // // //                     </div>
// // // // // //                 ))}
// // // // // //             </div>
// // // // // //             <div className="flex">
// // // // // //                 <input
// // // // // //                     type="text"
// // // // // //                     value={message}
// // // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // // //                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
// // // // // //                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600"
// // // // // //                     placeholder="Type a message..."
// // // // // //                 />
// // // // // //                 <button
// // // // // //                     onClick={sendMessage}
// // // // // //                     className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-r hover:from-blue-700 hover:to-blue-900"
// // // // // //                 >
// // // // // //                     Send
// // // // // //                 </button>
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default Chat;




// // // // // import React, { useState, useEffect } from 'react';
// // // // // import io from 'socket.io-client';
// // // // // import axios from 'axios';
// // // // // import { useNavigate } from 'react-router-dom';

// // // // // const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5050', {
// // // // //     withCredentials: true,
// // // // //     transports: ['websocket', 'polling']
// // // // // });

// // // // // const Chat = () => {
// // // // //     const [teamId, setTeamId] = useState('');
// // // // //     const [teams, setTeams] = useState([]);
// // // // //     const [messages, setMessages] = useState([]);
// // // // //     const [message, setMessage] = useState('');
// // // // //     const [error, setError] = useState(null);
// // // // //     const token = localStorage.getItem('token');
// // // // //     const navigate = useNavigate();

// // // // //     useEffect(() => {
// // // // //         if (!token) {
// // // // //             alert('Please log in to access chat');
// // // // //             navigate('/login');
// // // // //             return;
// // // // //         }

// // // // //         axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/v1/teams/my-teams`, {
// // // // //             headers: { Authorization: `Bearer ${token}` },
// // // // //             withCredentials: true
// // // // //         }).then(response => {
// // // // //             console.log('Teams response:', response.data); // Debug
// // // // //             const fetchedTeams = Array.isArray(response.data) ? response.data : [];
// // // // //             setTeams(fetchedTeams);
// // // // //             if (fetchedTeams.length > 0) setTeamId(fetchedTeams[0]._id);
// // // // //         }).catch(error => {
// // // // //             console.error('Error fetching teams:', error);
// // // // //             setError(error.response?.data?.message || 'Failed to load teams');
// // // // //             if (error.response?.status === 401) {
// // // // //                 localStorage.removeItem('token');
// // // // //                 navigate('/login');
// // // // //             }
// // // // //         });
// // // // //     }, [navigate, token]);

// // // // //     useEffect(() => {
// // // // //         if (teamId && token) {
// // // // //             socket.emit('joinTeam', { teamId, token });

// // // // //             socket.on('chatHistory', (history) => {
// // // // //                 setMessages(history);
// // // // //             });

// // // // //             socket.on('message', (msg) => {
// // // // //                 setMessages((prev) => [...prev, msg]);
// // // // //             });

// // // // //             socket.on('error', (err) => {
// // // // //                 console.error('Socket error:', err);
// // // // //                 setError(err);
// // // // //                 if (err.includes('Invalid or expired token')) {
// // // // //                     localStorage.removeItem('token');
// // // // //                     navigate('/login');
// // // // //                 }
// // // // //             });

// // // // //             socket.on('connect', () => console.log('Socket.IO connected'));
// // // // //             socket.on('connect_error', (err) => console.error('Socket.IO connection error:', err));

// // // // //             return () => {
// // // // //                 socket.off('chatHistory');
// // // // //                 socket.off('message');
// // // // //                 socket.off('error');
// // // // //                 socket.off('connect');
// // // // //                 socket.off('connect_error');
// // // // //             };
// // // // //         }
// // // // //     }, [teamId, token, navigate]);

// // // // //     const sendMessage = () => {
// // // // //         if (message.trim()) {
// // // // //             socket.emit('sendMessage', { message });
// // // // //             setMessage('');
// // // // //         }
// // // // //     };

// // // // //     if (error) {
// // // // //         return (
// // // // //             <div className="p-4 bg-red-100 text-red-800">
// // // // //                 <h2>Error</h2>
// // // // //                 <p>{error}</p>
// // // // //                 <button
// // // // //                     onClick={() => navigate('/login')}
// // // // //                     className="p-2 bg-blue-600 text-white rounded"
// // // // //                 >
// // // // //                     Go to Login
// // // // //                 </button>
// // // // //             </div>
// // // // //         );
// // // // //     }

// // // // //     return (
// // // // //         <div className="p-4 bg-gray-100 h-screen flex flex-col">
// // // // //             <h2 className="text-xl font-bold mb-4 text-blue-800">Team Chat</h2>
// // // // //             <select
// // // // //                 value={teamId}
// // // // //                 onChange={(e) => setTeamId(e.target.value)}
// // // // //                 className="mb-4 p-2 border rounded bg-white text-gray-700"
// // // // //             >
// // // // //                 <option value="">Select a team</option>
// // // // //                 {teams.map((team) => (
// // // // //                     <option key={team._id} value={team._id}>{team.name}</option>
// // // // //                 ))}
// // // // //             </select>
// // // // //             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-white border rounded shadow-sm">
// // // // //                 {messages.map((msg, index) => (
// // // // //                     <div key={index} className="mb-2">
// // // // //                         <span className="font-bold text-blue-600">{msg.username}: </span>
// // // // //                         <span>{msg.message}</span>
// // // // //                         <span className="text-gray-500 text-sm ml-2">
// // // // //                             {new Date(msg.timestamp).toLocaleTimeString()}
// // // // //                         </span>
// // // // //                     </div>
// // // // //                 ))}
// // // // //             </div>
// // // // //             <div className="flex">
// // // // //                 <input
// // // // //                     type="text"
// // // // //                     value={message}
// // // // //                     onChange={(e) => setMessage(e.target.value)}
// // // // //                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
// // // // //                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600"
// // // // //                     placeholder="Type a message..."
// // // // //                 />
// // // // //                 <button
// // // // //                     onClick={sendMessage}
// // // // //                     className="p-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-r hover:from-blue-700 hover:to-blue-900"
// // // // //                 >
// // // // //                     Send
// // // // //                 </button>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default Chat;


// // // // // All is correct
// // // // import React, { useState, useEffect } from 'react';
// // // // import io from 'socket.io-client';
// // // // import axios from 'axios';
// // // // import { useNavigate } from 'react-router-dom';

// // // // const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5050', {
// // // //     withCredentials: true,
// // // //     transports: ['websocket', 'polling']
// // // // });

// // // // const Chat = ({ teamId }) => {
// // // //     const [messages, setMessages] = useState([]);
// // // //     const [message, setMessage] = useState('');
// // // //     const [error, setError] = useState(null);
// // // //     const token = localStorage.getItem('token');
// // // //     const navigate = useNavigate();

// // // //     useEffect(() => {
// // // //         if (!token) {
// // // //             alert('Please log in to access chat');
// // // //             navigate('/login');
// // // //             return;
// // // //         }

// // // //         if (!teamId) {
// // // //             setError('No team selected');
// // // //             return;
// // // //         }

// // // //         // Join the team room
// // // //         socket.emit('joinTeam', { teamId, token });

// // // //         socket.on('chatHistory', (history) => {
// // // //             setMessages(history);
// // // //         });

// // // //         socket.on('message', (msg) => {
// // // //             setMessages((prev) => [...prev, msg]);
// // // //         });

// // // //         socket.on('error', (err) => {
// // // //             console.error('Socket error:', err);
// // // //             setError(err);
// // // //             if (err.includes('Invalid or expired token')) {
// // // //                 localStorage.removeItem('token');
// // // //                 navigate('/login');
// // // //             }
// // // //         });

// // // //         socket.on('connect', () => console.log('Socket.IO connected'));
// // // //         socket.on('connect_error', (err) => console.error('Socket.IO connection error:', err));

// // // //         return () => {
// // // //             socket.off('chatHistory');
// // // //             socket.off('message');
// // // //             socket.off('error');
// // // //             socket.off('connect');
// // // //             socket.off('connect_error');
// // // //         };
// // // //     }, [teamId, token, navigate]);

// // // //     const sendMessage = () => {
// // // //         if (message.trim()) {
// // // //             socket.emit('sendMessage', { message });
// // // //             setMessage('');
// // // //         }
// // // //     };

// // // //     if (error) {
// // // //         return (
// // // //             <div className="p-4 bg-red-100 text-red-800">
// // // //                 <h2>Error</h2>
// // // //                 <p>{error}</p>
// // // //                 <button
// // // //                     onClick={() => navigate('/login')}
// // // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // //                 >
// // // //                     Go to Login
// // // //                 </button>
// // // //             </div>
// // // //         );
// // // //     }

// // // //     return (
// // // //         <div className="flex flex-col h-full">
// // // //             <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Chat</h3>
// // // //             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-50 border rounded">
// // // //                 {messages.map((msg, index) => (
// // // //                     <div key={index} className="mb-2">
// // // //                         <span className="font-bold text-indigo-600">{msg.username}: </span>
// // // //                         <span>{msg.message}</span>
// // // //                         <span className="text-gray-500 text-sm ml-2">
// // // //                             {new Date(msg.timestamp).toLocaleTimeString()}
// // // //                         </span>
// // // //                     </div>
// // // //                 ))}
// // // //             </div>
// // // //             <div className="flex">
// // // //                 <input
// // // //                     type="text"
// // // //                     value={message}
// // // //                     onChange={(e) => setMessage(e.target.value)}
// // // //                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
// // // //                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-600"
// // // //                     placeholder="Type a message..."
// // // //                 />
// // // //                 <button
// // // //                     onClick={sendMessage}
// // // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700"
// // // //                 >
// // // //                     Send
// // // //                 </button>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default Chat;

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import io from 'socket.io-client';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';

// // // // Define socket outside the component to ensure a single instance
// // // const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5050', {
// // //     withCredentials: true,
// // //     transports: ['websocket', 'polling']
// // // });

// // // const Chat = ({ teamId }) => {
// // //     const [messages, setMessages] = useState([]);
// // //     const [message, setMessage] = useState('');
// // //     const [error, setError] = useState(null);
// // //     const token = localStorage.getItem('token');
// // //     const navigate = useNavigate();
// // //     const messageIds = useRef(new Set()); // Track message IDs to avoid duplicates

// // //     useEffect(() => {
// // //         if (!token) {
// // //             alert('Please log in to access chat');
// // //             navigate('/login');
// // //             return;
// // //         }

// // //         if (!teamId) {
// // //             setError('No team selected');
// // //             return;
// // //         }

// // //         // Join the team room
// // //         socket.emit('joinTeam', { teamId, token });

// // //         // Event handlers
// // //         const handleChatHistory = (history) => {
// // //             setMessages([]);
// // //             messageIds.current.clear();
// // //             history.forEach((msg) => {
// // //                 if (!messageIds.current.has(msg._id)) {
// // //                     messageIds.current.add(msg._id);
// // //                     setMessages((prev) => [...prev, msg]);
// // //                 }
// // //             });
// // //         };

// // //         const handleMessage = (msg) => {
// // //             if (!messageIds.current.has(msg._id)) {
// // //                 messageIds.current.add(msg._id);
// // //                 setMessages((prev) => [...prev, msg]);
// // //             }
// // //         };

// // //         const handleError = (err) => {
// // //             console.error('Socket error:', err);
// // //             setError(err);
// // //             if (err.includes('Invalid or expired token')) {
// // //                 localStorage.removeItem('token');
// // //                 navigate('/login');
// // //             }
// // //         };

// // //         const handleConnect = () => console.log('Socket.IO connected');
// // //         const handleConnectError = (err) => console.error('Socket.IO connection error:', err);

// // //         // Attach event listeners
// // //         socket.on('chatHistory', handleChatHistory);
// // //         socket.on('message', handleMessage);
// // //         socket.on('error', handleError);
// // //         socket.on('connect', handleConnect);
// // //         socket.on('connect_error', handleConnectError);

// // //         // Cleanup on unmount or when teamId/token changes
// // //         return () => {
// // //             socket.off('chatHistory', handleChatHistory);
// // //             socket.off('message', handleMessage);
// // //             socket.off('error', handleError);
// // //             socket.off('connect', handleConnect);
// // //             socket.off('connect_error', handleConnectError);
// // //             // Leave the team room
// // //             socket.emit('leaveTeam', { teamId });
// // //         };
// // //     }, [teamId, token, navigate]);

// // //     const sendMessage = () => {
// // //         if (message.trim()) {
// // //             socket.emit('sendMessage', { message });
// // //             setMessage('');
// // //         }
// // //     };

// // //     if (error) {
// // //         return (
// // //             <div className="p-4 bg-red-100 text-red-800">
// // //                 <h2>Error</h2>
// // //                 <p>{error}</p>
// // //                 <button
// // //                     onClick={() => navigate('/login')}
// // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // //                 >
// // //                     Go to Login
// // //                 </button>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="flex flex-col h-full">
// // //             <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Chat</h3>
// // //             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-50 border rounded">
// // //                 {messages.map((msg, index) => (
// // //                     <div key={msg._id || index} className="mb-2">
// // //                         <span className="font-bold text-indigo-600">{msg.username}: </span>
// // //                         <span>{msg.message}</span>
// // //                         <span className="text-gray-500 text-sm ml-2">
// // //                             {new Date(msg.timestamp).toLocaleTimeString()}
// // //                         </span>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //             <div className="flex">
// // //                 <input
// // //                     type="text"
// // //                     value={message}
// // //                     onChange={(e) => setMessage(e.target.value)}
// // //                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
// // //                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-600"
// // //                     placeholder="Type a message..."
// // //                 />
// // //                 <button
// // //                     onClick={sendMessage}
// // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700"
// // //                 >
// // //                     Send
// // //                 </button>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Chat;

// // import React, { useState, useEffect, useRef } from 'react';
// // import io from 'socket.io-client';
// // import { useNavigate } from 'react-router-dom';

// // // Single socket instance
// // const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5050', {
// //     withCredentials: true,
// //     transports: ['websocket', 'polling']
// // });

// // const Chat = ({ teamId }) => {
// //     const [messages, setMessages] = useState([]);
// //     const [message, setMessage] = useState('');
// //     const [error, setError] = useState(null);
// //     const token = localStorage.getItem('token');
// //     const navigate = useNavigate();
// //     const userId = useRef(null); // To store the current user's ID
// //     const messageIds = useRef(new Set()); // Track message IDs to avoid duplicates
// //     const messagesEndRef = useRef(null); // For auto-scrolling to the latest message

// //     // Auto-scroll to the latest message
// //     const scrollToBottom = () => {
// //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //     };

// //     useEffect(() => {
// //         if (!token) {
// //             alert('Please log in to access chat');
// //             navigate('/login');
// //             return;
// //         }

// //         if (!teamId) {
// //             setError('No team selected');
// //             return;
// //         }

// //         // Decode the token to get the userId
// //         try {
// //             const decoded = JSON.parse(atob(token.split('.')[1]));
// //             userId.current = decoded.userId;
// //             console.log('Current userId:', userId.current);
// //         } catch (err) {
// //             console.error('Error decoding token:', err);
// //             setError('Invalid token');
// //             return;
// //         }

// //         // Join the team room
// //         socket.emit('joinTeam', { teamId, token });

// //         // Event handlers
// //         const handleChatHistory = (history) => {
// //             messageIds.current.clear();
// //             const uniqueMessages = history.filter((msg) => {
// //                 if (messageIds.current.has(msg._id)) return false;
// //                 messageIds.current.add(msg._id);
// //                 return true;
// //             });
// //             setMessages(uniqueMessages);
// //             scrollToBottom();
// //         };

// //         const handleMessage = (msg) => {
// //             if (!messageIds.current.has(msg._id)) {
// //                 messageIds.current.add(msg._id);
// //                 setMessages((prev) => [...prev, msg]);
// //                 scrollToBottom();
// //             }
// //         };

// //         const handleError = (err) => {
// //             console.error('Socket error:', err);
// //             setError(err);
// //             if (err.includes('Invalid or expired token')) {
// //                 localStorage.removeItem('token');
// //                 navigate('/login');
// //             }
// //         };

// //         const handleConnect = () => console.log('Socket.IO connected');
// //         const handleConnectError = (err) => console.error('Socket.IO connection error:', err);

// //         socket.on('chatHistory', handleChatHistory);
// //         socket.on('message', handleMessage);
// //         socket.on('error', handleError);
// //         socket.on('connect', handleConnect);
// //         socket.on('connect_error', handleConnectError);

// //         return () => {
// //             socket.off('chatHistory', handleChatHistory);
// //             socket.off('message', handleMessage);
// //             socket.off('error', handleError);
// //             socket.off('connect', handleConnect);
// //             socket.off('connect_error', handleConnectError);
// //             socket.emit('leaveTeam', { teamId });
// //         };
// //     }, [teamId, token, navigate]);

// //     const sendMessage = () => {
// //         if (message.trim()) {
// //             socket.emit('sendMessage', { message, teamId });
// //             setMessage('');
// //         }
// //     };

// //     if (error) {
// //         return (
// //             <div className="p-4 bg-red-100 text-red-800">
// //                 <h2>Error</h2>
// //                 <p>{error}</p>
// //                 <button
// //                     onClick={() => navigate('/login')}
// //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// //                 >
// //                     Go to Login
// //                 </button>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="flex flex-col h-full">
// //             <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Chat</h3>
// //             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-50 border rounded max-h-96">
// //                 {messages.map((msg) => {
// //                     const isSentByMe = msg.userId === userId.current;
// //                     return (
// //                         <div
// //                             key={msg._id}
// //                             className={`mb-2 flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
// //                         >
// //                             <div
// //                                 className={`max-w-xs p-2 rounded-lg ${
// //                                     isSentByMe
// //                                         ? 'bg-indigo-500 text-white'
// //                                         : 'bg-gray-200 text-gray-800'
// //                                 }`}
// //                             >
// //                                 <div className="flex items-baseline">
// //                                     <span className="font-bold mr-2">
// //                                         {isSentByMe ? 'Me' : msg.username}
// //                                     </span>
// //                                     <span className="text-xs">
// //                                         {new Date(msg.timestamp).toLocaleTimeString()}
// //                                     </span>
// //                                 </div>
// //                                 <p>{msg.message}</p>
// //                             </div>
// //                         </div>
// //                     );
// //                 })}
// //                 <div ref={messagesEndRef} />
// //             </div>
// //             <div className="flex">
// //                 <input
// //                     type="text"
// //                     value={message}
// //                     onChange={(e) => setMessage(e.target.value)}
// //                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
// //                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-600"
// //                     placeholder="Type a message..."
// //                 />
// //                 <button
// //                     onClick={sendMessage}
// //                     className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700"
// //                 >
// //                     Send
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Chat;

// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';

// // Single socket instance with token in auth
// const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5050', {
//     withCredentials: true,
//     transports: ['websocket', 'polling'],
//     autoConnect: false // Prevent automatic connection
// });

// const Chat = ({ teamId }) => {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState(null);
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();
//     const userId = useRef(null);
//     const messageIds = useRef(new Set());
//     const messagesEndRef = useRef(null);
//     const hasJoined = useRef(false); // Track if the user has joined the team

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     useEffect(() => {
//         if (!token) {
//             alert('Please log in to access chat');
//             navigate('/login');
//             return;
//         }

//         if (!teamId) {
//             setError('No team selected');
//             return;
//         }

//         // Decode token to get userId
//         try {
//             const decoded = JSON.parse(atob(token.split('.')[1]));
//             userId.current = decoded.userId;
//             console.log('Current userId:', userId.current);
//         } catch (err) {
//             console.error('Error decoding token:', err);
//             setError('Invalid token');
//             return;
//         }

//         // Set token in socket auth
//         socket.auth = { token };
//         socket.connect();
//         console.log('Socket connecting with token');

//         if (!hasJoined.current) {
//             socket.emit('joinTeam', { teamId, token });
//             hasJoined.current = true;
//             console.log('Emitted joinTeam for teamId:', teamId);
//         }

//         const handleChatHistory = (history) => {
//             messageIds.current.clear();
//             const uniqueMessages = history.filter((msg) => {
//                 if (messageIds.current.has(msg._id)) return false;
//                 messageIds.current.add(msg._id);
//                 return true;
//             });
//             setMessages(uniqueMessages);
//             scrollToBottom();
//         };

//         const handleMessage = (msg) => {
//             if (!messageIds.current.has(msg._id)) {
//                 messageIds.current.add(msg._id);
//                 setMessages((prev) => [...prev, msg]);
//                 scrollToBottom();
//             }
//         };

//         const handleError = (err) => {
//             console.error('Socket error:', err);
//             setError(err);
//             if (err.includes('Invalid or expired token')) {
//                 localStorage.removeItem('token');
//                 navigate('/login');
//             }
//         };

//         const handleConnect = () => console.log('Socket.IO connected');
//         const handleConnectError = (err) => console.error('Socket.IO connection error:', err);

//         socket.on('chatHistory', handleChatHistory);
//         socket.on('message', handleMessage);
//         socket.on('error', handleError);
//         socket.on('connect', handleConnect);
//         socket.on('connect_error', handleConnectError);

//         return () => {
//             socket.off('chatHistory', handleChatHistory);
//             socket.off('message', handleMessage);
//             socket.off('error', handleError);
//             socket.off('connect', handleConnect);
//             socket.off('connect_error', handleConnectError);
//             socket.emit('leaveTeam', { teamId, token });
//             socket.disconnect();
//             hasJoined.current = false;
//             console.log('Socket disconnected and left team:', teamId);
//         };
//     }, [teamId, token, navigate]);

//     const sendMessage = () => {
//         if (message.trim()) {
//             socket.emit('sendMessage', { message, teamId, token });
//             setMessage('');
//         }
//     };

//     if (error) {
//         return (
//             <div className="p-4 bg-red-100 text-red-800">
//                 <h2>Error</h2>
//                 <p>{error}</p>
//                 <button
//                     onClick={() => navigate('/login')}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//                 >
//                     Go to Login
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col h-full">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Chat</h3>
//             <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-50 border rounded max-h-96">
//                 {messages.map((msg) => {
//                     const isSentByMe = msg.userId === userId.current;
//                     return (
//                         <div
//                             key={msg._id}
//                             className={`mb-2 flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
//                         >
//                             <div
//                                 className={`max-w-xs p-2 rounded-lg ${
//                                     isSentByMe
//                                         ? 'bg-indigo-500 text-white'
//                                         : 'bg-gray-200 text-gray-800'
//                                 }`}
//                             >
//                                 <div className="flex items-baseline">
//                                     <span className="font-bold mr-2">
//                                         {isSentByMe ? 'Me' : msg.username}
//                                     </span>
//                                     <span className="text-xs">
//                                         {new Date(msg.timestamp).toLocaleTimeString()}
//                                     </span>
//                                 </div>
//                                 <p>{msg.message}</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//                 <div ref={messagesEndRef} />
//             </div>
//             <div className="flex">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                     className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                     placeholder="Type a message..."
//                 />
//                 <button
//                     onClick={sendMessage}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Chat;

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