import { GoogleGenerativeAI } from '@google/generative-ai';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  const { messages, portfolioContext }: { messages: ChatMessage[]; portfolioContext: unknown } =
    await request.json();

  const encoder = new TextEncoder();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(
      'Gemini API key not configured. Add GEMINI_API_KEY to enable live portfolio chat.',
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const transcript = messages
    .map((message) => `${message.role === 'user' ? 'User' : 'Assistant'}: ${message.content}`)
    .join('\n');

  const prompt = `
You are the portfolio assistant for Ashish Soni.
Answer in a concise, technically credible, recruiter-friendly way.
Stay grounded in the provided portfolio context and do not invent employers, metrics, or achievements.

Portfolio context:
${JSON.stringify(portfolioContext, null, 2)}

Conversation:
${transcript}

Respond to the latest user message.
`;

  const result = await model.generateContentStream(prompt);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          controller.enqueue(encoder.encode(chunk.text()));
        }
      } catch {
        controller.enqueue(
          encoder.encode('The portfolio assistant encountered an issue while streaming a response.')
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
