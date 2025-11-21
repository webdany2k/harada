const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.json');

// Load boards from file or initialize empty
let boards = {};
if (fs.existsSync(DB_PATH)) {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        boards = JSON.parse(data);
    } catch (e) {
        console.error("Failed to load database:", e);
        boards = {};
    }
}

function persist() {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(boards, null, 2));
    } catch (e) {
        console.error("Failed to save database:", e);
    }
}

function saveBoard(goal, data) {
    const id = Date.now().toString();
    const newBoard = {
        id,
        createdAt: new Date(),
        ...data,
        commits: [],
        journalEntries: [], // Initialize journal entries
        pillarScores: new Array(8).fill(0)
    };
    boards[id] = newBoard;
    persist();
    return newBoard;
}

function getBoard(id) {
    return boards[id];
}

function getAllBoards() {
    return Object.values(boards).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function addCommit(id, text, classification) {
    const board = boards[id];
    if (!board) return null;

    const commit = {
        id: Date.now().toString(),
        text,
        classification,
        timestamp: new Date()
    };

    board.commits.push(commit);

    // Update scores
    if (classification && classification.impacts) {
        classification.impacts.forEach(impact => {
            if (typeof impact.pillarIndex === 'number' && impact.pillarIndex >= 0 && impact.pillarIndex < 8) {
                board.pillarScores[impact.pillarIndex] += (impact.score || 0);
            }
        });
    }

    persist();
    return board;
}

function addJournalEntry(id, text, images = [], tags = []) {
    const board = boards[id];
    if (!board) return null;

    // Ensure journalEntries exists (migration for old boards)
    if (!board.journalEntries) {
        board.journalEntries = [];
    }

    const entry = {
        id: Date.now().toString(),
        text,
        images,
        tags,
        timestamp: new Date()
    };

    board.journalEntries.push(entry);
    persist();
    return board;
}

module.exports = { saveBoard, getBoard, getAllBoards, addCommit, addJournalEntry };
