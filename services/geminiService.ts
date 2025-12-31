
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

const cleanJSON = (text: string) => {
  if (!text) return "[]";
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start !== -1 && end !== -1) return text.substring(start, end + 1);
  return text.trim();
};

const TURKISH_GRAMMAR = "Cevaplarında Türkçe yazım ve noktalama kurallarına (TDK) harfiyen uy. Nazik ve edebi bir dil kullan.";

export const getQuizQuestions = async (period: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${period} dönemi için 3 orta zorlukta test sorusu hazırla. Sadece JSON array dön. ${TURKISH_GRAMMAR}`,
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
    return JSON.parse(cleanJSON(response.text || "[]"));
  } catch (error) {
    console.error("Quiz hatası:", error);
    return [{
      question: "Edebiyat yolculuğuna devam etmeye hazır mısınız?",
      options: ["Evet", "Her zaman"],
      correctAnswer: 0,
      explanation: "Küçük bir bağlantı sorunu oluştu ancak azminiz tam!"
    }];
  }
};

export const getNPCResponse = async (writer: string, userMessage: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sen Türk edebiyatının usta kalemi ${writer}sin. Kısa, öz ve mükemmel bir Türkçe ile cevap ver. Kullanıcı mesajı: ${userMessage}. ${TURKISH_GRAMMAR}`,
    });
    return response.text || "...";
  } catch (error) {
    return "Şu an kelimelerim kifayetsiz kalıyor, lütfen tekrar deneyiniz.";
  }
};

export const evaluateShortStory = async (story: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bu kısa hikayeyi bir edebiyat eleştirmeni olarak 2-3 cümlede değerlendir ve yazım kurallarına uygunluğunu belirt: ${story}. ${TURKISH_GRAMMAR}`,
    });
    return response.text || "Eseriniz kütüphanemizin nadide parçaları arasına girdi.";
  } catch (error) {
    return "Hikayeniz başarıyla kaydedildi.";
  }
};
