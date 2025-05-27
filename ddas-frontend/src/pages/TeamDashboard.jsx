
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // import axios from 'axios';
// // // // // import toast from 'react-hot-toast';

// // // // // const TeamDashboard = () => {
// // // // //   const { teamId } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const [team, setTeam] = useState(null);
// // // // //   const [files, setFiles] = useState([]);
// // // // //   const [isAdmin, setIsAdmin] = useState(false);
// // // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // // //   useEffect(() => {
// // // // //     fetchTeamDetails();
// // // // //   }, [teamId]);

// // // // //   const fetchTeamDetails = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem('token');
// // // // //       if (!token) {
// // // // //         toast.error('Please log in to view team dashboard');
// // // // //         navigate('/login');
// // // // //         return;
// // // // //       }

// // // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });

// // // // //       console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
// // // // //       setTeam(response.data.team);
// // // // //       setFiles(response.data.team.files || []);
// // // // //       setIsAdmin(response.data.isAdmin);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching team details:', error);
// // // // //       toast.error('Failed to load team dashboard');
// // // // //     }
// // // // //   };

// // // // //   const handleFileUpload = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!selectedFile) {
// // // // //       toast.error('Please select a file to upload');
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append('file', selectedFile);

// // // // //     try {
// // // // //       const token = localStorage.getItem('token');
// // // // //       const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
// // // // //         headers: {
// // // // //           Authorization: `Bearer ${token}`,
// // // // //           'Content-Type': 'multipart/form-data',
// // // // //         },
// // // // //       });

// // // // //       setFiles([...files, response.data.file]);
// // // // //       setSelectedFile(null);
// // // // //       toast.success('File uploaded successfully');
// // // // //       fetchTeamDetails();
// // // // //     } catch (error) {
// // // // //       console.error('Error uploading file:', error);
// // // // //       toast.error('Failed to upload file');
// // // // //     }
// // // // //   };

// // // // //   const handleDownload = async (fileId, fileName) => {
// // // // //     const token = localStorage.getItem('token');
// // // // //     try {
// // // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //         responseType: 'blob',
// // // // //       });

// // // // //       // Status 200: File stream received, trigger download
// // // // //       const url = window.URL.createObjectURL(response.data);
// // // // //       const link = document.createElement('a');
// // // // //       link.href = url;
// // // // //       link.setAttribute('download', fileName);
// // // // //       document.body.appendChild(link);
// // // // //       link.click();
// // // // //       link.remove();
// // // // //       toast.success('File downloaded successfully');
// // // // //     } catch (error) {
// // // // //       if (error.response && error.response.status === 403) {
// // // // //         // Status 403: File already downloaded, parse JSON from blob
// // // // //         const reader = new FileReader();
// // // // //         reader.onload = () => {
// // // // //           try {
// // // // //             const data = JSON.parse(reader.result);
// // // // //             const { message, fileUrl } = data;

// // // // //             console.log('File URL received in frontend:', fileUrl);

// // // // //             const fileExtension = fileName.split('.').pop().toLowerCase();
// // // // //             const isDocx = fileExtension === 'docx';

// // // // //             // Construct URL for viewing
// // // // //             const viewUrl = isDocx
// // // // //               ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
// // // // //               : fileUrl;

// // // // //             // Show toast with "View the file" button
// // // // //             toast.error(
// // // // //               <div>
// // // // //                 <p>{message}</p>
// // // // //                 <br />
// // // // //                 <button
// // // // //                   onClick={() => window.open(viewUrl, '_blank')}
// // // // //                   className="text-blue-600 underline"
// // // // //                 >
// // // // //                   View the file
// // // // //                 </button>
// // // // //               </div>,
// // // // //               { duration: 5000 }
// // // // //             );
// // // // //           } catch (parseError) {
// // // // //             console.error('Error parsing JSON:', parseError);
// // // // //             toast.error('Failed to process server response');
// // // // //           }
// // // // //         };
// // // // //         reader.readAsText(error.response.data);
// // // // //       } else {
// // // // //         console.error('Error downloading file:', error);
// // // // //         toast.error('Failed to download file');
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleRemove = async (fileId) => {
// // // // //     if (!window.confirm('Are you sure you want to remove this file?')) return;
// // // // //     if (!isAdmin) {
// // // // //       toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
// // // // //         duration: 5000,
// // // // //       });
// // // // //       return;
// // // // //     }
// // // // //     try {
// // // // //       const token = localStorage.getItem('token');
// // // // //       console.log('Removing file:', { teamId, fileId, token });
// // // //       // await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
// // // //       //   headers: { Authorization: `Bearer ${token}` },
// // // //       // });
// // // // //       setFiles(files.filter((file) => file._id !== fileId));
// // // // //       fetchTeamDetails();
// // // // //       toast.success('File removed successfully');
// // // // //     } catch (error) {
// // // // //       console.error('Error removing file:', error);
// // // // //       const errorMessage = error.response?.data?.message || 'Failed to remove file';
// // // // //       toast.error(errorMessage, { duration: 5000 });
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // // // //       <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
// // // // //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// // // // //           {team ? `${team.name} Dashboard` : 'Team Dashboard'}
// // // // //         </h2>

// // // // //         {team && (
// // // // //           <>
// // // // //             {isAdmin && (
// // // // //               <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
// // // // //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
// // // // //                 <form onSubmit={handleFileUpload}>
// // // // //                   <input
// // // // //                     type="file"
// // // // //                     onChange={(e) => setSelectedFile(e.target.files[0])}
// // // // //                     className="mb-4"
// // // // //                   />
// // // // //                   <button
// // // // //                     type="submit"
// // // // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // // //                   >
// // // // //                     Upload
// // // // //                   </button>
// // // // //                 </form>
// // // // //               </div>
// // // // //             )}

// // // // //             <div className="bg-white shadow-xl rounded-lg p-6">
// // // // //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
// // // // //               {files.length === 0 ? (
// // // // //                 <p className="text-gray-600">No files uploaded yet.</p>
// // // // //               ) : (
// // // // //                 <ul className="divide-y divide-gray-200">
// // // // //                   {files.map((file) => (
// // // // //                     <li key={file._id} className="py-4 flex justify-between items-center">
// // // // //                       <span className="text-gray-700">{file.name}</span>
// // // // //                       <div className="flex space-x-2">
// // // // //                         <button
// // // // //                           onClick={() => handleDownload(file._id, file.name)}
// // // // //                           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // // //                         >
// // // // //                           Download
// // // // //                         </button>
// // // // //                         {isAdmin && (
// // // // //                           <button
// // // // //                             onClick={() => handleRemove(file._id)}
// // // // //                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// // // // //                           >
// // // // //                             Remove
// // // // //                           </button>
// // // // //                         )}
// // // // //                       </div>
// // // // //                     </li>
// // // // //                   ))}
// // // // //                 </ul>
// // // // //               )}
// // // // //             </div>
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default TeamDashboard;



// // // 1st corrcet
// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import axios from 'axios';
// // // import toast from 'react-hot-toast';

// // // const TeamDashboard = () => {
// // //   const { teamId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [team, setTeam] = useState(null);
// // //   const [files, setFiles] = useState([]);
// // //   const [isAdmin, setIsAdmin] = useState(false);
// // //   const [selectedFile, setSelectedFile] = useState(null);

// // //   useEffect(() => {
// // //     fetchTeamDetails();
// // //   }, [teamId]);

// // //   const fetchTeamDetails = async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         toast.error('Please log in to view team dashboard');
// // //         navigate('/login');
// // //         return;
// // //       }

// // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
// // //       setTeam(response.data.team);
// // //       setFiles(response.data.team.files || []);
// // //       setIsAdmin(response.data.isAdmin);
// // //     } catch (error) {
// // //       console.error('Error fetching team details:', error);
// // //       toast.error('Failed to load team dashboard');
// // //     }
// // //   };

// // //   const handleFileUpload = async (e) => {
// // //     e.preventDefault();
// // //     if (!selectedFile) {
// // //       toast.error('Please select a file to upload');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('file', selectedFile);

// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //           'Content-Type': 'multipart/form-data',
// // //         },
// // //       });

// // //       setFiles([...files, response.data.file]);
// // //       setSelectedFile(null);
// // //       toast.success('File uploaded successfully');
// // //       fetchTeamDetails();
// // //     } catch (error) {
// // //       console.error('Error uploading file:', error);
// // //       toast.error('Failed to upload file');
// // //     }
// // //   };

// // //   const handleDownload = async (fileId, fileName) => {
// // //     const token = localStorage.getItem('token');
// // //     try {
// // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //         responseType: 'blob',
// // //       });

// // //       // Status 200: File stream received, trigger download
// // //       const url = window.URL.createObjectURL(response.data);
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.setAttribute('download', fileName);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.remove();
// // //       toast.success('File downloaded successfully');
// // //     } catch (error) {
// // //       if (error.response && error.response.status === 403) {
// // //         // Status 403: File already downloaded, parse JSON from blob
// // //         const reader = new FileReader();
// // //         reader.onload = () => {
// // //           try {
// // //             const data = JSON.parse(reader.result);
// // //             const { message, fileUrl } = data;

// // //             console.log('File URL received in frontend:', fileUrl);

// // //             const fileExtension = fileName.split('.').pop().toLowerCase();
// // //             const isOfficeFile = ['docx', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileExtension);

// // //             // Construct URL for viewing
// // //             const viewUrl = isOfficeFile
// // //               ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
// // //               : fileUrl;

// // //             // Show toast with "View the file" button
// // //             toast.error(
// // //               <div>
// // //                 <p>{message}</p>
// // //                 <br />
// // //                 <button
// // //                   onClick={() => window.open(viewUrl, '_blank')}
// // //                   className="text-blue-600 underline"
// // //                 >
// // //                   View the file
// // //                 </button>
// // //               </div>,
// // //               { duration: 5000 }
// // //             );
// // //           } catch (parseError) {
// // //             console.error('Error parsing JSON:', parseError);
// // //             toast.error('Failed to process server response');
// // //           }
// // //         };
// // //         reader.readAsText(error.response.data);
// // //       } else {
// // //         console.error('Error downloading file:', error);
// // //         toast.error('Failed to download file');
// // //       }
// // //     }
// // //   };

// // //   const handleRemove = async (fileId) => {
// // //     if (!window.confirm('Are you sure you want to remove this file?')) return;
// // //     if (!isAdmin) {
// // //       toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
// // //         duration: 5000,
// // //       });
// // //       return;
// // //     }
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       console.log('Removing file:', { teamId, fileId, token });
// // //       // await axios.delete(`http://localhost:5050/v1/teams/${teamId?/files/${fileId}`, {
// // //       //   headers: { Authorization: `Bearer ${token}` },
// // //       // });

// // //       await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       setFiles(files.filter((file) => file._id !== fileId));
// // //       fetchTeamDetails();
// // //       toast.success('File removed successfully');
// // //     } catch (error) {
// // //       console.error('Error removing file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to remove file';
// // //       toast.error(errorMessage, { duration: 5000 });
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // //       <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
// // //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// // //           {team ? `${team.name} Dashboard` : 'Team Dashboard'}
// // //         </h2>

// // //         {team && (
// // //           <>
// // //             {isAdmin && (
// // //               <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
// // //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
// // //                 <form onSubmit={handleFileUpload}>
// // //                   <input
// // //                     type="file"
// // //                     onChange={(e) => setSelectedFile(e.target.files[0])}
// // //                     className="mb-4"
// // //                   />
// // //                   <button
// // //                     type="submit"
// // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // //                   >
// // //                     Upload
// // //                   </button>
// // //                 </form>
// // //               </div>
// // //             )}

// // //             <div className="bg-white shadow-xl rounded-lg p-6">
// // //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
// // //               {files.length === 0 ? (
// // //                 <p className="text-gray-600">No files uploaded yet.</p>
// // //               ) : (
// // //                 <ul className="divide-y divide-gray-200">
// // //                   {files.map((file) => (
// // //                     <li key={file._id} className="py-4 flex justify-between items-center">
// // //                       <span className="text-gray-700">{file.name}</span>
// // //                       <div className="flex space-x-2">
// // //                         <button
// // //                           onClick={() => handleDownload(file._id, file.name)}
// // //                           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // //                         >
// // //                           Download
// // //                         </button>
// // //                         {isAdmin && (
// // //                           <button
// // //                             onClick={() => handleRemove(file._id)}
// // //                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// // //                           >
// // //                             Remove
// // //                           </button>
// // //                         )}
// // //                       </div>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               )}
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TeamDashboard;



// // // 2nd corrrcet
// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import axios from 'axios';
// // // import toast from 'react-hot-toast';

// // // const TeamDashboard = () => {
// // //   const { teamId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [team, setTeam] = useState(null);
// // //   const [files, setFiles] = useState([]);
// // //   const [isAdmin, setIsAdmin] = useState(false);
// // //   const [selectedFile, setSelectedFile] = useState(null);

// // //   useEffect(() => {
// // //     fetchTeamDetails();
// // //   }, [teamId]);

// // //   const fetchTeamDetails = async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       if (!token) {
// // //         toast.error('Please log in to view team dashboard');
// // //         navigate('/login');
// // //         return;
// // //       }

// // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
// // //       setTeam(response.data.team);
// // //       setFiles(response.data.team.files || []);
// // //       setIsAdmin(response.data.isAdmin);
// // //     } catch (error) {
// // //       console.error('Error fetching team details:', error);
// // //       toast.error('Failed to load team dashboard');
// // //     }
// // //   };

// // //   const handleFileUpload = async (e) => {
// // //     e.preventDefault();
// // //     if (!selectedFile) {
// // //       toast.error('Please select a file to upload');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('file', selectedFile);

// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //           'Content-Type': 'multipart/form-data',
// // //         },
// // //       });

// // //       setFiles([...files, response.data.file]);
// // //       setSelectedFile(null);
// // //       toast.success('File uploaded successfully');
// // //       fetchTeamDetails();
// // //     } catch (error) {
// // //       console.error('Error uploading file:', error);
// // //       if (error.response && error.response.status === 409) {
// // //         const { message, existingFile } = error.response.data;
// // //         toast.error(
// // //           <div>
// // //             <p>{message}</p>
// // //             <br />
// // //             <button
// // //               onClick={() => handleDownload(existingFile.id, existingFile.name)}
// // //               className="text-blue-600 underline"
// // //             >
// // //               View/Download the existing file
// // //             </button>
// // //           </div>,
// // //           { duration: 5000 }
// // //         );
// // //       } else {
// // //         toast.error('Failed to upload file');
// // //       }
// // //     }
// // //   };

// // //   const handleDownload = async (fileId, fileName) => {
// // //     const token = localStorage.getItem('token');
// // //     try {
// // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //         responseType: 'blob',
// // //       });

// // //       // Status 200: File stream received, trigger download
// // //       const url = window.URL.createObjectURL(response.data);
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.setAttribute('download', fileName);
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       link.remove();
// // //       toast.success('File downloaded successfully');
// // //     } catch (error) {
// // //       if (error.response && error.response.status === 403) {
// // //         // Status 403: File already downloaded, parse JSON from blob
// // //         const reader = new FileReader();
// // //         reader.onload = () => {
// // //           try {
// // //             const data = JSON.parse(reader.result);
// // //             const { message, fileUrl } = data;

// // //             console.log('File URL received in frontend:', fileUrl);

// // //             const fileExtension = fileName.split('.').pop().toLowerCase();
// // //             const isOfficeFile = ['docx', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileExtension);

// // //             // Construct URL for viewing
// // //             const viewUrl = isOfficeFile
// // //               ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
// // //               : fileUrl;

// // //             // Show toast with "View the file" button
// // //             toast.error(
// // //               <div>
// // //                 <p>{message}</p>
// // //                 <br />
// // //                 <button
// // //                   onClick={() => window.open(viewUrl, '_blank')}
// // //                   className="text-blue-600 underline"
// // //                 >
// // //                   View the file
// // //                 </button>
// // //               </div>,
// // //               { duration: 5000 }
// // //             );
// // //           } catch (parseError) {
// // //             console.error('Error parsing JSON:', parseError);
// // //             toast.error('Failed to process server response');
// // //           }
// // //         };
// // //         reader.readAsText(error.response.data);
// // //       } else {
// // //         console.error('Error downloading file:', error);
// // //         toast.error('Failed to download file');
// // //       }
// // //     }
// // //   };

// // //   const handleRemove = async (fileId) => {
// // //     if (!window.confirm('Are you sure you want to remove this file?')) return;
// // //     if (!isAdmin) {
// // //       toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
// // //         duration: 5000,
// // //       });
// // //       return;
// // //     }
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       console.log('Removing file:', { teamId, fileId, token });
// // //       await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       setFiles(files.filter((file) => file._id !== fileId));
// // //       fetchTeamDetails();
// // //       toast.success('File removed successfully');
// // //     } catch (error) {
// // //       console.error('Error removing file:', error);
// // //       const errorMessage = error.response?.data?.message || 'Failed to remove file';
// // //       toast.error(errorMessage, { duration: 5000 });
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // //       <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
// // //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// // //           {team ? `${team.name} Dashboard` : 'Team Dashboard'}
// // //         </h2>

// // //         {team && (
// // //           <>
// // //             {isAdmin && (
// // //               <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
// // //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
// // //                 <form onSubmit={handleFileUpload}>
// // //                   <input
// // //                     type="file"
// // //                     onChange={(e) => setSelectedFile(e.target.files[0])}
// // //                     className="mb-4"
// // //                   />
// // //                   <button
// // //                     type="submit"
// // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // //                   >
// // //                     Upload
// // //                   </button>
// // //                 </form>
// // //               </div>
// // //             )}

// // //             <div className="bg-white shadow-xl rounded-lg p-6">
// // //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
// // //               {files.length === 0 ? (
// // //                 <p className="text-gray-600">No files uploaded yet.</p>
// // //               ) : (
// // //                 <ul className="divide-y divide-gray-200">
// // //                   {files.map((file) => (
// // //                     <li key={file._id} className="py-4 flex justify-between items-center">
// // //                       <span className="text-gray-700">{file.name}</span>
// // //                       <div className="flex space-x-2">
// // //                         <button
// // //                           onClick={() => handleDownload(file._id, file.name)}
// // //                           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // //                         >
// // //                           Download
// // //                         </button>
// // //                         {isAdmin && (
// // //                           <button
// // //                             onClick={() => handleRemove(file._id)}
// // //                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// // //                           >
// // //                             Remove
// // //                           </button>
// // //                         )}
// // //                       </div>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               )}
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TeamDashboard;



// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // const TeamDashboard = () => {
// //   const { teamId } = useParams();
// //   const navigate = useNavigate();
// //   const [team, setTeam] = useState(null);
// //   const [files, setFiles] = useState([]);
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState(null);

// //   useEffect(() => {
// //     fetchTeamDetails();
// //   }, [teamId]);

// //   const fetchTeamDetails = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         toast.error('Please log in to view team dashboard');
// //         navigate('/login');
// //         return;
// //       }

// //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
// //       setTeam(response.data.team);
// //       setFiles(response.data.team.files || []);
// //       setIsAdmin(response.data.isAdmin);
// //     } catch (error) {
// //       console.error('Error fetching team details:', error);
// //       toast.error('Failed to load team dashboard');
// //     }
// //   };

// //   const handleFileUpload = async (e) => {
// //     e.preventDefault();
// //     if (!selectedFile) {
// //       toast.error('Please select a file to upload');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('file', selectedFile);

// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       setFiles([...files, response.data.file]);
// //       setSelectedFile(null);
// //       toast.success('File uploaded successfully');
// //       fetchTeamDetails();
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       if (error.response && error.response.status === 409) {
// //         const { message, existingFile } = error.response.data;
// //         toast.error(
// //           <div>
// //             <p>{message}</p>
// //             <p>Click below to view or download the existing file.</p>
// //             <button
// //               onClick={() => handleDownload(existingFile.id, existingFile.name)}
// //               className="text-blue-600 underline mt-2"
// //             >
// //               View/Download: {existingFile.name}
// //             </button>
// //           </div>,
// //           { duration: 7000 }
// //         );
// //       } else {
// //         toast.error(`Failed to upload file: ${error.response?.data?.message || error.message}`);
// //       }
// //     }
// //   };

// //   const handleDownload = async (fileId, fileName) => {
// //     const token = localStorage.getItem('token');
// //     try {
// //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //         responseType: 'blob',
// //       });

// //       // Status 200: File stream received, trigger download
// //       const url = window.URL.createObjectURL(response.data);
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.setAttribute('download', fileName);
// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();
// //       toast.success('File downloaded successfully');
// //     } catch (error) {
// //       if (error.response && error.response.status === 403) {
// //         // Status 403: File already downloaded, parse JSON from blob
// //         const reader = new FileReader();
// //         reader.onload = () => {
// //           try {
// //             const data = JSON.parse(reader.result);
// //             const { message, fileUrl } = data;

// //             console.log('File URL received in frontend:', fileUrl);

// //             const fileExtension = fileName.split('.').pop().toLowerCase();
// //             const isOfficeFile = ['docx', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileExtension);

// //             // Construct URL for viewing
// //             const viewUrl = isOfficeFile
// //               ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
// //               : fileUrl;

// //             // Show toast with "View the file" button
// //             toast.error(
// //               <div>
// //                 <p>{message}</p>
// //                 <button
// //                   onClick={() => window.open(viewUrl, '_blank')}
// //                   className="text-blue-600 underline mt-2"
// //                 >
// //                   View: {fileName}
// //                 </button>
// //               </div>,
// //               { duration: 7000 }
// //             );
// //           } catch (parseError) {
// //             console.error('Error parsing JSON:', parseError);
// //             toast.error('Failed to process server response');
// //           }
// //         };
// //         reader.readAsText(error.response.data);
// //       } else {
// //         console.error('Error downloading file:', error);
// //         toast.error(`Failed to download file: ${error.response?.data?.message || error.message}`);
// //       }
// //     }
// //   };

// //   const handleRemove = async (fileId) => {
// //     if (!window.confirm('Are you sure you want to remove this file?')) return;
// //     if (!isAdmin) {
// //       toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
// //         duration: 5000,
// //       });
// //       return;
// //     }
// //     try {
// //       const token = localStorage.getItem('token');
// //       console.log('Removing file:', { teamId, fileId, token });
// //       await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       setFiles(files.filter((file) => file._id !== fileId));
// //       fetchTeamDetails();
// //       toast.success('File removed successfully');
// //     } catch (error) {
// //       console.error('Error removing file:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to remove file';
// //       toast.error(errorMessage, { duration: 5000 });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
// //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// //           {team ? `${team.name} Dashboard` : 'Team Dashboard'}
// //         </h2>

// //         {team && (
// //           <>
// //             {isAdmin && (
// //               <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
// //                 <form onSubmit={handleFileUpload}>
// //                   <input
// //                     type="file"
// //                     onChange={(e) => setSelectedFile(e.target.files[0])}
// //                     className="mb-4"
// //                   />
// //                   <button
// //                     type="submit"
// //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// //                   >
// //                     Upload
// //                   </button>
// //                 </form>
// //               </div>
// //             )}

// //             <div className="bg-white shadow-xl rounded-lg p-6">
// //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
// //               {files.length === 0 ? (
// //                 <p className="text-gray-600">No files uploaded yet.</p>
// //               ) : (
// //                 <ul className="divide-y divide-gray-200">
// //                   {files.map((file) => (
// //                     <li key={file._id} className="py-4 flex justify-between items-center">
// //                       <span className="text-gray-700">{file.name}</span>
// //                       <div className="flex space-x-2">
// //                         <button
// //                           onClick={() => handleDownload(file._id, file.name)}
// //                           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// //                         >
// //                           Download
// //                         </button>
// //                         {isAdmin && (
// //                           <button
// //                             onClick={() => handleRemove(file._id)}
// //                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// //                           >
// //                             Remove
// //                           </button>
// //                         )}
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeamDashboard;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Chat from './Chat'; // Import the Chat component

const TeamDashboard = () => {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [files, setFiles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchTeamDetails();
    }, [teamId]);

    const fetchTeamDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to view team dashboard');
                navigate('/login');
                return;
            }

            const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
            setTeam(response.data.team);
            setFiles(response.data.team.files || []);
            setIsAdmin(response.data.isAdmin);
        } catch (error) {
            console.error('Error fetching team details:', error);
            toast.error('Failed to load team dashboard');
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.error('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFiles([...files, response.data.file]);
            setSelectedFile(null);
            toast.success('File uploaded successfully');
            fetchTeamDetails();
        } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response && error.response.status === 409) {
                const { message, existingFile } = error.response.data;
                toast.error(
                    <div>
                        <p>{message}</p>
                        <p>Click below to view or download the existing file.</p>
                        <button
                            onClick={() => handleDownload(existingFile.id, existingFile.name)}
                            className="text-blue-600 underline mt-2"
                        >
                            View/Download: {existingFile.name}
                        </button>
                    </div>,
                    { duration: 7000 }
                );
            } else {
                toast.error(`Failed to upload file: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    const handleDownload = async (fileId, fileName) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            // Status 200: File stream received, trigger download
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('File downloaded successfully');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Status 403: File already downloaded, parse JSON from blob
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const data = JSON.parse(reader.result);
                        const { message, fileUrl } = data;

                        console.log('File URL received in frontend:', fileUrl);

                        const fileExtension = fileName.split('.').pop().toLowerCase();
                        const isOfficeFile = ['docx', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileExtension);

                        // Construct URL for viewing
                        const viewUrl = isOfficeFile
                            ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
                            : fileUrl;

                        // Show toast with "View the file" button
                        toast.error(
                            <div>
                                <p>{message}</p>
                                <button
                                    onClick={() => window.open(viewUrl, '_blank')}
                                    className="text-blue-600 underline mt-2"
                                >
                                    View: {fileName}
                                </button>
                            </div>,
                            { duration: 7000 }
                        );
                    } catch (parseError) {
                        console.error('Error parsing JSON:', parseError);
                        toast.error('Failed to process server response');
                    }
                };
                reader.readAsText(error.response.data);
            } else {
                console.error('Error downloading file:', error);
                toast.error(`Failed to download file: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    const handleRemove = async (fileId) => {
        if (!window.confirm('Are you sure you want to remove this file?')) return;
        if (!isAdmin) {
            toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
                duration: 5000,
            });
            return;
        }
        try {
            const token = localStorage.getItem('token');
            console.log('Removing file:', { teamId, fileId, token });
            await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setFiles(files.filter((file) => file._id !== fileId));
            fetchTeamDetails();
            toast.success('File removed successfully');
        } catch (error) {
            console.error('Error removing file:', error);
            const errorMessage = error.response?.data?.message || 'Failed to remove file';
            toast.error(errorMessage, { duration: 5000 });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
                    {team ? `${team.name} Dashboard` : 'Team Dashboard'}
                </h2>

                {team && (
                    <>
                        {isAdmin && (
                            <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
                                <form onSubmit={handleFileUpload}>
                                    <input
                                        type="file"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        className="mb-4"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    >
                                        Upload
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
                            {files.length === 0 ? (
                                <p className="text-gray-600">No files uploaded yet.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {files.map((file) => (
                                        <li key={file._id} className="py-4 flex justify-between items-center">
                                            <span className="text-gray-700">{file.name}</span>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleDownload(file._id, file.name)}
                                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                                >
                                                    Download
                                                </button>
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => handleRemove(file._id)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Chat Section */}
                        <div className="bg-white shadow-xl rounded-lg p-6">
                            <Chat teamId={teamId} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamDashboard;


