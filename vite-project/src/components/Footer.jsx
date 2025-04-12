import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-nutri-dark text-gray-300 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-nutri-green mb-4 flex items-center gap-2">
            <img src="/logo.png" alt="NutriAI" className="w-8 h-8" />
            NutriAI
          </h3>
          <p className="text-sm">
            Your AI-powered nutrition assistant to track, scan, and optimize your health.
          </p>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-lg font-semibold text-nutri-green mb-4">About Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Built by Team GRAVITY</li>
            <li>Hackathon 2025 Winner</li>
            <li>Mission: Simplify Nutrition</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold text-nutri-green mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              support@nutriai.app
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              Bengaluru, India
            </li>
          </ul>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-lg font-semibold text-nutri-green mb-4">Features</h4>
          <ul className="space-y-2 text-sm">
            <li>AI Food Scanner</li>
            <li>Calorie Tracking</li>
            <li>Nutrition Chatbot</li>
            <li>Personalized Goals</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        © {new Date().getFullYear()} NutriAI by Team GRAVITY. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;