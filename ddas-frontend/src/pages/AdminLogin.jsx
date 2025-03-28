import React, { useState } from 'react';

function AdminLogin() {
  const [formData, setFormData] = useState({
    name: '',
    orgName: '',
    adminId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add backend API call here (e.g., fetch('/admin-login', { ... }))
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              id="orgName"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              name="adminId"
              value={formData.adminId}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;