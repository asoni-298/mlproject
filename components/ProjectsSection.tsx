'use client';

import SectionShell from '@/components/SectionShell';
import ProjectCard from '@/components/ProjectCard';
import { portfolioData } from '@/lib/portfolio';

export default function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      eyebrow="Projects"
      title="Featured AI projects spanning agentic retrieval, forecasting, optimization, and customer intelligence."
      description="Each card emphasizes measurable impact, architectural maturity, and production relevance."
    >
      <div className="grid gap-6 xl:grid-cols-2">
        {portfolioData.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}
