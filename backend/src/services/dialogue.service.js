/**
 * Dialogue Generation Service
 * Generates NotebookLM-style podcast conversations between two AI hosts
 */
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate a podcast-style dialogue script from content
 * Creates a natural conversation between two hosts discussing the topic
 * @param {string} content - Extracted content from URL
 * @param {string} title - Title of the content
 * @param {Object} options - Customization options
 * @returns {Promise<Object>} Generated dialogue script
 */
async function generateDialogueScript(content, title, options = {}) {
  const {
    targetAudience = 'college students',
    focusArea = null,
    duration = '5-8 minutes',
    tone = 'friendly and engaging'
  } = options;

  const focusInstruction = focusArea 
    ? `Pay special attention to: ${focusArea}` 
    : 'Cover the main concepts comprehensively';

  const prompt = `You are an expert podcast script writer. Create an engaging, natural-sounding conversation between two hosts discussing the following content.

CONTENT TITLE: ${title}

CONTENT:
${content.substring(0, 12000)}

INSTRUCTIONS:
- Create a ${duration} podcast-style dialogue between two hosts: Alex (enthusiastic, asks great questions) and Sam (knowledgeable, explains clearly)
- The conversation should feel NATURAL - include verbal cues like "Right!", "Exactly!", "That's fascinating!", "So what you're saying is..."
- ${focusInstruction}
- Target audience: ${targetAudience}
- Tone: ${tone}
- Start with a brief, engaging introduction
- Break complex concepts into digestible explanations
- Include real-world examples and analogies
- End with a memorable takeaway or call to action

OUTPUT FORMAT (JSON):
{
  "title": "An engaging podcast episode title",
  "description": "2-3 sentence description of what listeners will learn",
  "dialogue": [
    {
      "speaker": "Alex",
      "text": "The spoken text...",
      "emotion": "curious" // curious, excited, thoughtful, surprised, explaining
    },
    {
      "speaker": "Sam",
      "text": "The response...",
      "emotion": "explaining"
    }
  ],
  "topics": ["topic1", "topic2", "topic3"],
  "estimatedDuration": "6:30",
  "keyTakeaways": ["takeaway1", "takeaway2"]
}

GUIDELINES:
- Each dialogue turn should be 1-4 sentences (natural speaking length)
- Include 30-50 dialogue turns for a 5-8 minute podcast
- Alex asks questions and reacts; Sam provides depth and explanations
- Both hosts can share insights - it's a true conversation
- Avoid jargon unless explained immediately after
- Make it entertaining AND educational

Return ONLY valid JSON, no markdown formatting.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an award-winning podcast script writer known for making complex topics accessible and engaging. Your dialogues sound natural and capture the listener\'s attention from the first word.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 4000
    });

    const dialogueData = JSON.parse(response.choices[0].message.content);

    // Validate the response structure
    if (!dialogueData.title || !dialogueData.dialogue || !Array.isArray(dialogueData.dialogue)) {
      throw new Error('Invalid dialogue structure from OpenAI');
    }

    // Add metadata
    dialogueData.generatedAt = new Date().toISOString();
    dialogueData.sourceTitle = title;
    dialogueData.turnCount = dialogueData.dialogue.length;

    return dialogueData;
  } catch (error) {
    console.error('Dialogue generation error:', error.message);
    throw new Error(`Failed to generate dialogue script: ${error.message}`);
  }
}

/**
 * Estimate audio duration from dialogue
 * @param {Array} dialogue - Array of dialogue turns
 * @returns {number} Estimated duration in seconds
 */
function estimateDialogueDuration(dialogue) {
  // Average speaking rate: ~150 words per minute
  const wordsPerSecond = 150 / 60;
  
  let totalWords = 0;
  for (const turn of dialogue) {
    totalWords += turn.text.split(/\s+/).length;
  }
  
  // Add pauses between speakers (~0.5s per turn)
  const pauseTime = dialogue.length * 0.5;
  
  return Math.ceil(totalWords / wordsPerSecond + pauseTime);
}

/**
 * Format duration in MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

module.exports = {
  generateDialogueScript,
  estimateDialogueDuration,
  formatDuration
};
