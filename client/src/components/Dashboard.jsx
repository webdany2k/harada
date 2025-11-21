import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Layout, Calendar, ArrowRight } from 'lucide-react';

export default function Dashboard({ onSelectBoard, onNewBoard }) {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/boards')
            .then(res => res.json())
            .then(data => {
                setBoards(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load boards", err);
                setLoading(false);
            });
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Layout className="w-8 h-8 text-cyan-400" />
                    Your Boards
                </h2>
                <button
                    onClick={onNewBoard}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    New Board
                </button>
            </div>

            {loading ? (
                <div className="text-center text-slate-500 py-12">Loading your vision...</div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {boards.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                            <p className="text-slate-400 mb-4">No boards created yet.</p>
                            <button
                                onClick={onNewBoard}
                                className="text-cyan-400 hover:text-cyan-300 font-medium"
                            >
                                Create your first Harada Board
                            </button>
                        </div>
                    )}

                    {boards.map(board => (
                        <motion.div
                            key={board.id}
                            variants={item}
                            onClick={() => onSelectBoard(board)}
                            className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-5 h-5 text-cyan-400" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                                {board.mainGoal}
                            </h3>

                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                                <Calendar className="w-3 h-3" />
                                {new Date(board.createdAt).toLocaleDateString()}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Progress</span>
                                    <span>{board.commits?.length || 0} activities</span>
                                </div>
                                {/* Simple progress bar based on commit count for now */}
                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                        style={{ width: `${Math.min((board.commits?.length || 0) * 2, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
