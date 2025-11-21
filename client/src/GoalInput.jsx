import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function GoalInput({ onGenerate, loading }) {
    const [goal, setGoal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (goal.trim()) {
            onGenerate(goal);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto p-8"
        >
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-slate-900 rounded-xl p-2 border border-slate-800">
                    <Sparkles className="w-6 h-6 text-cyan-400 ml-3" />
                    <input
                        type="text"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="What is your main goal? (e.g., Become a Pro Baseball Player)"
                        className="w-full bg-transparent text-white text-lg px-4 py-3 focus:outline-none placeholder-slate-500"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
