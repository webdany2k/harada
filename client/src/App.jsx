import React, { useState } from 'react';
import GoalInput from './components/GoalInput';
import BoardGrid from './components/BoardGrid';
import ActivityLog from './components/ActivityLog';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import Coach from './components/Coach';
import { Activity, Terminal } from 'lucide-react';

function App() {
    const [board, setBoard] = useState(null);
    const [view, setView] = useState('dashboard'); // 'dashboard' | 'board' | 'new'
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
            setView('board');
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const goHome = () => {
        setBoard(null);
        setView('dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={goHome}
                    >
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
                            v0.3.0
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">

                {view === 'dashboard' && (
                    <Dashboard
                        onSelectBoard={(b) => {
                            setBoard(b);
                            setView('board');
                        }}
                        onNewBoard={() => {
                            setBoard(null);
                            setView('new');
                        }}
                    />
                )}

                {view === 'new' && (
                    <div className="flex flex-col items-center gap-8 py-12">
                        <div className="text-center space-y-4 mb-8">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                Achieve the Impossible
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl mx-auto">
                                Generate a comprehensive Harada Method action plan in seconds using advanced AI.
                            </p>
                        </div>
                        <GoalInput onGenerate={handleGenerate} loading={loading} />
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg max-w-2xl mx-auto">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center gap-4 py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                        <p className="text-slate-400 animate-pulse">Constructing your path to success...</p>
                    </div>
                )}

                {view === 'board' && board && (
                    <div className="flex flex-col xl:flex-row gap-6 items-start relative">
                        {/* Left: Board Grid (Main Content) */}
                        <div className="flex-1 w-full">
                            <BoardGrid board={board} />
                        </div>

                        {/* Right: Sidebar (Activity + Journal) */}
                        <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
                            <ActivityLog
                                boardId={board.id}
                                onCommit={async (text) => {
                                    const res = await fetch('/api/commit', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ boardId: board.id, text }),
                                    });
                                    if (!res.ok) throw new Error('Failed to commit');
                                    const data = await res.json();
                                    setBoard(data);
                                    return data;
                                }}
                            />

                            <Journal
                                boardId={board.id}
                                entries={board.journalEntries || []}
                                onAddEntry={async (entry) => {
                                    const res = await fetch('/api/journal', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ boardId: board.id, ...entry }),
                                    });
                                    if (!res.ok) throw new Error('Failed to add journal entry');
                                    const data = await res.json();
                                    setBoard(data);
                                }}
                            />
                        </div>

                        <Coach boardId={board.id} />
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
