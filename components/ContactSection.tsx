'use client';

import { motion } from 'framer-motion';
import SectionShell from '@/components/SectionShell';
import { portfolioData } from '@/lib/portfolio';

export default function ContactSection() {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Open to ambitious AI product, platform, and research-adjacent engineering opportunities."
      description="Designed to impress recruiters, but built to start serious technical conversations."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] p-8">
          <h3 className="text-2xl text-white">Work with Ashish</h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Ashish is best suited for teams building LLM products, enterprise AI systems, AI infrastructure,
            forecasting platforms, and decision intelligence tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(56,189,248,0.45)]"
            >
              Email Directly
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/30"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            { label: 'Email', value: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
            { label: 'GitHub', value: portfolioData.personal.github, href: portfolioData.personal.github },
            { label: 'Location', value: portfolioData.personal.location, href: undefined },
          ].map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-panel rounded-[2rem] p-6"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">{item.label}</p>
              {item.href ? (
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-4 block text-lg text-white transition hover:text-cyan-200">
                  {item.value}
                </a>
              ) : (
                <p className="mt-4 text-lg text-white">{item.value}</p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
