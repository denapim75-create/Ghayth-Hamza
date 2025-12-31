
import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  return '';
};

export const getQuizQuestions = async (period: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return [];
  
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${period} dönemi için 3 test sorusu hazırla. JSON dön.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ['question', 'options', 'correctAnswer', 'explanation']
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [];
  }
};

export const getNPCResponse = async (writer: string, userMessage: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "...";
  
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sen ${writer}sin. Kısa cevap ver: ${userMessage}`,
    });
    return response.text || "...";
  } catch (error) {
    return "...";
  }
};

export const evaluateShortStory = async (story: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "Başarıyla kaydedildi.";
  
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bu hikayeyi değerlendir: ${story}`,
    });
    return response.text || "Eseriniz kaydedildi.";
  } catch (error) {
    return "Eseriniz kaydedildi.";
  }
};
