import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-nutri-green font-semibold'
      : 'text-gray-200 hover:text-nutri-green transition duration-300';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-nutri-dark/90 backdrop-blur-md shadow-md px-4 sm:px-6 lg:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold text-nutri-green flex items-center gap-2">
          <img src="/logo.png" alt="NutriAI" className="w-8 h-8" />
          NutriAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-base font-medium">
          <Link to="/home" className={isActive('/home')}>
            Home
          </Link>
          <Link to="/scanner" className={isActive('/scanner')}>
            Scanner
          </Link>
          <Link to="/search" className={isActive('/search')}>
            Calorie Counter
          </Link>
          <Link to="/chatbot" className={isActive('/chatbot')}>
            AI Chatbot
          </Link>
          {user ? (
            <ProfileDropdown logout={handleLogout} />
          ) : (
            <Link
              to="/login"
              className="bg-nutri-green hover:bg-nutri-accent text-white px-4 py-2 rounded-lg transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-nutri-dark mt-4 rounded-lg p-4 flex flex-col gap-4"
        >
          <Link to="/home" className={isActive('/home')} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/scanner" className={isActive('/scanner')} onClick={() => setMenuOpen(false)}>
            Scanner
          </Link>
          <Link to="/search" className={isActive('/search')} onClick={() => setMenuOpen(false)}>
            Calorie Counter
          </Link>
          <Link to="/chatbot" className={isActive('/chatbot')} onClick={() => setMenuOpen(false)}>
            AI Chatbot
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className={isActive('/profile')}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className={isActive('/settings')}
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-nutri-green hover:bg-nutri-accent text-white px-4 py-2 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;