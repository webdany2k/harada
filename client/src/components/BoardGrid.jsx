import React from 'react';
import { motion } from 'framer-motion';

const Cell = ({ content, type, index, score = 0 }) => {
    // Type: 'center' (main goal), 'pillar' (sub-goal center), 'leaf' (action)

    let baseClasses = "relative aspect-square flex items-center justify-center p-1 text-xs text-center border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:z-10 cursor-default select-none overflow-hidden";
    let colorClasses = "";
    let progressStyle = {};

    if (type === 'center') {
        colorClasses = "bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.5)] z-20";
    } else if (type === 'pillar') {
        colorClasses = "bg-slate-800/80 text-cyan-100 font-semibold hover:bg-slate-700/80 z-10";
        // Visual progress for pillars
        if (score > 0) {
            // Calculate intensity/fill based on score (assuming max score of ~50 for visual fullness for now)
            const percentage = Math.min((score / 20) * 100, 100);
            progressStyle = {
                background: `linear-gradient(to top, rgba(6, 182, 212, 0.3) ${percentage}%, rgba(30, 41, 59, 0.8) ${percentage}%)`
            };
        }
    } else {
        colorClasses = "bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 hover:text-white";
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.005 }}
            className={`${baseClasses} ${colorClasses}`}
            style={progressStyle}
        >
            <span className="relative z-10">{content}</span>
            {score > 0 && type === 'pillar' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                />
            )}
        </motion.div>
    );
};

export default function BoardGrid({ board }) {
    if (!board) return null;

    const pillars = board.pillars || [];
    const mainGoal = board.mainGoal;
    const scores = board.pillarScores || new Array(8).fill(0);

    // Helper to render a 3x3 block
    const renderBlock = (centerContent, surroundingItems, blockIndex) => {
        // surroundingItems is an array of 8 items.
        // Grid order:
        // 0 1 2
        // 3 C 4
        // 5 6 7

        const gridItems = [
            surroundingItems[0], surroundingItems[1], surroundingItems[2],
            surroundingItems[3], centerContent, surroundingItems[4],
            surroundingItems[5], surroundingItems[6], surroundingItems[7]
        ];

        return (
            <div key={blockIndex} className="grid grid-cols-3 gap-0.5 p-0.5 bg-slate-800/30 rounded-lg border border-slate-700/30">
                {gridItems.map((item, i) => {
                    const isCenter = i === 4;
                    let cellType = 'leaf';
                    let cellScore = 0;

                    if (blockIndex === 4) {
                        // Center Block (Main Goal + Pillar Titles)
                        if (isCenter) {
                            cellType = 'center';
                        } else {
                            cellType = 'pillar';
                            // Map grid index (0-8 excluding 4) to pillar index (0-7)
                            // Grid: 0,1,2,3, (4), 5,6,7,8 -> Pillar: 0,1,2,3, 4,5,6,7
                            const pillarIdx = i < 4 ? i : i - 1;
                            cellScore = scores[pillarIdx];
                        }
                    } else {
                        // Outer Blocks (Pillar + Subgoals)
                        if (isCenter) {
                            cellType = 'pillar';
                            const pillarIdx = blockIndex < 4 ? blockIndex : blockIndex - 1;
                            cellScore = scores[pillarIdx];
                        }
                    }

                    return (
                        <Cell
                            key={i}
                            content={item.text || item}
                            type={cellType}
                            index={blockIndex * 9 + i}
                            score={cellScore}
                        />
                    );
                })}
            </div>
        );
    };

    // The center block content (Main Goal surrounded by Pillar Titles)
    const centerBlockItems = pillars.map(p => p.title);

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((blockIdx) => {
                    if (blockIdx === 4) {
                        // Center Block
                        return renderBlock(mainGoal, centerBlockItems, blockIdx);
                    } else {
                        // Pillar Block
                        // Adjust index because we skipped 4
                        const pillarIndex = blockIdx < 4 ? blockIdx : blockIdx - 1;
                        const pillar = pillars[pillarIndex];

                        if (!pillar) return <div key={blockIdx} className="aspect-square bg-slate-900/20 rounded-lg"></div>;

                        return renderBlock(pillar.title, pillar.subGoals, blockIdx);
                    }
                })}
            </div>
        </div>
    );
}
