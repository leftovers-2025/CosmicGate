import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = 'gemini-2.5-flash';
const SYSTEM_PROMPT = `
あなたは行動評価プログラムです。行動や文章に対して評価して数字のみを出力します。
数字の範囲は-500から500までです。
`;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const gemini = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

export const fetchVirtuePoint = async (text: string) => {
    const response = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        config: {
            systemInstruction: {
                parts: [{
                    text: SYSTEM_PROMPT,
                }]
            }
        },
        contents: text,
    })
    const output =  response.text;
    if (output) {
        return output;
    }
    return '';
}
