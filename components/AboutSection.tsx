'use client';

import { motion } from 'framer-motion';
import SectionShell from '@/components/SectionShell';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { portfolioData } from '@/lib/portfolio';

export default function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="Engineering AI systems that feel product-ready, resilient, and grounded in real business impact."
      description={portfolioData.personal.summary}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <motion.article variants={fadeInUp} className="glass-panel rounded-[2rem] p-8">
          <p className="text-base leading-8 text-slate-300">{portfolioData.summary}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {portfolioData.education.map((item) => (
              <div key={item.institution} className="rounded-3xl border border-slate-800 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Education</p>
                <h3 className="mt-4 text-xl text-white">{item.institution}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.degree}</p>
                <p className="mt-2 text-sm text-slate-500">
                  {item.location} • {item.graduationYear} • CGPA {item.cgpa}
                </p>
              </div>
            ))}
            <div className="rounded-3xl border border-slate-800 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Strengths</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>System design for LLM workflows</li>
                <li>Applied ML with direct business outcomes</li>
                <li>Strong backend, data, and visualization craft</li>
              </ul>
            </div>
          </div>
        </motion.article>

        <motion.article variants={fadeInUp} className="glass-panel rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">Internships & Research</p>
          <div className="mt-6 space-y-4">
            {portfolioData.internships.map((item) => (
              <div key={item.company} className="rounded-3xl border border-slate-800 bg-white/5 p-5">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg text-white">{item.company}</h3>
                  <p className="text-sm text-slate-300">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </SectionShell>
  );
}
