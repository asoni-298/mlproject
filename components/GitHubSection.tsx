'use client';

import dynamic from 'next/dynamic';
import SectionShell from '@/components/SectionShell';
import { githubUsername } from '@/lib/portfolio';

const GitHubProjects = dynamic(() => import('@/components/GitHubProjects'), {
  ssr: false,
});

export default function GitHubSection() {
  return (
    <SectionShell
      id="github"
      eyebrow="GitHub Projects"
      title="A live project explorer powered by the GitHub REST API."
      description="The repository section stays dynamic and Vercel-ready, with graceful fallback data for API rate limits or missing tokens."
    >
      <GitHubProjects username={githubUsername} />
    </SectionShell>
  );
}
