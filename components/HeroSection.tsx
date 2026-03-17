'use client';

import { motion } from 'framer-motion';
import { heroStats, portfolioData } from '@/lib/portfolio';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function HeroSection() {
  return (
    <section className="section-shell relative min-h-screen pt-6">
      <header className="glass-panel sticky top-4 z-20 mb-16 flex items-center justify-between rounded-full px-4 py-3 md:px-6">
        <a
          href="#top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-sm font-semibold text-cyan-200"
          aria-label="Go to top of portfolio"
        >
          AS
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <div id="top" className="grid items-center gap-10 pb-16 lg:grid-cols-[1.3fr_0.7fr] lg:pb-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300/80"
          >
            OpenAI-caliber AI engineer portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl"
          >
            {portfolioData.personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-2xl"
          >
            {portfolioData.personal.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg"
          >
            {portfolioData.personal.about}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(56,189,248,0.45)]"
            >
              Explore Projects
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="inline-flex items-center rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              Contact Ashish
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="glass-panel grid gap-6 rounded-[2rem] p-6 md:p-8"
        >
          <div className="grid-noise rounded-[1.5rem] border border-cyan-400/10 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Current Focus</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>Enterprise-grade RAG systems for decision intelligence</li>
              <li>LLM orchestration and tool-augmented AI workflows</li>
              <li>Forecasting, optimization, and production ML systems</li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-indigo-400/20 bg-indigo-500/10 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">Connect</p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <a className="block transition hover:text-white" href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="block transition hover:text-white" href={portfolioData.personal.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="block transition hover:text-white" href={`mailto:${portfolioData.personal.email}`}>
                {portfolioData.personal.email}
              </a>
              <p>{portfolioData.personal.location}</p>
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {heroStats.map((stat) => (
          <article
            key={stat.label}
            className="glass-panel neon-ring rounded-3xl p-5"
            aria-label={`${stat.value} ${stat.label}`}
          >
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{stat.label}</p>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
