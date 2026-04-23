/**
 * 🔱 Valley Express | Aletheia Auditor (Gemini AI Studio)
 * This script interfaces with Google AI Studio to perform tactical lead auditing.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Environment configurations
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_AI_STUDIO_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function auditLead(leadData) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
    You are the Aletheia Auditor for Valley Express Transport LLC.
    Task: Analyze the following logistics lead and assign a Truth Score (0-100).
    
    Rules:
    1. Score > 80: High-fidelity, immediate revenue opportunity.
    2. Score 50-80: Needs verification.
    3. Score < 50: Spam or low-margin noise.
    
    Context:
    - Valley Express focuses on Phoenix Medical, Industrial, and B2G Procurement.
    - We value direct B2B contacts and government bids (ADOT, Sky Harbor).
    
    Lead Data:
    Title: ${leadData.title}
    Source: ${leadData.source}
    Description: ${leadData.description}
    Link: ${leadData.link}
    
    Output Format (JSON ONLY):
    {
      "truth_score": number,
      "sector": "Medical" | "Industrial" | "B2G" | "General",
      "justification": "short reason",
      "recommended_action": "strike" | "watch" | "ignore"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("[!] Aletheia Audit Failed:", error);
    return { truth_score: 0, sector: "Unknown", justification: "Audit Error", recommended_action: "ignore" };
  }
}

module.exports = { auditLead };
