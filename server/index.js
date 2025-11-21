require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateBoard, classifyCommit, generateCoachingAdvice } = require('./gemini');
const { saveBoard, getBoard, getAllBoards, addCommit, addJournalEntry } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get Coaching Advice
app.post('/api/coach', async (req, res) => {
    try {
        const { boardId } = req.body;
        if (!boardId) return res.status(400).json({ error: 'Board ID is required' });

        const board = getBoard(boardId);
        if (!board) return res.status(404).json({ error: 'Board not found' });

        const advice = await generateCoachingAdvice(board);
        res.json(advice);
    } catch (error) {
        console.error('Error generating advice:', error);
        res.status(500).json({ error: 'Failed to generate advice' });
    }
});

// Get all boards
app.get('/api/boards', (req, res) => {
    res.json(getAllBoards());
});

// Add Journal Entry
app.post('/api/journal', (req, res) => {
    try {
        const { boardId, text, images, tags } = req.body;
        if (!boardId || !text) return res.status(400).json({ error: 'Board ID and text are required' });

        const updatedBoard = addJournalEntry(boardId, text, images, tags);
        if (!updatedBoard) return res.status(404).json({ error: 'Board not found' });

        res.json(updatedBoard);
    } catch (error) {
        console.error('Error adding journal entry:', error);
        res.status(500).json({ error: 'Failed to add journal entry' });
    }
});

// Generate a new board
app.post('/api/generate', async (req, res) => {
    try {
        const { goal } = req.body;
        if (!goal) return res.status(400).json({ error: 'Goal is required' });

        console.log(`Generating board for goal: ${goal}`);
        const boardData = await generateBoard(goal);
        const newBoard = saveBoard(goal, boardData);
        res.json(newBoard);
    } catch (error) {
        console.error('Error generating board:', error);
        res.status(500).json({ error: error.message || 'Failed to generate board' });
    }
});

// Get a board by ID
app.get('/api/board/:id', (req, res) => {
    const board = getBoard(req.params.id);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
});

// Commit an activity
app.post('/api/commit', async (req, res) => {
    try {
        const { boardId, text } = req.body;
        if (!boardId || !text) return res.status(400).json({ error: 'Board ID and text are required' });

        const board = getBoard(boardId);
        if (!board) return res.status(404).json({ error: 'Board not found' });

        const classification = await classifyCommit(board, text);
        const updatedBoard = addCommit(boardId, text, classification);
        res.json(updatedBoard);
    } catch (error) {
        console.error('Error committing activity:', error);
        res.status(500).json({ error: 'Failed to commit activity' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
