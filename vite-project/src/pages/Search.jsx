import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Droplet } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../constants';

const Search = () => {
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [], snacks: [] });
  const [current, setCurrent] = useState({
    food: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast',
  });
  const [waterIntake, setWaterIntake] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/calories`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const grouped = res.data.reduce(
          (acc, log) => {
            acc[log.mealType].push(log);
            return acc;
          },
          { breakfast: [], lunch: [], dinner: [], snacks: [] }
        );
        setMeals(grouped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, []);

  const addFoodItem = async () => {
    if (!current.food || !current.calories) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/calories`,
        {
          food: current.food,
          calories: parseInt(current.calories),
          protein: parseFloat(current.protein) || 0,
          carbs: parseFloat(current.carbs) || 0,
          fat: parseFloat(current.fat) || 0,
          mealType: current.mealType,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setMeals((prev) => ({
        ...prev,
        [current.mealType]: [...prev[current.mealType], res.data],
      }));
      setCurrent({
        food: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        mealType: 'breakfast',
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const deleteLog = async (id, mealType) => {
    try {
      await axios.delete(`${API_URL}/calories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMeals((prev) => ({
        ...prev,
        [mealType]: prev[mealType].filter((log) => log._id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleWaterAdd = (amount) => {
    setWaterIntake((prev) => prev + amount);
  };

  const getTotalCalories = () => {
    return Object.values(meals)
      .flat()
      .reduce((sum, item) => sum + item.calories, 0);
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
          Calorie Counter
        </motion.h1>

        {/* Add Meal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-nutri-green mb-4">Log a Meal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Food name"
              value={current.food}
              onChange={(e) => setCurrent({ ...current, food: e.target.value })}
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
            />
            <input
              type="number"
              placeholder="Calories"
              value={current.calories}
              onChange={(e) => setCurrent({ ...current, calories: e.target.value })}
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
            />
            <select
              value={current.mealType}
              onChange={(e) => setCurrent({ ...current, mealType: e.target.value })}
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-nutri-green"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
            <input
              type="number"
              placeholder="Protein (g)"
              value={current.protein}
              onChange={(e) => setCurrent({ ...current, protein: e.target.value })}
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={current.carbs}
              onChange={(e) => setCurrent({ ...current, carbs: e.target.value })}
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
            />
            <input
              type="number"
              placeholder="Fat (g)"
              value={current.fat}
              onChange={(e) => setCurrent({ ...current, fat: e.target.value })}
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green"
            />
          </div>
          <button
            onClick={addFoodItem}
            disabled={loading}
            className="mt-4 w-full bg-nutri-green hover:bg-nutri-accent text-white p-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Meal'}
          </button>
        </motion.div>

        {/* Meal Logs */}
        {Object.keys(meals).map((mealKey) => (
          <motion.div
            key={mealKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-nutri-green capitalize mb-4">{mealKey}</h3>
            {meals[mealKey].length === 0 ? (
              <p className="text-gray-400">No meals logged yet.</p>
            ) : (
              <ul className="space-y-3">
                {meals[mealKey].map((item) => (
                  <motion.li
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{item.food}</p>
                      <p className="text-sm text-gray-400">
                        {item.calories} kcal | P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                      </p>
                    </div>
                    <button
                      onClick={() => deleteLog(item._id, mealKey)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}

        {/* Water Intake */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-semibold text-nutri-green mb-4 flex items-center gap-2">
            <Droplet size={24} /> Water Intake
          </h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {[250, 500, 750].map((amt) => (
              <button
                key={amt}
                onClick={() => handleWaterAdd(amt)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center gap-2"
              >
                +{amt}ml
              </button>
            ))}
          </div>
          <p className="text-lg font-semibold text-nutri-green">
            Total Water: {waterIntake} ml
          </p>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-2xl font-bold text-nutri-green"
        >
          Total Calories Today: {getTotalCalories()} kcal
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Search;