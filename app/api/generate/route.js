import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are an expert construction admin assistant named 'Sjef'.
      Your goal is to extract invoice details from a rough user input.
      
      Input Example: "Dakgoot repareren 2 uur werk en 50 euro materiaal"
      
      Output JSON Format:
      {
        "description": "Short project title (e.g. Dakgoot Reparatie)",
        "date": "DD-MM-YYYY",
        "items": [
          { "desc": "Arbeid (uurtje factuurtje)", "qty": 2, "price": 55, "total": 110 },
          { "desc": "Materiaal", "qty": 1, "price": 50, "total": 50 }
        ],
        "subtotal": 160,
        "vat": 33.6,
        "total": 193.6,
        "clientName": "Klant van Sjef",
        "invoiceNumber": "F-2024-001"
      }

      Rules:
      - Always assume a base hourly rate of €55 if not specified.
      - Calculate totals accurately.
      - Return ONLY the JSON object, no markdown code blocks.
    `;

    const result = await model.generateContent([systemPrompt, `User Input: "${prompt}"`]);
    const response = await result.response;
    const text = response.text();

    // Cleanup markup if present
    const cleanJson = text.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleanJson));

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({
      error: error.message || "Failed to generate invoice",
      stack: error.stack
    }, { status: 500 });
  }
}
