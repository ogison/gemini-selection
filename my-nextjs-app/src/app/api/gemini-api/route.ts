import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt_post } = await req.json();
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  try {
    const result = await model.generateContent(prompt_post);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({
      message: text,
    });
  } catch (error) {
    console.error("Error generating response:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: true,
          message: error.message || "Unknown error occurred",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "An unexpected error occurred.",
        },
        { status: 500 }
      );
    }
  }
}
