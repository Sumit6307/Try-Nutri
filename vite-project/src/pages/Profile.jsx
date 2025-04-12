import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Target } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../constants';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [daysLeft, setDaysLeft] = useState(30);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchLogs = async () => {
        try {
          const res = await axios.get(`${API_URL}/calories`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setLogs(res.data);
          setTotalCalories(res.data.reduce((sum, log) => sum + log.calories, 0));
        } catch (err) {
          console.error(err);
        }
      };
      fetchLogs();

      const trialStart = new Date(user.trialStart);
      const msInDay = 1000 * 60 * 60 * 24;
      const elapsed = Math.floor((Date.now() - trialStart) / msInDay);
      setDaysLeft(Math.max(0, 30 - elapsed));
    }
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nutri-dark to-gray-800 text-white"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-nutri-green mb-8 text-center flex items-center justify-center gap-3"
        >
          <User size={36} />
          Your Profile
        </motion.h2>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-nutri-green mb-4 flex items-center gap-2">
              <User size={24} /> Account Info
            </h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Trial Started:</strong> {new Date(user?.trialStart).toDateString()}</p>
            <p>
              <strong>Trial Left:</strong>{' '}
              <span className={daysLeft <= 5 ? 'text-red-400' : 'text-nutri-green'}>
                {daysLeft} day(s)
              </span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-nutri-green mb-4 flex items-center gap-2">
              <Target size={24} /> Health Goals
            </h3>
            <p><strong>Weight:</strong> {user?.weight || 'Not set'} kg</p>
            <p><strong>Goal:</strong> {user?.goal || 'Not set'}</p>
            <p><strong>Total Calories Logged:</strong> {totalCalories} kcal</p>
            <p><strong>Meals Logged:</strong> {logs.length}</p>
          </motion.div>
        </div>

        {/* Calorie Logs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-nutri-green mb-6 flex items-center gap-2">
            <Calendar size={24} /> Calorie Logs
          </h3>
          {logs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {logs.map((log) => (
                <motion.div
                  key={log._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-gray-700/50 rounded-lg shadow-md"
                >
                  <p className="font-semibold capitalize">{log.food}</p>
                  <p className="text-nutri-green">{log.calories} kcal</p>
                  <p className="text-sm text-gray-400 capitalize">{log.mealType}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(log.date).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No meals logged yet. Start tracking now!</p>
          )}
        </motion.div>

        {/* Trial Warning */}
        {daysLeft === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-red-600/20 rounded-lg text-center text-red-400"
          >
            Your free trial has ended. Upgrade to continue tracking your nutrition!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;