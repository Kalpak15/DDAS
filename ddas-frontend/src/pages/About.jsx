import React from 'react';
import { CheckCircle, Users, Building } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About DDAS</h1>
          <p className="text-xl text-gray-600">
            Revolutionizing data management through intelligent duplicate detection
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At DDAS, we're committed to optimizing data management processes across organizations.
              Our system helps prevent redundant downloads, save valuable resources, and streamline
              data access for all users.
            </p>
            <div className="mt-6 space-y-4">
              {[
                'Efficient resource utilization',
                'Streamlined data management',
                'Enhanced user collaboration',
                'Real-time duplicate detection'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500 h-5 w-5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              alt="Team Collaboration"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Who We Serve</h3>
            <p className="text-gray-600">
              Academic institutions, research facilities, and organizations seeking
              efficient data management solutions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Building className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
            <p className="text-gray-600">
              Helping organizations save resources and improve collaboration through
              smart data management.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-600">
              Committed to efficiency, innovation, and excellence in data
              management solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;