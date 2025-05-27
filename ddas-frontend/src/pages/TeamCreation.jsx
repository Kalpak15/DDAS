import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


const TeamCreation = () => {
  const { userId } = useParams();
  const [emails, setEmails] = useState(['']); // Array to store email inputs
  const [teamName, setTeamName] = useState(''); // Optional team name
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const PORT=import.meta.env.VITE_APP_API_URL 
  // Handle adding a new email input field
  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  // Handle removing an email input field
  const removeEmailField = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  // Handle email input change
  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate emails
    const validEmails = emails.filter((email) => email.trim() !== '');
    if (validEmails.length === 0) {
      toast.error('Please add at least one valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
     
      if (!token) {
        toast.error('Please log in to create a team');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${PORT}/v1/teams/create/${userId || localStorage.getItem('userId')}`,
        {
          teamName: teamName.trim() || 'Default Team',
          memberEmails: validEmails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || 'Team created successfully!');
      navigate('/'); // Redirect to home or a teams dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create team');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-6xl font-bold text-gray-900 mb-4 animate-fadeInUp"> 
          {/* /*text-center text-4xl font-extrabold text-gray-900 mb-2/* */}
          Create a Team
        </h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Add team members by entering their email addresses
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-10 shadow-xl rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name (Optional)
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Email Inputs */}
            {emails.map((email, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Member Email {index + 1}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    placeholder="Enter team member email"
                    className="appearance-none block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEmailField(index)}
                    className="mt-6 px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {/* Add Email Button */}
            <div>
              <button
                type="button"
                onClick={addEmailField}
                className="w-full flex justify-center py-3 px-4 border border-indigo-600 rounded-lg shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Another Email
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Team...' : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamCreation;

