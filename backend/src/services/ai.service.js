const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate video script from content using OpenAI GPT-4
 * @param {string} content - Extracted content from URL
 * @param {string} title - Title of the content
 * @returns {Promise<Object>} Generated script with slides
 */
async function generateVideoScript(content, title) {
  try {
    const prompt = `You are an expert educational content creator. Create an engaging 5-10 minute video script from the following content.

Title: ${title}

Content:
${content.substring(0, 8000)} // Limit content to avoid token limits

Generate a JSON response with the following structure:
{
  "title": "An engaging, educational video title (max 100 characters)",
  "description": "A compelling 2-3 sentence description of what viewers will learn",
  "slides": [
    {
      "slideNumber": 1,
      "heading": "Introduction",
      "narration": "The script text to be narrated (engaging, conversational tone)",
      "visualDescription": "Description of what should be shown on screen",
      "visualType": "Choose one: brain_diagram, hierarchy, graph, list, code, or text",
      "bulletPoints": ["Key concept 1", "Key concept 2", "Key concept 3"],
      "duration": 30
    },
    {
      "slideNumber": 2,
      "heading": "Main Concept",
      "narration": "...",
      "visualDescription": "...",
      "visualType": "...",
      "bulletPoints": ["..."],
      "duration": 45
    }
    // 8-12 slides total
  ],
  "totalDuration": "8:30",
  "category": "AI/ML" or "Data Science" or "Research"
}

Guidelines:
- Make it engaging and easy to understand for college students
- Use conversational, friendly tone
- Break complex concepts into digestible chunks
- Include 3-4 bullet points per slide that summarize the core message
- Map visualType purposefully: Use 'brain_diagram' for complex concepts, 'hierarchy' for structure/processes, 'graph' for data/growth, 'list' for arrays of facts, 'code' for technical logic.
- Each slide should be 30-60 seconds
- Total duration should be 5-10 minutes
- Ensure smooth transitions between slides

Return ONLY valid JSON, no markdown formatting.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational content creator who specializes in making complex technical topics accessible and engaging.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 3000
    });

    const scriptData = JSON.parse(response.choices[0].message.content);

    // Validate the response structure
    if (!scriptData.title || !scriptData.slides || !Array.isArray(scriptData.slides)) {
      throw new Error('Invalid script structure from OpenAI');
    }

    return scriptData;
  } catch (error) {
    console.error('OpenAI script generation error:', error.message);
    throw new Error(`Failed to generate video script: ${error.message}`);
  }
}

/**
 * Extract and clean content from URL
 * @param {string} url - URL to extract content from
 * @returns {Promise<Object>} Extracted title and content
 */
async function extractContentFromURL(url) {
  const axios = require('axios');
  const cheerio = require('cheerio');

  try {
    // Fetch the webpage
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script, style, nav, header, footer, iframe, noscript').remove();

    // Try to extract title
    let title = $('title').text().trim() ||
      $('h1').first().text().trim() ||
      'Untitled Content';

    // Try to extract main content
    let content = '';

    // Common content selectors
    const contentSelectors = [
      'article',
      'main',
      '[role="main"]',
      '.content',
      '.article-content',
      '.post-content',
      '#content'
    ];

    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text();
        break;
      }
    }

    // Fallback: get all paragraph text
    if (!content || content.length < 500) {
      content = $('p').map((i, el) => $(el).text()).get().join('\n\n');
    }

    // Clean up the content
    content = content
      .replace(/\s+/g, ' ') // Multiple spaces to single space
      .replace(/\n+/g, '\n\n') // Multiple newlines to double newline
      .trim();

    // Validate we have enough content
    if (content.length < 200) {
      throw new Error('Insufficient content extracted from URL. Please try a different URL with more text content.');
    }

    return {
      title: title.substring(0, 200), // Limit title length
      content: content.substring(0, 15000) // Limit content for processing
    };
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      throw new Error('Invalid URL or website not accessible');
    }
    if (error.code === 'ETIMEDOUT') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
}

module.exports = {
  generateVideoScript,
  extractContentFromURL
};
