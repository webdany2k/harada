import React from 'react';
import { motion } from 'framer-motion';

const Cell = ({ content, type, index }) => {
    // Type: 'center' (main goal), 'pillar' (sub-goal center), 'leaf' (action)

    let baseClasses = "aspect-square flex items-center justify-center p-1 text-xs text-center border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:z-10 cursor-default select-none";
    let colorClasses = "";

    if (type === 'center') {
        colorClasses = "bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.5)]";
    } else if (type === 'pillar') {
        colorClasses = "bg-slate-800/80 text-cyan-100 font-semibold hover:bg-slate-700/80";
    } else {
        colorClasses = "bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 hover:text-white";
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.005 }}
            className={`${baseClasses} ${colorClasses}`}
        >
            {content}
        </motion.div>
    );
};

export default function BoardGrid({ board }) {
    if (!board) return null;

    // Helper to render a 3x3 block
    const renderBlock = (centerContent, surroundingItems, blockIndex) => {
        // surroundingItems is an array of 8 items.
        // We need to map them to the 3x3 grid where the center is the centerContent.
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
                {gridItems.map((item, i) => (
                    <Cell
                        key={i}
                        content={item.text || item}
                        type={i === 4 ? (blockIndex === 4 ? 'center' : 'pillar') : 'leaf'}
                        index={blockIndex * 9 + i}
                    />
                ))}
            </div>
        );
    };

    // We need to organize the 64+ cells into 9 blocks of 3x3.
    // Center block (index 4) is the Main Goal + 8 Pillars.
    // Surrounding blocks are Pillar + 8 Sub-goals.

    const pillars = board.pillars || [];
    const mainGoal = board.mainGoal;

    // The center block content (Main Goal surrounded by Pillar Titles)
    const centerBlockItems = pillars.map(p => p.title);

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
                {/* 
          We render 9 blocks. 
          Block 4 is the Center Block.
          Other blocks correspond to the pillars.
          
          Mapping:
          Block 0 -> Pillar 0
          Block 1 -> Pillar 1
          ...
          Block 4 -> Center (Main Goal)
          ...
          Block 8 -> Pillar 7
        */}

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
