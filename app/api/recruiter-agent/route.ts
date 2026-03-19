import { GoogleGenAI } from '@google/genai';
import { buildRecruiterSystemPrompt, type RecruiterChatMessage } from '@/lib/recruiter-agent';

export async function POST(request: Request) {
  const { messages }: { messages: RecruiterChatMessage[] } = await request.json();
  const apiKey = process.env.GEMINI_API_KEY;
  const encoder = new TextEncoder();

  if (!apiKey) {
    return new Response(
      'Recruiter agent is unavailable until GEMINI_API_KEY is configured in .env.local.',
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      },
    );
  }

  const genAI = new GoogleGenAI({ apiKey });
  const prompt = buildRecruiterSystemPrompt(messages);
  const result = await genAI.models.generateContentStream({
    model: 'gemini-2.5-flash-lite',
    contents: prompt,
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result) {
          controller.enqueue(encoder.encode(chunk.text ?? ''));
        }
      } catch {
        controller.enqueue(
          encoder.encode(
            'The recruiter assistant hit a temporary issue while preparing a response. Please try again.',
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
