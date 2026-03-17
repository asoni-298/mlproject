'use client';

import { motion } from 'framer-motion';
import SectionShell from '@/components/SectionShell';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { portfolioData } from '@/lib/portfolio';

export default function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Skills"
      title="A full-stack AI engineer toolkit across modeling, orchestration, backend systems, and product surfaces."
      description="Built for teams that care about both technical depth and production readiness."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {Object.entries(portfolioData.skills).map(([category, items]) => (
          <motion.article key={category} variants={fadeInUp} className="glass-panel rounded-[2rem] p-6">
            <h3 className="text-xl text-white">{category}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
