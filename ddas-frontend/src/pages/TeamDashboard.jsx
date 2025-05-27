
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // import axios from 'axios';
// // // // // // import toast from 'react-hot-toast';

// // // // // // const TeamDashboard = () => {
// // // // // //   const { teamId } = useParams();
// // // // // //   const navigate = useNavigate();
// // // // // //   const [team, setTeam] = useState(null);
// // // // // //   const [files, setFiles] = useState([]);
// // // // // //   const [isAdmin, setIsAdmin] = useState(false);
// // // // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     fetchTeamDetails();
// // // // // //   }, [teamId]);

// // // // // //   const fetchTeamDetails = async () => {
// // // // // //     try {
// // // // // //       const token = localStorage.getItem('token');
// // // // // //       if (!token) {
// // // // // //         toast.error('Please log in to view team dashboard');
// // // // // //         navigate('/login');
// // // // // //         return;
// // // // // //       }

// // // // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });

// // // // // //       console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
// // // // // //       setTeam(response.data.team);
// // // // // //       setFiles(response.data.team.files || []);
// // // // // //       setIsAdmin(response.data.isAdmin);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching team details:', error);
// // // // // //       toast.error('Failed to load team dashboard');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleFileUpload = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!selectedFile) {
// // // // // //       toast.error('Please select a file to upload');
// // // // // //       return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     formData.append('file', selectedFile);

// // // // // //     try {
// // // // // //       const token = localStorage.getItem('token');
// // // // // //       const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
// // // // // //         headers: {
// // // // // //           Authorization: `Bearer ${token}`,
// // // // // //           'Content-Type': 'multipart/form-data',
// // // // // //         },
// // // // // //       });

// // // // // //       setFiles([...files, response.data.file]);
// // // // // //       setSelectedFile(null);
// // // // // //       toast.success('File uploaded successfully');
// // // // // //       fetchTeamDetails();
// // // // // //     } catch (error) {
// // // // // //       console.error('Error uploading file:', error);
// // // // // //       toast.error('Failed to upload file');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDownload = async (fileId, fileName) => {
// // // // // //     const token = localStorage.getItem('token');
// // // // // //     try {
// // // // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //         responseType: 'blob',
// // // // // //       });

// // // // // //       // Status 200: File stream received, trigger download
// // // // // //       const url = window.URL.createObjectURL(response.data);
// // // // // //       const link = document.createElement('a');
// // // // // //       link.href = url;
// // // // // //       link.setAttribute('download', fileName);
// // // // // //       document.body.appendChild(link);
// // // // // //       link.click();
// // // // // //       link.remove();
// // // // // //       toast.success('File downloaded successfully');
// // // // // //     } catch (error) {
// // // // // //       if (error.response && error.response.status === 403) {
// // // // // //         // Status 403: File already downloaded, parse JSON from blob
// // // // // //         const reader = new FileReader();
// // // // // //         reader.onload = () => {
// // // // // //           try {
// // // // // //             const data = JSON.parse(reader.result);
// // // // // //             const { message, fileUrl } = data;

// // // // // //             console.log('File URL received in frontend:', fileUrl);

// // // // // //             const fileExtension = fileName.split('.').pop().toLowerCase();
// // // // // //             const isDocx = fileExtension === 'docx';

// // // // // //             // Construct URL for viewing
// // // // // //             const viewUrl = isDocx
// // // // // //               ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
// // // // // //               : fileUrl;

// // // // // //             // Show toast with "View the file" button
// // // // // //             toast.error(
// // // // // //               <div>
// // // // // //                 <p>{message}</p>
// // // // // //                 <br />
// // // // // //                 <button
// // // // // //                   onClick={() => window.open(viewUrl, '_blank')}
// // // // // //                   className="text-blue-600 underline"
// // // // // //                 >
// // // // // //                   View the file
// // // // // //                 </button>
// // // // // //               </div>,
// // // // // //               { duration: 5000 }
// // // // // //             );
// // // // // //           } catch (parseError) {
// // // // // //             console.error('Error parsing JSON:', parseError);
// // // // // //             toast.error('Failed to process server response');
// // // // // //           }
// // // // // //         };
// // // // // //         reader.readAsText(error.response.data);
// // // // // //       } else {
// // // // // //         console.error('Error downloading file:', error);
// // // // // //         toast.error('Failed to download file');
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleRemove = async (fileId) => {
// // // // // //     if (!window.confirm('Are you sure you want to remove this file?')) return;
// // // // // //     if (!isAdmin) {
// // // // // //       toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
// // // // // //         duration: 5000,
// // // // // //       });
// // // // // //       return;
// // // // // //     }
// // // // // //     try {
// // // // // //       const token = localStorage.getItem('token');
// // // // // //       console.log('Removing file:', { teamId, fileId, token });
// // // // //       // await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
// // // // //       //   headers: { Authorization: `Bearer ${token}` },
// // // // //       // });
// // // // // //       setFiles(files.filter((file) => file._id !== fileId));
// // // // // //       fetchTeamDetails();
// // // // // //       toast.success('File removed successfully');
// // // // // //     } catch (error) {
// // // // // //       console.error('Error removing file:', error);
// // // // // //       const errorMessage = error.response?.data?.message || 'Failed to remove file';
// // // // // //       toast.error(errorMessage, { duration: 5000 });
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // // // // //       <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
// // // // // //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// // // // // //           {team ? `${team.name} Dashboard` : 'Team Dashboard'}
// // // // // //         </h2>

// // // // // //         {team && (
// // // // // //           <>
// // // // // //             {isAdmin && (
// // // // // //               <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
// // // // // //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
// // // // // //                 <form onSubmit={handleFileUpload}>
// // // // // //                   <input
// // // // // //                     type="file"
// // // // // //                     onChange={(e) => setSelectedFile(e.target.files[0])}
// // // // // //                     className="mb-4"
// // // // // //                   />
// // // // // //                   <button
// // // // // //                     type="submit"
// // // // // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // // // //                   >
// // // // // //                     Upload
// // // // // //                   </button>
// // // // // //                 </form>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             <div className="bg-white shadow-xl rounded-lg p-6">
// // // // // //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
// // // // // //               {files.length === 0 ? (
// // // // // //                 <p className="text-gray-600">No files uploaded yet.</p>
// // // // // //               ) : (
// // // // // //                 <ul className="divide-y divide-gray-200">
// // // // // //                   {files.map((file) => (
// // // // // //                     <li key={file._id} className="py-4 flex justify-between items-center">
// // // // // //                       <span className="text-gray-700">{file.name}</span>
// // // // // //                       <div className="flex space-x-2">
// // // // // //                         <button
// // // // // //                           onClick={() => handleDownload(file._id, file.name)}
// // // // // //                           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // // // //                         >
// // // // // //                           Download
// // // // // //                         </button>
// // // // // //                         {isAdmin && (
// // // // // //                           <button
// // // // // //                             onClick={() => handleRemove(file._id)}
// // // // // //                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// // // // // //                           >
// // // // // //                             Remove
// // // // // //                           </button>
// // // // // //                         )}
// // // // // //                       </div>
// // // // // //                     </li>
// // // // // //                   ))}
// // // // // //                 </ul>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default TeamDashboard;



// // // // 1st corrcet
// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import axios from 'axios';
// // // // import toast from 'react-hot-toast';

// // // // const TeamDashboard = () => {
// // // //   const { teamId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [team, setTeam] = useState(null);
// // // //   const [files, setFiles] = useState([]);
// // // //   const [isAdmin, setIsAdmin] = useState(false);
// // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchTeamDetails();
// // // //   }, [teamId]);

// // // //   const fetchTeamDetails = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         toast.error('Please log in to view team dashboard');
// // // //         navigate('/login');
// // // //         return;
// // // //       }

// // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
// // // //       setTeam(response.data.team);
// // // //       setFiles(response.data.team.files || []);
// // // //       setIsAdmin(response.data.isAdmin);
// // // //     } catch (error) {
// // // //       console.error('Error fetching team details:', error);
// // // //       toast.error('Failed to load team dashboard');
// // // //     }
// // // //   };

// // // //   const handleFileUpload = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!selectedFile) {
// // // //       toast.error('Please select a file to upload');
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('file', selectedFile);

// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //           'Content-Type': 'multipart/form-data',
// // // //         },
// // // //       });

// // // //       setFiles([...files, response.data.file]);
// // // //       setSelectedFile(null);
// // // //       toast.success('File uploaded successfully');
// // // //       fetchTeamDetails();
// // // //     } catch (error) {
// // // //       console.error('Error uploading file:', error);
// // // //       toast.error('Failed to upload file');
// // // //     }
// // // //   };

// // // //   const handleDownload = async (fileId, fileName) => {
// // // //     const token = localStorage.getItem('token');
// // // //     try {
// // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //         responseType: 'blob',
// // // //       });

// // // //       // Status 200: File stream received, trigger download
// // // //       const url = window.URL.createObjectURL(response.data);
// // // //       const link = document.createElement('a');
// // // //       link.href = url;
// // // //       link.setAttribute('download', fileName);
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       link.remove();
// // // //       toast.success('File downloaded successfully');
// // // //     } catch (error) {
// // // //       if (error.response && error.response.status === 403) {
// // // //         // Status 403: File already downloaded, parse JSON from blob
// // // //         const reader = new FileReader();
// // // //         reader.onload = () => {
// // // //           try {
// // // //             const data = JSON.parse(reader.result);
// // // //             const { message, fileUrl } = data;

// // // //             console.log('File URL received in frontend:', fileUrl);

// // // //             const fileExtension = fileName.split('.').pop().toLowerCase();
// // // //             const isOfficeFile = ['docx', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileExtension);

// // // //             // Construct URL for viewing
// // // //             const viewUrl = isOfficeFile
// // // //               ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
// // // //               : fileUrl;

// // // //             // Show toast with "View the file" button
// // // //             toast.error(
// // // //               <div>
// // // //                 <p>{message}</p>
// // // //                 <br />
// // // //                 <button
// // // //                   onClick={() => window.open(viewUrl, '_blank')}
// // // //                   className="text-blue-600 underline"
// // // //                 >
// // // //                   View the file
// // // //                 </button>
// // // //               </div>,
// // // //               { duration: 5000 }
// // // //             );
// // // //           } catch (parseError) {
// // // //             console.error('Error parsing JSON:', parseError);
// // // //             toast.error('Failed to process server response');
// // // //           }
// // // //         };
// // // //         reader.readAsText(error.response.data);
// // // //       } else {
// // // //         console.error('Error downloading file:', error);
// // // //         toast.error('Failed to download file');
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleRemove = async (fileId) => {
// // // //     if (!window.confirm('Are you sure you want to remove this file?')) return;
// // // //     if (!isAdmin) {
// // // //       toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
// // // //         duration: 5000,
// // // //       });
// // // //       return;
// // // //     }
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       console.log('Removing file:', { teamId, fileId, token });
// // // //       // await axios.delete(`http://localhost:5050/v1/teams/${teamId?/files/${fileId}`, {
// // // //       //   headers: { Authorization: `Bearer ${token}` },
// // // //       // });

// // // //       await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       setFiles(files.filter((file) => file._id !== fileId));
// // // //       fetchTeamDetails();
// // // //       toast.success('File removed successfully');
// // // //     } catch (error) {
// // // //       console.error('Error removing file:', error);
// // // //       const errorMessage = error.response?.data?.message || 'Failed to remove file';
// // // //       toast.error(errorMessage, { duration: 5000 });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // // //       <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
// // // //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// // // //           {team ? `${team.name} Dashboard` : 'Team Dashboard'}
// // // //         </h2>

// // // //         {team && (
// // // //           <>
// // // //             {isAdmin && (
// // // //               <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
// // // //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
// // // //                 <form onSubmit={handleFileUpload}>
// // // //                   <input
// // // //                     type="file"
// // // //                     onChange={(e) => setSelectedFile(e.target.files[0])}
// // // //                     className="mb-4"
// // // //                   />
// // // //                   <button
// // // //                     type="submit"
// // // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // //                   >
// // // //                     Upload
// // // //                   </button>
// // // //                 </form>
// // // //               </div>
// // // //             )}

// // // //             <div className="bg-white shadow-xl rounded-lg p-6">
// // // //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
// // // //               {files.length === 0 ? (
// // // //                 <p className="text-gray-600">No files uploaded yet.</p>
// // // //               ) : (
// // // //                 <ul className="divide-y divide-gray-200">
// // // //                   {files.map((file) => (
// // // //                     <li key={file._id} className="py-4 flex justify-between items-center">
// // // //                       <span className="text-gray-700">{file.name}</span>
// // // //                       <div className="flex space-x-2">
// // // //                         <button
// // // //                           onClick={() => handleDownload(file._id, file.name)}
// // // //                           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // //                         >
// // // //                           Download
// // // //                         </button>
// // // //                         {isAdmin && (
// // // //                           <button
// // // //                             onClick={() => handleRemove(file._id)}
// // // //                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// // // //                           >
// // // //                             Remove
// // // //                           </button>
// // // //                         )}
// // // //                       </div>
// // // //                     </li>
// // // //                   ))}
// // // //                 </ul>
// // // //               )}
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TeamDashboard;



// // // // 2nd corrrcet
// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import axios from 'axios';
// // // // import toast from 'react-hot-toast';

// // // // const TeamDashboard = () => {
// // // //   const { teamId } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [team, setTeam] = useState(null);
// // // //   const [files, setFiles] = useState([]);
// // // //   const [isAdmin, setIsAdmin] = useState(false);
// // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchTeamDetails();
// // // //   }, [teamId]);

// // // //   const fetchTeamDetails = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       if (!token) {
// // // //         toast.error('Please log in to view team dashboard');
// // // //         navigate('/login');
// // // //         return;
// // // //       }

// // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
// // // //       setTeam(response.data.team);
// // // //       setFiles(response.data.team.files || []);
// // // //       setIsAdmin(response.data.isAdmin);
// // // //     } catch (error) {
// // // //       console.error('Error fetching team details:', error);
// // // //       toast.error('Failed to load team dashboard');
// // // //     }
// // // //   };

// // // //   const handleFileUpload = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!selectedFile) {
// // // //       toast.error('Please select a file to upload');
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('file', selectedFile);

// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
// // // //         headers: {
// // // //           Authorization: `Bearer ${token}`,
// // // //           'Content-Type': 'multipart/form-data',
// // // //         },
// // // //       });

// // // //       setFiles([...files, response.data.file]);
// // // //       setSelectedFile(null);
// // // //       toast.success('File uploaded successfully');
// // // //       fetchTeamDetails();
// // // //     } catch (error) {
// // // //       console.error('Error uploading file:', error);
// // // //       if (error.response && error.response.status === 409) {
// // // //         const { message, existingFile } = error.response.data;
// // // //         toast.error(
// // // //           <div>
// // // //             <p>{message}</p>
// // // //             <br />
// // // //             <button
// // // //               onClick={() => handleDownload(existingFile.id, existingFile.name)}
// // // //               className="text-blue-600 underline"
// // // //             >
// // // //               View/Download the existing file
// // // //             </button>
// // // //           </div>,
// // // //           { duration: 5000 }
// // // //         );
// // // //       } else {
// // // //         toast.error('Failed to upload file');
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleDownload = async (fileId, fileName) => {
// // // //     const token = localStorage.getItem('token');
// // // //     try {
// // // //       const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //         responseType: 'blob',
// // // //       });

// // // //       // Status 200: File stream received, trigger download
// // // //       const url = window.URL.createObjectURL(response.data);
// // // //       const link = document.createElement('a');
// // // //       link.href = url;
// // // //       link.setAttribute('download', fileName);
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       link.remove();
// // // //       toast.success('File downloaded successfully');
// // // //     } catch (error) {
// // // //       if (error.response && error.response.status === 403) {
// // // //         // Status 403: File already downloaded, parse JSON from blob
// // // //         const reader = new FileReader();
// // // //         reader.onload = () => {
// // // //           try {
// // // //             const data = JSON.parse(reader.result);
// // // //             const { message, fileUrl } = data;

// // // //             console.log('File URL received in frontend:', fileUrl);

// // // //             const fileExtension = fileName.split('.').pop().toLowerCase();
// // // //             const isOfficeFile = ['docx', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileExtension);

// // // //             // Construct URL for viewing
// // // //             const viewUrl = isOfficeFile
// // // //               ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
// // // //               : fileUrl;

// // // //             // Show toast with "View the file" button
// // // //             toast.error(
// // // //               <div>
// // // //                 <p>{message}</p>
// // // //                 <br />
// // // //                 <button
// // // //                   onClick={() => window.open(viewUrl, '_blank')}
// // // //                   className="text-blue-600 underline"
// // // //                 >
// // // //                   View the file
// // // //                 </button>
// // // //               </div>,
// // // //               { duration: 5000 }
// // // //             );
// // // //           } catch (parseError) {
// // // //             console.error('Error parsing JSON:', parseError);
// // // //             toast.error('Failed to process server response');
// // // //           }
// // // //         };
// // // //         reader.readAsText(error.response.data);
// // // //       } else {
// // // //         console.error('Error downloading file:', error);
// // // //         toast.error('Failed to download file');
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleRemove = async (fileId) => {
// // // //     if (!window.confirm('Are you sure you want to remove this file?')) return;
// // // //     if (!isAdmin) {
// // // //       toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
// // // //         duration: 5000,
// // // //       });
// // // //       return;
// // // //     }
// // // //     try {
// // // //       const token = localStorage.getItem('token');
// // // //       console.log('Removing file:', { teamId, fileId, token });
// // // //       await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       setFiles(files.filter((file) => file._id !== fileId));
// // // //       fetchTeamDetails();
// // // //       toast.success('File removed successfully');
// // // //     } catch (error) {
// // // //       console.error('Error removing file:', error);
// // // //       const errorMessage = error.response?.data?.message || 'Failed to remove file';
// // // //       toast.error(errorMessage, { duration: 5000 });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // // //       <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
// // // //         <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
// // // //           {team ? `${team.name} Dashboard` : 'Team Dashboard'}
// // // //         </h2>

// // // //         {team && (
// // // //           <>
// // // //             {isAdmin && (
// // // //               <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
// // // //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
// // // //                 <form onSubmit={handleFileUpload}>
// // // //                   <input
// // // //                     type="file"
// // // //                     onChange={(e) => setSelectedFile(e.target.files[0])}
// // // //                     className="mb-4"
// // // //                   />
// // // //                   <button
// // // //                     type="submit"
// // // //                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // //                   >
// // // //                     Upload
// // // //                   </button>
// // // //                 </form>
// // // //               </div>
// // // //             )}

// // // //             <div className="bg-white shadow-xl rounded-lg p-6">
// // // //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
// // // //               {files.length === 0 ? (
// // // //                 <p className="text-gray-600">No files uploaded yet.</p>
// // // //               ) : (
// // // //                 <ul className="divide-y divide-gray-200">
// // // //                   {files.map((file) => (
// // // //                     <li key={file._id} className="py-4 flex justify-between items-center">
// // // //                       <span className="text-gray-700">{file.name}</span>
// // // //                       <div className="flex space-x-2">
// // // //                         <button
// // // //                           onClick={() => handleDownload(file._id, file.name)}
// // // //                           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
// // // //                         >
// // // //                           Download
// // // //                         </button>
// // // //                         {isAdmin && (
// // // //                           <button
// // // //                             onClick={() => handleRemove(file._id)}
// // // //                             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
// // // //                           >
// // // //                             Remove
// // // //                           </button>
// // // //                         )}
// // // //                       </div>
// // // //                     </li>
// // // //                   ))}
// // // //                 </ul>
// // // //               )}
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TeamDashboard;



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
// // //             <p>Click below to view or download the existing file.</p>
// // //             <button
// // //               onClick={() => handleDownload(existingFile.id, existingFile.name)}
// // //               className="text-blue-600 underline mt-2"
// // //             >
// // //               View/Download: {existingFile.name}
// // //             </button>
// // //           </div>,
// // //           { duration: 7000 }
// // //         );
// // //       } else {
// // //         toast.error(`Failed to upload file: ${error.response?.data?.message || error.message}`);
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
// // //                 <button
// // //                   onClick={() => window.open(viewUrl, '_blank')}
// // //                   className="text-blue-600 underline mt-2"
// // //                 >
// // //                   View: {fileName}
// // //                 </button>
// // //               </div>,
// // //               { duration: 7000 }
// // //             );
// // //           } catch (parseError) {
// // //             console.error('Error parsing JSON:', parseError);
// // //             toast.error('Failed to process server response');
// // //           }
// // //         };
// // //         reader.readAsText(error.response.data);
// // //       } else {
// // //         console.error('Error downloading file:', error);
// // //         toast.error(`Failed to download file: ${error.response?.data?.message || error.message}`);
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


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import Chat from './Chat'; // Import the Chat component

// const TeamDashboard = () => {
//     const { teamId } = useParams();
//     const navigate = useNavigate();
//     const [team, setTeam] = useState(null);
//     const [files, setFiles] = useState([]);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);

//     useEffect(() => {
//         fetchTeamDetails();
//     }, [teamId]);

//     const fetchTeamDetails = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('Please log in to view team dashboard');
//                 navigate('/login');
//                 return;
//             }

//             const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             console.log('Team response:', { team: response.data.team, isAdmin: response.data.isAdmin });
//             setTeam(response.data.team);
//             setFiles(response.data.team.files || []);
//             setIsAdmin(response.data.isAdmin);
//         } catch (error) {
//             console.error('Error fetching team details:', error);
//             toast.error('Failed to load team dashboard');
//         }
//     };

//     const handleFileUpload = async (e) => {
//         e.preventDefault();
//         if (!selectedFile) {
//             toast.error('Please select a file to upload');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', selectedFile);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(`http://localhost:5050/v1/teams/${teamId}/upload`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             setFiles([...files, response.data.file]);
//             setSelectedFile(null);
//             toast.success('File uploaded successfully');
//             fetchTeamDetails();
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             if (error.response && error.response.status === 409) {
//                 const { message, existingFile } = error.response.data;
//                 toast.error(
//                     <div>
//                         <p>{message}</p>
//                         <p>Click below to view or download the existing file.</p>
//                         <button
//                             onClick={() => handleDownload(existingFile.id, existingFile.name)}
//                             className="text-blue-600 underline mt-2"
//                         >
//                             View/Download: {existingFile.name}
//                         </button>
//                     </div>,
//                     { duration: 7000 }
//                 );
//             } else {
//                 toast.error(`Failed to upload file: ${error.response?.data?.message || error.message}`);
//             }
//         }
//     };

//     const handleDownload = async (fileId, fileName) => {
//         const token = localStorage.getItem('token');
//         try {
//             const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//                 responseType: 'blob',
//             });

//             // Status 200: File stream received, trigger download
//             const url = window.URL.createObjectURL(response.data);
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', fileName);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             toast.success('File downloaded successfully');
//         } catch (error) {
//             if (error.response && error.response.status === 403) {
//                 // Status 403: File already downloaded, parse JSON from blob
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                     try {
//                         const data = JSON.parse(reader.result);
//                         const { message, fileUrl } = data;

//                         console.log('File URL received in frontend:', fileUrl);

//                         const fileExtension = fileName.split('.').pop().toLowerCase();
//                         const isOfficeFile = ['docx', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileExtension);

//                         // Construct URL for viewing
//                         const viewUrl = isOfficeFile
//                             ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`
//                             : fileUrl;

//                         // Show toast with "View the file" button
//                         toast.error(
//                             <div>
//                                 <p>{message}</p>
//                                 <button
//                                     onClick={() => window.open(viewUrl, '_blank')}
//                                     className="text-blue-600 underline mt-2"
//                                 >
//                                     View: {fileName}
//                                 </button>
//                             </div>,
//                             { duration: 7000 }
//                         );
//                     } catch (parseError) {
//                         console.error('Error parsing JSON:', parseError);
//                         toast.error('Failed to process server response');
//                     }
//                 };
//                 reader.readAsText(error.response.data);
//             } else {
//                 console.error('Error downloading file:', error);
//                 toast.error(`Failed to download file: ${error.response?.data?.message || error.message}`);
//             }
//         }
//     };

//     const handleRemove = async (fileId) => {
//         if (!window.confirm('Are you sure you want to remove this file?')) return;
//         if (!isAdmin) {
//             toast.error('You do not have permission to remove files. Only the team creator can perform this action.', {
//                 duration: 5000,
//             });
//             return;
//         }
//         try {
//             const token = localStorage.getItem('token');
//             console.log('Removing file:', { teamId, fileId, token });
//             await axios.delete(`http://localhost:5050/v1/teams/${teamId}/files/${fileId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             setFiles(files.filter((file) => file._id !== fileId));
//             fetchTeamDetails();
//             toast.success('File removed successfully');
//         } catch (error) {
//             console.error('Error removing file:', error);
//             const errorMessage = error.response?.data?.message || 'Failed to remove file';
//             toast.error(errorMessage, { duration: 5000 });
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
//             <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
//                 <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
//                     {team ? `${team.name} Dashboard` : 'Team Dashboard'}
//                 </h2>

//                 {team && (
//                     <>
//                         {isAdmin && (
//                             <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
//                                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h3>
//                                 <form onSubmit={handleFileUpload}>
//                                     <input
//                                         type="file"
//                                         onChange={(e) => setSelectedFile(e.target.files[0])}
//                                         className="mb-4"
//                                     />
//                                     <button
//                                         type="submit"
//                                         className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//                                     >
//                                         Upload
//                                     </button>
//                                 </form>
//                             </div>
//                         )}

//                         <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
//                             <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Files</h3>
//                             {files.length === 0 ? (
//                                 <p className="text-gray-600">No files uploaded yet.</p>
//                             ) : (
//                                 <ul className="divide-y divide-gray-200">
//                                     {files.map((file) => (
//                                         <li key={file._id} className="py-4 flex justify-between items-center">
//                                             <span className="text-gray-700">{file.name}</span>
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleDownload(file._id, file.name)}
//                                                     className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//                                                 >
//                                                     Download
//                                                 </button>
//                                                 {isAdmin && (
//                                                     <button
//                                                         onClick={() => handleRemove(file._id)}
//                                                         className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                                                     >
//                                                         Remove
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>

//                         {/* Chat Section */}
//                         <div className="bg-white shadow-xl rounded-lg p-6">
//                             <Chat teamId={teamId} />
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TeamDashboard;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Upload, Download, Trash2, FileText, Users, Shield, Database } from 'lucide-react';
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

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        const colors = {
            pdf: 'text-red-500',
            doc: 'text-blue-600',
            docx: 'text-blue-600',
            xls: 'text-green-600',
            xlsx: 'text-green-600',
            ppt: 'text-orange-500',
            pptx: 'text-orange-500',
            txt: 'text-gray-600',
            default: 'text-indigo-600'
        };
        return colors[extension] || colors.default;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 to-indigo-600/10 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-800 rounded-full text-sm font-medium mb-6 shadow-lg">
                            <Users className="w-4 h-4 mr-2" />
                            Team Collaboration Hub
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {team ? (
                                <>
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        {team.name}
                                    </span>
                                    <br />
                                    <span className="text-2xl md:text-3xl text-gray-700">Dashboard</span>
                                </>
                            ) : (
                                'Team Dashboard'
                            )}
                        </h1>
                        {isAdmin && (
                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
                                <Shield className="w-4 h-4 mr-1" />
                                Admin Access
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
                {team && (
                    <>
                        {/* File Upload Section */}
                        {isAdmin && (
                            <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
                                <div className="flex items-center mb-6">
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                                        <Upload className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Upload New File</h3>
                                </div>
                                
                                <form onSubmit={handleFileUpload} className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                            className="w-full px-4 py-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white hover:file:from-blue-600 hover:file:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                                        />
                                        {selectedFile && (
                                            <div className="mt-3 flex items-center text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-xl">
                                                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                                                Selected: <span className="font-medium ml-1">{selectedFile.name}</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                                    >
                                        <Upload className="w-5 h-5 mr-2" />
                                        Upload File
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Files Section */}
                        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 mb-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
                            <div className="flex items-center mb-8">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                                    <Database className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Team Files</h3>
                                    <p className="text-gray-600">{files.length} files available</p>
                                </div>
                            </div>

                            {files.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FileText className="h-12 w-12 text-gray-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-500 mb-2">No files uploaded yet</h4>
                                    <p className="text-gray-400">Upload your first file to get started with team collaboration</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {files.map((file, index) => (
                                        <div 
                                            key={file._id} 
                                            className="group bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-gray-50 ${getFileIcon(file.name)}`}>
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                                                            {file.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            File #{index + 1}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center space-x-3 ml-4">
                                                    <button
                                                        onClick={() => handleDownload(file._id, file.name)}
                                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center"
                                                    >
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Download
                                                    </button>
                                                    {isAdmin && (
                                                        <button
                                                            onClick={() => handleRemove(file._id)}
                                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Chat Section */}
                        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-br from-green-500 to-teal-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Team Chat</h3>
                                    <p className="text-gray-600">Collaborate with your team members</p>
                                </div>
                            </div>
                            <Chat teamId={teamId} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamDashboard;