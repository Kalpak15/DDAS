// import React from 'react';
// import { CheckCircle, Users, Building } from 'lucide-react';

// const About = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">About DDAS</h1>
//           <p className="text-xl text-gray-600">
//             Revolutionizing data management through intelligent duplicate detection
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-12 mb-16">
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
//             <p className="text-gray-600">
//               At DDAS, we're committed to optimizing data management processes across organizations.
//               Our system helps prevent redundant downloads, save valuable resources, and streamline
//               data access for all users.
//             </p>
//             <div className="mt-6 space-y-4">
//               {[
//                 'Efficient resource utilization',
//                 'Streamlined data management',
//                 'Enhanced user collaboration',
//                 'Real-time duplicate detection'
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center space-x-2">
//                   <CheckCircle className="text-green-500 h-5 w-5" />
//                   <span className="text-gray-700">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//             <img
//               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
//               alt="Team Collaboration"
//               className="rounded-lg shadow-md"
//             />
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Users className="h-12 w-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Who We Serve</h3>
//             <p className="text-gray-600">
//               Academic institutions, research facilities, and organizations seeking
//               efficient data management solutions.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <Building className="h-12 w-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
//             <p className="text-gray-600">
//               Helping organizations save resources and improve collaboration through
//               smart data management.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Our Values</h3>
//             <p className="text-gray-600">
//               Committed to efficiency, innovation, and excellence in data
//               management solutions.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import { CheckCircle, Users, Building, Target, Award, Zap, Shield, Globe, TrendingUp, Database, AlertTriangle, Download, Brain, Clock, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 w-full" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', maxWidth: 'none' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4 mr-2" />
              Pioneering AI-Driven Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Revolutionizing
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}Data Intelligence
              </span>
              <br />Since 2024
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're on a mission to eliminate data redundancy and optimize resource utilization through 
              cutting-edge AI technology, empowering organizations to achieve unprecedented efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {/* font-bold */}
                Transforming Data Management for the Digital Age
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At DDAS, we believe that intelligent data management is the cornerstone of organizational efficiency. 
                Our advanced AI algorithms don't just detect duplicates—they predict, prevent, and optimize your 
                entire data ecosystem in real-time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">AI-Powered Prevention</h4>
                    <p className="text-gray-600 text-sm">Stop duplicates before they happen</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Resource Optimization</h4>
                    <p className="text-gray-600 text-sm">Maximize efficiency, minimize waste</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Enterprise Security</h4>
                    <p className="text-gray-600 text-sm">Bank-grade data protection</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Real-Time Monitoring</h4>
                    <p className="text-gray-600 text-sm">24/7 intelligent surveillance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">10TB+</div>
                    <div className="text-gray-600 text-sm">Data Processed Daily</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
                    <div className="text-gray-600 text-sm">Organizations Served</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">45+</div>
                    <div className="text-gray-600 text-sm">Countries Worldwide</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">99.9%</div>
                    <div className="text-gray-600 text-sm">Uptime Guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Born from the frustration of watching organizations waste countless resources on duplicate data, 
              DDAS emerged as the intelligent solution the world needed.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">The Problem</h3>
                <p className="text-gray-600 leading-relaxed">
                  Organizations worldwide were losing millions in bandwidth, storage, and productivity due to 
                  undetected duplicate downloads and inefficient data management practices.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 lg:-translate-y-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">The Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  We developed breakthrough AI algorithms that don't just detect duplicates—they predict and 
                  prevent them, creating a proactive ecosystem that learns and adapts.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">The Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Today, we're proud to help organizations save millions in resources while accelerating 
                  their digital transformation journeys through intelligent data management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that drive everything we do at DDAS
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Innovation First</h3>
              <p className="text-gray-600 leading-relaxed">
                Constantly pushing boundaries with cutting-edge AI and machine learning technologies
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Security & Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data security is paramount—we implement enterprise-grade protection at every level
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Customer Success</h3>
              <p className="text-gray-600 leading-relaxed">
                Every feature we build is designed to deliver measurable value to your organization
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Global Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Making data management more efficient for organizations worldwide, one duplicate at a time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Serve Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering diverse organizations to achieve data management excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise Organizations</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Large corporations managing massive data volumes across multiple departments and locations, 
                requiring enterprise-grade duplicate detection and resource optimization.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-blue-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Fortune 500 companies
                </div>
                <div className="flex items-center text-blue-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Multi-national corporations
                </div>
                <div className="flex items-center text-blue-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Technology giants
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group transform md:-translate-y-4">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Research Institutions</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Academic institutions, laboratories, and research facilities dealing with large datasets, 
                scientific publications, and collaborative research projects worldwide.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-indigo-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Universities & colleges
                </div>
                <div className="flex items-center text-indigo-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Government research labs
                </div>
                <div className="flex items-center text-indigo-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Scientific institutions
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Data-Driven Startups</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Growing companies and startups that need scalable, cost-effective solutions to manage 
                their expanding data requirements without breaking the budget.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-purple-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  SaaS companies
                </div>
                <div className="flex items-center text-purple-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Fintech startups
                </div>
                <div className="flex items-center text-purple-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  AI/ML companies
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Data Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join hundreds of organizations that trust DDAS to optimize their data workflows, 
              reduce costs, and accelerate their digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;