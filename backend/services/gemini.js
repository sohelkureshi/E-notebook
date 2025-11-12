// backend/services/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function summarizeText(text) {
  try {
    // Use the correct available model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


    const prompt = `
You are a helpful assistant that summarizes user notes clearly and concisely.
Summarize the following note in 1 bullet point only using Markdown.
Keep it short and focused.

Note:
${text}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini summarization error:", error);
    throw new Error("Failed to summarize using Gemini API");
  }
}

module.exports = { summarizeText };
