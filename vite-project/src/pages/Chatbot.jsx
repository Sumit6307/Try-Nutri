import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';

// Mock replies for the chatbot (can be extended with backend API integration)
const mockReplies = {
  protein: 'Protein is key for muscle repair and growth. Aim for 0.8-1.2g per kg of body weight daily. Good sources include eggs, chicken, and lentils!',
  calories: 'Calories are your body’s energy currency. To maintain weight, balance intake with expenditure. For weight loss, aim for a 500-750 kcal deficit.',
  fat: 'Healthy fats support brain function and hormones. Include avocados, nuts, and olive oil, but keep saturated fats in moderation.',
  carbs: 'Carbs fuel your daily activities. Opt for complex carbs like oats, quinoa, and sweet potatoes for sustained energy.',
  diet: 'A balanced diet combines proteins, carbs, fats, and micronutrients. Personalize it based on your goals—weight loss, muscle gain, or maintenance.',
  hydration: 'Staying hydrated is crucial! Aim for 2-3 liters of water daily, more if you’re active.',
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);

    // Find a matching reply
    const keyword = Object.keys(mockReplies).find((key) =>
      input.toLowerCase().includes(key)
    );

    // Simulate bot response
    const botReply = {
      sender: 'bot',
      text: keyword
        ? mockReplies[keyword]
        : "Hmm, I'm still learning! Try asking about calories, protein, fats, or hydration.",
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botReply]);
    }, 500);

    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nutri-dark to-gray-800 text-white"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl md:text-5xl font-bold text-nutri-green mb-8 text-center flex items-center justify-center gap-3"
        >
          <MessageCircle size={36} />
          NutriChat AI
        </motion.h2>

        {/* Chat Container */}
        <motion.div
          ref={chatContainerRef}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 h-[60vh] overflow-y-auto scrollbar-thin shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {messages.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-center mt-20"
            >
              Start chatting about nutrition! Ask about calories, protein, or diet tips.
            </motion.p>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-lg shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-nutri-green text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Input Area */}
        <motion.div
          className="mt-4 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about nutrition, calories, or diet..."
            className="flex-1 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nutri-green transition"
          />
          <button
            onClick={handleSend}
            className="bg-nutri-green hover:bg-nutri-accent text-white p-3 rounded-lg flex items-center gap-2 transition"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Chatbot;