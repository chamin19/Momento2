import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useCalendar } from '../context/CalendarContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected, connectCalendar, disconnectCalendar } = useCalendar();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Map', path: '/map' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <CalendarIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">GTA Tech Events</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Calendar Connection Button */}
            {isConnected ? (
              <button
                onClick={disconnectCalendar}
                className="flex items-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Calendar Connected</span>
              </button>
            ) : (
              <button
                onClick={connectCalendar}
                className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Connect Calendar</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-base font-medium ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isConnected ? (
              <button
                onClick={() => {
                  disconnectCalendar();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Calendar Connected</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  connectCalendar();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Connect Calendar</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
