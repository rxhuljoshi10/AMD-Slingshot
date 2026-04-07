import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API using the key from env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set. Real AI will not work until this is fixed.");
}

const genAI = new GoogleGenerativeAI(apiKey || 'uninitialized');
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

// Helper for the ChatCoach
export async function getChatResponse(history: { role: string, parts: { text: string }[] }[], newMessage: string, goal: string) {
  try {
    const chat = model.startChat({
      history: history,
      systemInstruction: {
        role: "system",
        parts: [{ 
          text: `You are NutriBot, an encouraging and extremely knowledgeable AI nutrition coach. 
          The user's current goal is: ${goal}. 
          Always provide practical, context-aware suggestions. If they mention cravings, suggest macro-friendly swaps. Keep responses under 4 sentences.` 
        }]
      }
    });

    const result = await chat.sendMessage(newMessage);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Sorry, my AI engine is having some trouble! Reason: ${error?.message || "Unknown error"}`;
  }
}

// Helper for FoodSwaps Engine
export async function getFoodSwaps(craving: string) {
  try {
    const prompt = `The user is craving: "${craving}". 
    Generate 2 healthy, practical food swaps that satisfy this craving. 
    Return strictly a raw JSON array of objects with the following schema, with no markdown formatting:
    [
      {
        "name": "Alternative Name",
        "matchScore": 95,
        "reason": "Why it works...",
        "macros": ["+High Protein", "-50% Calories"]
      }
    ]`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    // Clean potential markdown blocks
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini SWAP Error:", error);
    return null;
  }
}

// Helper for AI Food Scanner
export async function getScannerResults(foodItem: string) {
  try {
    const prompt = `The user has submitted the food item: "${foodItem}" to be scanned.
    Generate a health analysis. Return strictly a raw JSON object with no markdown formatting:
    {
      "healthScore": 45, (0-100 where 100 is extremely healthy)
      "regretScore": 85, (0-100 where 100 is very bad for health goals)
      "itemDetected": "What you think the item is based on input",
      "healthDesc": "Short description of its health impact",
      "regretDesc": "Short description of why they might regret it",
      "alternatives": [
        {
          "name": "Alternative 1",
          "reason": "Why it's better",
          "health": 90
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini SCAN Error:", error);
    return null;
  }
}
