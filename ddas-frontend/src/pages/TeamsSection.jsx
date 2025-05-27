
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // const TeamsSection = () => {
// //   const [teams, setTeams] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchTeams();
// //   }, []);

// //   const fetchTeams = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         toast.error('Please log in to view teams');
// //         navigate('/login');
// //         return;
// //       }

// //       const response = await axios.get('http://localhost:5050/v1/teams/my-teams', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setTeams(response.data.teams || []);
// //     } catch (error) {
// //       console.error('Error fetching teams:', error);
// //       toast.error('Failed to load teams');
// //     }
// //   };

// //   const handleTeamClick = (teamId) => {
// //     navigate(`/teams/${teamId}`);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
// //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// //           My Teams
// //         </h2>
// //         {teams.length === 0 ? (
// //           <p className="text-center text-gray-600">No teams found. Create or join a team to get started!</p>
// //         ) : (
// //           <div className="bg-white shadow-xl rounded-lg p-6">
// //             {teams.map((team, index) => (
// //               <div key={index} className="mb-6 p-4 border rounded-lg">
// //                 <div className="flex items-center justify-between">
// //                   <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
// //                   <button
// //                     onClick={() => handleTeamClick(team._id)}
// //                     className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
// //                     aria-label={`View dashboard for ${team.name}`}
// //                   >
// //                     <svg
// //                       className="w-6 h-6"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                       xmlns="http://www.w3.org/2000/svg"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M9 5l7 7-7 7"
// //                       />
// //                     </svg>
// //                   </button>
// //                 </div>
// //                 <p className="text-gray-600">Created by: {team.createdBy ? team.createdBy.email : 'Unknown'}</p>
// //                 <h4 className="text-lg font-medium text-gray-800 mt-2">Members:</h4>
// //                 <ul className="list-disc pl-5 mt-2">
// //                   {team.members.map((member, memberIndex) => (
// //                     <li key={memberIndex} className="text-gray-700">{member.email}</li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeamsSection;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const TeamsSection = () => {
//     const [teams, setTeams] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchTeams();
//     }, []);

//     const fetchTeams = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('Please log in to view teams');
//                 navigate('/login');
//                 return;
//             }

//             const response = await axios.get('http://localhost:5050/v1/teams/my-teams', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setTeams(response.data.teams || []);
//         } catch (error) {
//             console.error('Error fetching teams:', error);
//             toast.error(error.response?.data?.message || 'Failed to load teams');
//             if (error.response?.status === 401) {
//                 localStorage.removeItem('token');
//                 navigate('/login');
//             }
//         }
//     };

//     const handleTeamClick = (teamId) => {
//         navigate(`/teams/${teamId}`);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
//             <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
//                 <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
//                     My Teams
//                 </h2>
//                 {teams.length === 0 ? (
//                     <p className="text-center text-gray-600">No teams found. Create or join a team to get started!</p>
//                 ) : (
//                     <div className="bg-white shadow-xl rounded-lg p-6">
//                         {teams.map((team, index) => (
//                             <div key={index} className="mb-6 p-4 border rounded-lg">
//                                 <div className="flex items-center justify-between">
//                                     <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
//                                     <button
//                                         onClick={() => handleTeamClick(team._id)}
//                                         className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
//                                         aria-label={`View dashboard for ${team.name}`}
//                                     >
//                                         <svg
//                                             className="w-6 h-6"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M9 5l7 7-7 7"
//                                             />
//                                         </svg>
//                                     </button>
//                                 </div>
//                                 <p className="text-gray-600">Created by: {team.createdBy ? team.createdBy.email : 'Unknown'}</p>
//                                 <h4 className="text-lg font-medium text-gray-800 mt-2">Members:</h4>
//                                 <ul className="list-disc pl-5 mt-2">
//                                     {team.members.map((member, memberIndex) => (
//                                         <li key={memberIndex} className="text-gray-700">{member.email}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TeamsSection;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const TeamsSection = () => {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to view teams');
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:5050/v1/teams/my-teams', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeams(response.data.teams || []);
        } catch (error) {
            console.error('Error fetching teams:', error);
            toast.error(error.response?.data?.message || 'Failed to load teams');
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    const handleTeamClick = (teamId) => {
        navigate(`/teams/${teamId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-slate-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-4xl relative z-10">
                {/* Enhanced header with gradient text */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-black text-black mb-4 animate-fadeInUp">
                        My Teams
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-black to-blue-600 mx-auto rounded-full"></div>
                </div>

                {teams.length === 0 ? (
                    <div className="text-center">
                        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-12 border border-white/20">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <p className="text-xl text-gray-600 font-medium">No teams found</p>
                            <p className="text-gray-500 mt-2">Create or join a team to get started!</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        {teams.map((team, index) => (
                            <div 
                                key={index} 
                                className="group bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl p-8 border border-white/30 transition-all duration-300 hover:scale-105 hover:bg-white/95 animate-fadeInUp"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Team header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-black to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {team.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleTeamClick(team._id)}
                                        className="w-12 h-12 bg-gradient-to-r from-black to-blue-600 hover:from-gray-800 hover:to-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                        aria-label={`View dashboard for ${team.name}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Creator info */}
                                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Created by</p>
                                            <p className="text-gray-800 font-semibold">
                                                {team.createdBy ? team.createdBy.email : 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Members section */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <h4 className="text-lg font-bold text-gray-800">Team Members</h4>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                                            {team.members.length}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {team.members.map((member, memberIndex) => (
                                            <div 
                                                key={memberIndex} 
                                                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-sm">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700 font-medium">{member.email}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default TeamsSection;