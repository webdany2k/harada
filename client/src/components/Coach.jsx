import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, Quote } from 'lucide-react';

export default function Coach({ boardId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState(null);

    const getAdvice = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/coach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boardId }),
            });
            if (!res.ok) throw new Error('Failed to get advice');
            const data = await res.json();
            setAdvice(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsOpen(true);
                    if (!advice) getAdvice();
                }}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(192,38,211,0.5)] z-50 flex items-center gap-2 font-bold"
            >
                <Bot className="w-6 h-6" />
                <span className="hidden md:inline">AI Coach</span>
            </motion.button>

            {/* Modal/Panel */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/20 rounded-lg">
                                        <Bot className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Coach Harada</h3>
                                        <p className="text-xs text-purple-300">Your personal success mentor</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 min-h-[300px] max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-purple-300">
                                        <Sparkles className="w-8 h-8 animate-spin" />
                                        <p className="animate-pulse">Analyzing your progress...</p>
                                    </div>
                                ) : advice ? (
                                    <div className="space-y-6">
                                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                                            <div className="flex gap-2 mb-2 text-purple-300">
                                                <Quote className="w-5 h-5" />
                                                <span className="font-bold text-sm uppercase tracking-wider">Daily Wisdom</span>
                                            </div>
                                            <p className="text-lg italic text-white font-serif">"{advice.motivationalQuote}"</p>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-bold text-slate-300 uppercase text-xs tracking-wider">Recommendations</h4>
                                            {advice.advice.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex gap-3 items-start bg-slate-800/50 p-3 rounded-lg"
                                                >
                                                    <div className="bg-purple-500/20 text-purple-400 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                                                        {i + 1}
                                                    </div>
                                                    <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-500 py-12">
                                        <p>Ready to review your progress?</p>
                                        <button
                                            onClick={getAdvice}
                                            className="mt-4 text-purple-400 hover:text-purple-300 underline"
                                        >
                                            Generate Analysis
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                                <button
                                    onClick={getAdvice}
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    Refresh Advice
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
