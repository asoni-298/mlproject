'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const starterQuestions = [
  'How did you build your RAG system?',
  'Tell me about your forecasting work.',
  'What AI stack do you use most?',
  'What kind of teams are you best suited for?',
];

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'intro',
      role: 'assistant',
      content:
        'I am Ashish’s AI portfolio copilot. Ask about LLM systems, forecasting, enterprise AI architecture, or business outcomes.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const portfolioContext = useMemo(
    () => ({
      summary: portfolioData.personal.summary,
      projects: portfolioData.projects.map((project) => ({
        title: project.title,
        description: project.description,
        impact: project.impact,
        techStack: project.techStack,
      })),
      experience: portfolioData.experience.map((item) => ({
        company: item.company,
        role: item.role,
        overview: item.overview,
        contributions: item.keyContributions,
      })),
      skills: portfolioData.skills,
    }),
    []
  );

  useEffect(() => {
    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  async function submitMessage(messageText: string) {
    if (!messageText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: messageText,
    };

    const assistantId = `${Date.now()}-assistant`;
    setMessages((prev) => [...prev, userMessage, { id: assistantId, role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          portfolioContext,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to stream response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId ? { ...message, content: accumulated } : message
          )
        );
      }
    } catch {
      const fallback =
        'The live Gemini stream is unavailable right now, but Ashish’s portfolio centers on production RAG systems, forecasting engines, and business-impact AI. Ask again after configuring GEMINI_API_KEY to enable live responses.';
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId ? { ...message, content: fallback } : message
        )
      );
      setError('Live AI response unavailable. Showing a graceful fallback response.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-panel overflow-hidden rounded-[2rem]">
      <div className="border-b border-cyan-400/10 bg-cyan-400/5 px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">AI Chatbot Demo</h3>
            <p className="mt-1 text-sm text-slate-400">Streaming Gemini answers through `/api/chat`.</p>
          </div>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs uppercase tracking-[0.25em] text-cyan-100">
            gemini-1.5-flash
          </span>
        </div>
      </div>

      <div ref={viewportRef} className="h-[32rem] space-y-4 overflow-y-auto px-6 py-5" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-7 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950'
                    : 'border border-slate-800 bg-slate-950/70 text-slate-200'
                }`}
              >
                {message.content || (loading && message.role === 'assistant' ? 'Thinking…' : '')}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 1 && !loading ? (
          <div className="flex flex-wrap gap-3">
            {starterQuestions.map((question) => (
              <button
                key={question}
                onClick={() => void submitMessage(question)}
                className="rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
              >
                {question}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-800 p-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submitMessage(input);
          }}
          className="flex flex-col gap-3 md:flex-row"
        >
          <label htmlFor="chat-input" className="sr-only">
            Ask about Ashish&apos;s experience
          </label>
          <input
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about RAG architecture, forecasting, or production AI work..."
            className="min-h-14 flex-1 rounded-full border border-slate-700 bg-slate-950/80 px-5 text-sm text-white outline-none transition focus:border-cyan-400/40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="min-h-14 rounded-full bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Streaming...' : 'Send'}
          </button>
        </form>
        {error ? <p className="mt-3 text-sm text-amber-300">{error}</p> : null}
      </div>
    </div>
  );
}
