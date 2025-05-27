

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Users, Plus, LogOut, Home, Info, UserPlus, LogIn, Shield } from 'lucide-react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
  const userId = localStorage.getItem('userId');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center group">
            <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="text-white text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                DDAS
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className="group flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/about" 
              className="group flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm"
            >
              <Info className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span>About Us</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link 
                  to={`/teams/create/${userId}`} 
                  className="group flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  <Plus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Create Teams</span>
                </Link>
                
                <Link 
                  to="/teams/join" 
                  className="group flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Join Team</span>
                </Link>
                
                <Link 
                  to="/teams" 
                  className="group flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  <Users className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>My Teams</span>
                </Link>
                
                <div className="h-6 w-px bg-white/20 mx-2"></div>
                
                <button
                  onClick={handleLogout}
                  className="group flex items-center space-x-2 bg-white/90 text-blue-600 hover:bg-white hover:shadow-lg px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link 
                  to="/login" 
                  className="group flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  <LogIn className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Login</span>
                </Link>
                
                <Link 
                  to="/signup" 
                  className="group flex items-center space-x-2 bg-white/90 text-blue-600 hover:bg-white hover:shadow-lg px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-xl text-white hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300 backdrop-blur-sm"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-gradient-to-b from-blue-700/95 to-indigo-700/95 backdrop-blur-lg border-t border-white/10 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link
              to="/"
              className="group flex items-center space-x-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/about"
              className="group flex items-center space-x-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>About Us</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="h-px bg-white/20 my-3"></div>
                
                <Link
                  to={`/teams/create/${userId}`}
                  className="group flex items-center space-x-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Create Teams</span>
                </Link>
                
                <Link
                  to="/teams/join"
                  className="group flex items-center space-x-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Join Team</span>
                </Link>
                
                <Link
                  to="/teams"
                  className="group flex items-center space-x-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>My Teams</span>
                </Link>
                
                <div className="h-px bg-white/20 my-3"></div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="group flex items-center space-x-3 bg-white/90 text-blue-600 hover:bg-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 w-full"
                >
                  <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="h-px bg-white/20 my-3"></div>
                
                <Link
                  to="/login"
                  className="group flex items-center space-x-3 text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Login</span>
                </Link>
                
                <Link
                  to="/signup"
                  className="group flex items-center space-x-3 bg-white/90 text-blue-600 hover:bg-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;