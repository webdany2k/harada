import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function ActivityLog({ boardId, onCommit }) {
    const [activity, setActivity] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastResult, setLastResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!activity.trim()) return;

        setLoading(true);
        setLastResult(null);
        try {
            const result = await onCommit(activity);
            setLastResult(result);
            setActivity('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-8 right-8 w-80 md:w-96 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-4 z-50"
        >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Log Activity
            </h3>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    placeholder="I did 50 pushups..."
                    className="flex-1 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading || !activity.trim()}
                    className="bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-500 disabled:opacity-50 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>

            {/* Demo / Simulation Mode */}
            <div className="mt-3 pt-3 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">Quick Test (Demo)</p>
                <div className="flex flex-wrap gap-2">
                    {['Study Physics', 'Run 5km', 'Meditate', 'Networking'].map((action) => (
                        <button
                            key={action}
                            onClick={() => {
                                setActivity(`I did: ${action}`);
                                // Optional: Auto-submit
                                // handleSubmit({ preventDefault: () => {} }); 
                            }}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 px-2 py-1 rounded border border-slate-700 transition-colors"
                        >
                            {action}
                        </button>
                    ))}
                    <button
                        onClick={async () => {
                            const actions = [
                                "Read 20 pages of orbital mechanics textbook",
                                "Completed a 5km run in 25 minutes",
                                "Practiced mindfulness meditation for 15 minutes",
                                "Attended a networking event with engineers",
                                "Solved 5 complex calculus problems",
                                "Volunteered at the local science museum",
                                "Maintained a strict sleep schedule for a week",
                                "Wrote a blog post about space exploration"
                            ];
                            const randomAction = actions[Math.floor(Math.random() * actions.length)];
                            setActivity(randomAction);
                            // We can't easily auto-submit because handleSubmit expects an event, 
                            // but filling the input is good enough for the user to just hit enter.
                        }}
                        className="text-xs bg-purple-900/50 hover:bg-purple-800/50 text-purple-300 px-2 py-1 rounded border border-purple-700/50 transition-colors"
                    >
                        🎲 Random
                    </button>
                </div>
            </div>

            {lastResult && lastResult.classification && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 text-xs text-slate-300 bg-slate-800/50 p-2 rounded border border-slate-700"
                >
                    <p className="font-semibold text-cyan-400 mb-1">Impact Analysis:</p>
                    <p>{lastResult.classification.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                        {lastResult.classification.impacts?.map((impact, i) => (
                            <span key={i} className="bg-cyan-900/50 text-cyan-200 px-1.5 py-0.5 rounded border border-cyan-800/50">
                                Pillar {impact.pillarIndex + 1}: +{impact.score}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
