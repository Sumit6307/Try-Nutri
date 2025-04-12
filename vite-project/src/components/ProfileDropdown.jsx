import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const ProfileDropdown = ({ logout }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-200 hover:text-nutri-green transition"
      >
        <User size={20} />
        <span className="hidden sm:inline">{user?.name || 'Profile'}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg py-2 border border-gray-700"
        >
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-nutri-green/20 hover:text-nutri-green"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} />
            Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-nutri-green/20 hover:text-nutri-green"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} />
            Settings
          </Link>
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-600/20 hover:text-red-300 w-full text-left"
          >
            <LogOut size={16} />
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileDropdown;