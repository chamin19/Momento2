import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">GTA Tech Events</h3>
            <p className="text-gray-400 mb-4">
              Discover free tech events and programs in the Greater Toronto Area. 
              Make your career growth more accessible.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-400 hover:text-white transition-colors">
                  Event Map
                </Link>
              </li>
            </ul>
          </div>

          {/* GTA Cities */}
          <div>
            <h4 className="text-lg font-semibold mb-4">GTA Cities</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Toronto</li>
              <li>Mississauga</li>
              <li>Brampton</li>
              <li>Markham</li>
              <li>Vaughan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GTA Tech Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
