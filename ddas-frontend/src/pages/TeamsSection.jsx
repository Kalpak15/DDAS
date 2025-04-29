
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
      toast.error('Failed to load teams');
    }
  };

  const handleTeamClick = (teamId) => {
    navigate(`/teams/${teamId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
          My Teams
        </h2>
        {teams.length === 0 ? (
          <p className="text-center text-gray-600">No teams found. Create or join a team to get started!</p>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-6">
            {teams.map((team, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{team.name}</h3>
                  <button
                    onClick={() => handleTeamClick(team._id)}
                    className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    aria-label={`View dashboard for ${team.name}`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600">Created by: {team.createdBy ? team.createdBy.email : 'Unknown'}</p>
                <h4 className="text-lg font-medium text-gray-800 mt-2">Members:</h4>
                <ul className="list-disc pl-5 mt-2">
                  {team.members.map((member, memberIndex) => (
                    <li key={memberIndex} className="text-gray-700">{member.email}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsSection;