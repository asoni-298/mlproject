'use client';

import { motion } from 'framer-motion';
import SectionShell from '@/components/SectionShell';
import { fadeInUp } from '@/lib/animations';
import { portfolioData } from '@/lib/portfolio';

export default function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="Experience shaped around enterprise AI systems, observability, latency, and measurable outcomes."
      description="The portfolio centers on one deep production role rather than a broad list of shallow experiments."
    >
      <div className="relative pl-6 md:pl-10">
        <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-indigo-400 to-transparent md:left-4" />
        {portfolioData.experience.map((item) => (
          <motion.article
            key={item.id}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="glass-panel relative mb-6 rounded-[2rem] p-8"
          >
            <span className="absolute -left-[1.15rem] top-10 h-4 w-4 rounded-full border-4 border-[var(--bg-primary)] bg-cyan-400 md:-left-[2.35rem]" />
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">{item.company}</p>
                <h3 className="mt-3 text-2xl text-white">{item.role}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{item.overview}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-white/5 px-4 py-3 text-sm text-slate-400">
                <p>{item.duration}</p>
                <p>{item.location}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <ul className="space-y-3 text-sm leading-7 text-slate-300">
                {item.keyContributions.map((point) => (
                  <li key={point} className="rounded-2xl border border-slate-800 bg-white/5 px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>

              <div className="glass-panel rounded-[1.5rem] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">Tech Surface</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-2 text-sm text-indigo-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
