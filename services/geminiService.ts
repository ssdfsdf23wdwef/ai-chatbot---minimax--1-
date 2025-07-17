import { GoogleGenAI, Chat, Content } from "@google/genai";
import type { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export function createChatSession(history?: Message[]): Chat {
  // Map app's message format to Gemini's content format.
  // Filter out any empty messages that may have been added as placeholders.
  const geminiHistory: Content[] | undefined = history
    ?.filter(msg => msg.content.trim() !== '')
    .map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

  const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: 'Sen sadece Türkçe cevap veren bir yapay zeka asistanısın. Başka hiçbir dilde cevap verme.',
    },
    history: geminiHistory,
  });
  return chat;
}

export async function generateTitle(conversation: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Bu sohbeti kenar çubuğunda gösterilecek şekilde en fazla 5 kelimelik kısa bir başlık olarak özetle: "${conversation}"`,
        });
        // Let's remove quotes if the model adds them
        return response.text.trim().replace(/["']/g, '');
    } catch(e) {
        console.error("Title generation failed:", e);
        return "Yeni Sohbet";
    }
}