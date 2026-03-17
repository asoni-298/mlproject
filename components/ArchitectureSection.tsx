'use client';

import dynamic from 'next/dynamic';
import SectionShell from '@/components/SectionShell';

const RAGSimulator = dynamic(() => import('@/components/RAGSimulator'), {
  ssr: false,
});

export default function ArchitectureSection() {
  return (
    <SectionShell
      id="architecture"
      eyebrow="AI Architecture"
      title="An interactive retrieval-augmented generation stack designed for enterprise intelligence."
      description="This section mirrors the way Ashish approaches production AI systems: retrieval quality, prompt construction, orchestration, and response delivery all treated as first-class engineering concerns."
    >
      <RAGSimulator />
    </SectionShell>
  );
}
