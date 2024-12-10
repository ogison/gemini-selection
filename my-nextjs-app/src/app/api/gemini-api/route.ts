import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

interface RequestBody {
  prompt_post: string;
}

export async function POST(req: Request) {
  const { prompt_post } = (await req.json()) as RequestBody;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  try {
    const result = await model.generateContent(prompt_post);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      message: text,
    });
  } catch (error) {
    console.error('Error generating response:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: true,
          message: error.message || 'Unknown error occurred',
        },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          error: true,
          message: 'An unexpected error occurred.',
        },
        { status: 500 },
      );
    }
  }
}
