


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const TeamDashboard = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [files, setFiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchTeamDetails();
  }, [teamId]); // Depend on teamId to re-fetch if it changes

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
      fetchTeamDetails(); // Re-fetch to ensure consistency
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  };

  const handleDownload = async (fileId, fileName) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const blobResponse = await axios.get(`http://localhost:5050/v1/teams/${teamId}/download/${fileId}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([blobResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success('File downloaded successfully');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const { message = 'File already downloaded.', fileUrl = null } = error.response.data;
        if (!fileUrl || fileUrl.includes('invalid')) {
          toast.error(`Unable to access file. Please contact support. File URL: ${fileUrl || 'not provided'}`);
        } else {
          toast.error(
            <div>
              <p>{message}</p>
              <br />
              <button
                onClick={() => {
                  fetch(fileUrl, { headers: { Authorization: `Bearer ${token}` } })
                    .then((response) => {
                      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                      return response.blob();
                    })
                    .then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      window.open(url, '_blank');
                      console.log('Opened URL with blob:', url);
                    })
                    .catch((err) => {
                      console.error('Failed to open URL:', err);
                      toast.error('Failed to view file. Check server status.');
                    });
                  console.log('Attempted to open URL:', fileUrl);
                }}
                className="text-blue-600 underline"
              >
                View the file in the central repository
              </button>
            </div>,
            { duration: 5000 }
          );
        }
      } else {
        console.error('Error downloading file:', error);
        toast.error('Failed to download file');
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
      fetchTeamDetails(); // Re-fetch to sync with database
      toast.success('File removed successfully');
    } catch (error) {
      console.error('Error removing file:', error);
      const errorMessage = error.response?.data?.message || 'Failed to remove file';
      toast.error(errorMessage, { duration: 5000 });
    }
  };

  const downloadFromCentralRepo = async (fileUrl, fileName, token) => {
    try {
      window.open(fileUrl, '_blank');
      toast.success('Redirected to view file in central repository');
    } catch (error) {
      console.error('Error accessing central repository:', error);
      toast.error('Failed to access file in central repository');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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

            <div className="bg-white shadow-xl rounded-lg p-6">
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
          </>
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;