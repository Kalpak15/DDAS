import React from 'react';
import { AlertTriangle, Download, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data Download Duplication Alert System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Optimize your data management with intelligent duplicate detection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <AlertTriangle className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Detection</h3>
            <p className="text-gray-600">
              Automatically identifies potential duplicate downloads before they occur
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Download className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Resource Optimization</h3>
            <p className="text-gray-600">
              Save bandwidth and storage by preventing unnecessary duplicate downloads
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Management</h3>
            <p className="text-gray-600">
              Streamline your organization's data access and storage processes
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
            alt="Data Visualization"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Why Choose DDAS?</h2>
            <p className="text-gray-600 mb-4">
              DDAS is designed to help organizations maintain efficient data management practices
              by preventing duplicate downloads and optimizing resource utilization. Our system
              provides real-time alerts and detailed information about existing datasets.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;