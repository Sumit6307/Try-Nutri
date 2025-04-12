import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Camera, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      to: '/search',
      icon: <Search size={40} />,
      title: 'Calorie Counter',
      desc: 'Log and track your daily calorie intake with precision.',
      color: 'from-green-500 to-green-700',
    },
    {
      to: '/scanner',
      icon: <Camera size={40} />,
      title: 'Food Scanner',
      desc: 'Scan barcodes or images to instantly log nutrition.',
      color: 'from-purple-500 to-purple-700',
    },
    {
      to: '/chatbot',
      icon: <MessageSquare size={40} />,
      title: 'AI Chatbot',
      desc: 'Get personalized nutrition advice anytime.',
      color: 'from-blue-500 to-blue-700',
    },
    {
      to: '/profile',
      icon: <User size={40} />,
      title: 'Your Profile',
      desc: 'Manage goals, view logs, and track progress.',
      color: 'from-pink-500 to-pink-700',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-nutri-dark to-gray-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-nutri-green mb-6"
        >
          {user ? `Welcome Back, ${user.name}!` : 'Your Health, Smarter'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12"
        >
          NutriAI empowers you to track nutrition, scan foods, and achieve your health goals with AI-driven insights.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <Link
                to={feature.to}
                className={`block bg-gradient-to-br ${feature.color} p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-white`}
              >
                <div className="mb-4 animate-bounce-slow">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;