import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Image as ImageIcon, Tag, Send, X } from 'lucide-react';

export default function Journal({ boardId, entries = [], onAddEntry }) {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showImageInput, setShowImageInput] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onAddEntry({
            text,
            images: imageUrl ? [imageUrl] : [],
            tags
        });

        setText('');
        setImageUrl('');
        setShowImageInput(false);
        setTags([]);
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    return (
        <div className="w-full max-w-md bg-slate-900/50 border-l border-slate-800 p-4 flex flex-col h-[calc(100vh-4rem)] sticky top-16">
            <div className="flex items-center gap-2 mb-6 text-cyan-400">
                <Book className="w-5 h-5" />
                <h2 className="font-bold text-lg">Journal</h2>
            </div>

            {/* Entry Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-3">
                <div className="relative">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Reflect on your progress..."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 min-h-[100px] resize-none"
                    />
                    <div className="absolute bottom-2 right-2 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowImageInput(!showImageInput)}
                            className={`p-1.5 rounded-md transition-colors ${showImageInput ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-slate-700 text-slate-400'}`}
                        >
                            <ImageIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showImageInput && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Paste image URL..."
                                className="w-full bg-slate-800/30 border border-slate-700 rounded px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/30"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Tags Input */}
                <div className="flex flex-wrap gap-2 bg-slate-800/30 border border-slate-700 rounded-lg p-2">
                    {tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-xs bg-cyan-900/30 text-cyan-300 px-2 py-1 rounded">
                            #{tag}
                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-white"><X className="w-3 h-3" /></button>
                        </span>
                    ))}
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={addTag}
                        placeholder={tags.length === 0 ? "Add tags (press Enter)..." : ""}
                        className="bg-transparent text-xs text-slate-300 focus:outline-none flex-1 min-w-[100px]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    Save Entry
                </button>
            </form>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {entries.length === 0 && (
                    <p className="text-center text-slate-600 text-sm italic py-8">No entries yet. Start writing!</p>
                )}

                {[...entries].reverse().map((entry) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative pl-4 border-l-2 border-slate-800"
                    >
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-slate-900"></div>

                        <div className="text-xs text-slate-500 mb-1">
                            {new Date(entry.timestamp).toLocaleString()}
                        </div>

                        <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
                            <p className="text-sm text-slate-300 whitespace-pre-wrap mb-2">{entry.text}</p>

                            {entry.images && entry.images.map((img, i) => (
                                <img key={i} src={img} alt="Journal attachment" className="w-full rounded-md mb-2 object-cover max-h-40" />
                            ))}

                            {entry.tags && entry.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {entry.tags.map(tag => (
                                        <span key={tag} className="text-[10px] text-cyan-400/80">#{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
