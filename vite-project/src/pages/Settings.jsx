import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Lock, User } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../constants';
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const { user } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    weight: user?.weight || '',
    goal: user?.goal || 'Maintain',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_URL}/user/profile`,
        profileForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setMessage('Profile updated successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      setMessage('');
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_URL}/user/change-password`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setMessage(res.data.message);
      setError('');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
      setMessage('');
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nutri-dark to-gray-800 text-white"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-nutri-green mb-8 text-center flex items-center justify-center gap-3"
        >
          <SettingsIcon size={36} />
          Settings
        </motion.h2>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-nutri-green text-center mb-4"
          >
            {message}
          </motion.p>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-8"
        >
          <h3 className="text-2xl font-semibold text-nutri-green mb-4 flex items-center gap-2">
            <User size={24} /> Profile Settings
          </h3>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={profileForm.weight}
                onChange={(e) => setProfileForm({ ...profileForm, weight: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Health Goal</label>
              <select
                value={profileForm.goal}
                onChange={(e) => setProfileForm({ ...profileForm, goal: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-nutri-green"
              >
                <option>Maintain</option>
                <option>Lose Weight</option>
                <option>Gain Muscle</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-nutri-green hover:bg-nutri-accent text-white p-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </motion.div>

        {/* Password Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-nutri-green mb-4 flex items-center gap-2">
            <Lock size={24} /> Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-nutri-green hover:bg-nutri-accent text-white p-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;