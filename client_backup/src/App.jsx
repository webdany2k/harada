import React, { useState } from 'react';
import GoalInput from './components/GoalInput';
import BoardGrid from './components/BoardGrid';
import { Activity, Terminal } from 'lucide-react';

function App() {
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async (goal) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ goal }),
            });

            if (!res.ok) throw new Error('Failed to generate board');

            const data = await res.json();
            setBoard(data);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="font-bold text-xl tracking-tight text-white">
                            Harada<span className="text-cyan-400">AI</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
                        <span className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                            <Terminal className="w-4 h-4" />
                            v0.1.0
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 flex flex-col items-center gap-8">
                {!board && (
                    <div className="text-center space-y-4 mb-8">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                            Achieve the Impossible
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            Generate a comprehensive Harada Method action plan in seconds using advanced AI.
                        </p>
                    </div>
                )}

                <GoalInput onGenerate={handleGenerate} loading={loading} />

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center gap-4 py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <p className="text-slate-400 animate-pulse">Constructing your path to success...</p>
                    </div>
                )}

                <BoardGrid board={board} />
            </main>
        </div>
    );
}

export default App;
