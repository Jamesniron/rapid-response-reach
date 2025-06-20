
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, User, Phone, Home } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">Emergyfy</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-red-700' : 'hover:bg-red-500'
                }`}
              >
                <Home className="w-4 h-4 inline mr-1" />
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard') ? 'bg-red-700' : 'hover:bg-red-500'
                }`}
              >
                <Bell className="w-4 h-4 inline mr-1" />
                Dashboard
              </Link>
              <Link
                to="/emergency"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/emergency') ? 'bg-red-700' : 'hover:bg-red-500'
                }`}
              >
                <Phone className="w-4 h-4 inline mr-1" />
                Emergency
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/profile') ? 'bg-red-700' : 'hover:bg-red-500'
                }`}
              >
                <User className="w-4 h-4 inline mr-1" />
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
