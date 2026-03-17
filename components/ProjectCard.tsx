'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/lib/portfolio';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="glass-panel group rounded-[2rem] p-6 transition duration-300 hover:border-cyan-400/30"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">{project.category}</p>
        <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
          {project.impact}
        </span>
      </div>

      <h3 className="mt-5 text-2xl text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-indigo-200">{project.subtitle}</p>
      <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-800 bg-white/5 p-4">
            <p className="text-lg font-semibold text-white">{metric.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-200">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-800 pt-5">
        <a href={project.github} target="_blank" rel="noreferrer" className="text-sm text-cyan-300 transition hover:text-white">
          View repository
        </a>
        <span className="text-xs uppercase tracking-[0.25em] text-slate-500 group-hover:text-cyan-300">
          AI project
        </span>
      </div>
    </motion.article>
  );
}
