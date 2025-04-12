import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Search as SearchIcon } from 'lucide-react';
import foodData from '../data/food';
import axios from 'axios';
import { API_URL } from '../constants';

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFoodName('Apple'); // Simulated detection
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    const food = foodData.find((item) => item.name.toLowerCase() === foodName.toLowerCase());
    if (food) {
      try {
        await axios.post(
          `${API_URL}/calories`,
          {
            food: food.name,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            mealType: 'snacks',
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setResult(food);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  };

  const handleSearch = () => {
    const food = foodData.find((item) => item.name.toLowerCase() === searchTerm.toLowerCase());
    setResult(food || null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nutri-dark to-gray-800 text-white"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-5xl font-bold text-nutri-green text-center"
        >
          Food Scanner & Nutrition Finder
        </motion.h1>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-nutri-green mb-4 flex items-center gap-2">
            <SearchIcon size={24} /> Search Food
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="e.g. Apple, Banana, Rice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
            />
            <button
              onClick={handleSearch}
              className="bg-nutri-green hover:bg-nutri-accent text-white p-3 rounded-lg flex items-center gap-2"
            >
              <SearchIcon size={20} />
              Search
            </button>
          </div>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-gray-700/50 rounded-lg"
            >
              <p className="font-semibold capitalize">{result.name}</p>
              <p>Calories: <span className="text-nutri-green">{result.calories} kcal</span></p>
              <p>Protein: {result.protein} g</p>
              <p>Carbs: {result.carbs} g</p>
              <p>Fat: {result.fat} g</p>
            </motion.div>
          )}
          {result === null && searchTerm && (
            <p className="mt-4 text-red-400">Food not found in database.</p>
          )}
        </motion.div>

        {/* Scanner Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-nutri-green mb-4 flex items-center gap-2">
            <Camera size={24} /> Scan Food
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-400 file:p-3 file:bg-nutri-green file:text-white file:rounded-lg file:border-0 file:cursor-pointer"
          />
          {image && (
            <div className="mt-6 space-y-4">
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={image}
                alt="Food Preview"
                className="w-64 h-64 object-cover rounded-lg mx-auto shadow-md"
              />
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
                placeholder="Detected food (edit if needed)"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-nutri-green hover:bg-nutri-accent text-white p-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Analyze & Log'}
              </button>
            </div>
          )}
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-gray-700/50 rounded-lg"
            >
              <p className="font-semibold capitalize">{result.name}</p>
              <p>Calories: <span className="text-nutri-green">{result.calories} kcal</span></p>
              <p>Protein: {result.protein} g</p>
              <p>Carbs: {result.carbs} g</p>
              <p>Fat: {result.fat} g</p>
              <p className="text-sm text-gray-400 mt-2">Logged to your profile!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Scanner;