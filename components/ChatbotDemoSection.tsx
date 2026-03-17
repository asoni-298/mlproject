'use client';

import dynamic from 'next/dynamic';
import SectionShell from '@/components/SectionShell';

const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
});

export default function ChatbotDemoSection() {
  return (
    <SectionShell
      id="chatbot"
      eyebrow="AI Chatbot Demo"
      title="A portfolio-native AI assistant that streams answers from Gemini."
      description="The chat experience is designed to feel product-grade: contextual prompts, loading states, streaming output, and fallback behavior when keys are missing."
    >
      <Chatbot />
    </SectionShell>
  );
}
