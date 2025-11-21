const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelsToTry = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite-preview-02-05",
  "gemini-2.0-flash-exp",
  "gemini-1.5-flash"
];

async function generateContentWithFallback(prompt) {
  let lastError = null;
  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (e) {
      console.error(`Model ${modelName} failed:`, e.message);
      lastError = e;
      // Continue to next model
    }
  }
  throw lastError || new Error("All models failed");
}

async function generateBoard(goal) {
  const prompt = `
    You are an expert in the Harada Method for goal setting.
    Create a 64-cell Mandalart board for the goal: "${goal}".
    
    Structure:
    - 8 Main Pillars (areas of focus to achieve the main goal).
    - For each Pillar, 8 Sub-goals (specific actions or targets).
    
    Return ONLY valid JSON with this structure:
    {
      "mainGoal": "${goal}",
      "pillars": [
        {
          "title": "Pillar Name",
          "subGoals": ["Sub 1", "Sub 2", ..., "Sub 8"]
        }
      ]
    }
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.
  `;

  try {
    const text = await generateContentWithFallback(prompt);

    // Clean up potential markdown code blocks
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Gemini API Error:", e);
    throw new Error("Failed to generate board: " + e.message);
  }
}

async function classifyCommit(board, text) {
  const prompt = `
    The user has a Harada Method board for the goal: "${board.mainGoal}".
    Pillars: ${board.pillars.map(p => p.title).join(', ')}.
    
    The user performed this activity: "${text}".
    
    Analyze which pillars this activity contributes to.
    Return ONLY valid JSON:
    {
      "impacts": [
        { "pillarIndex": 0, "score": 1-5 } // 0-7 index of the pillar
      ],
      "summary": "Brief explanation of why it helps."
    }
    Do not include markdown formatting.
  `;

  try {
    const responseText = await generateContentWithFallback(prompt);

    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Gemini API Error:", e);
    throw new Error("Failed to classify commit: " + e.message);
  }
}

async function generateCoachingAdvice(board) {
  const prompt = `
    You are an expert Harada Method Coach.
    Analyze the user's progress on their board: "${board.mainGoal}".
    
    Pillars: ${board.pillars.map(p => p.title).join(', ')}.
    
    Recent Activities (last 5):
    ${(board.commits || []).slice(-5).map(c => `- ${c.text} (${new Date(c.timestamp).toLocaleDateString()})`).join('\n')}
    
    Recent Journal Entries (last 3):
    ${(board.journalEntries || []).slice(-3).map(e => `- ${e.text}`).join('\n')}
    
    Current Pillar Scores:
    ${board.pillarScores.map((score, i) => `Pillar ${i + 1}: ${score}`).join(', ')}
    
    Based on this data, provide 3 specific, actionable recommendations to help them achieve their goal.
    Be encouraging but firm. Focus on pillars with low scores.
    
    Return ONLY valid JSON:
    {
      "advice": [
        "Recommendation 1...",
        "Recommendation 2...",
        "Recommendation 3..."
      ],
      "motivationalQuote": "A relevant quote..."
    }
    Do not include markdown formatting.
  `;

  try {
    const responseText = await generateContentWithFallback(prompt);
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Gemini API Error:", e);
    throw new Error("Failed to generate coaching advice: " + e.message);
  }
}

module.exports = { generateBoard, classifyCommit, generateCoachingAdvice };
