import axios from "axios";

interface GeminiResponse {
  candidates: { output: string }[];
}

type ErrorResponse = string;

export const generateResponse = async (
  message: string
): Promise<string | ErrorResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("APIキーが設定されていません");
    return "APIキーが設定されていません。";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const data = {
    prompt: {
      text: message,
    },
  };

  try {
    const response = await axios.post<GeminiResponse>(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data?.candidates?.length > 0) {
      return response.data.candidates[0].output;
    } else {
      return "適切な応答が得られませんでした。";
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return "申し訳ありませんが、応答を生成できませんでした。";
  }
};
