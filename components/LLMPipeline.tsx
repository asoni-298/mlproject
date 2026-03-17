'use client';

import { motion } from 'framer-motion';
import { pipelineStages } from '@/lib/portfolio';

export default function LLMPipeline() {
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">LLM Pipeline</p>
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex min-w-max items-center gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={stage} className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="min-w-[180px] rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-5 shadow-[0_0_30px_rgba(56,189,248,0.10)]"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 text-base font-semibold text-white">{stage}</p>
              </motion.div>
              {index < pipelineStages.length - 1 ? (
                <motion.div
                  aria-hidden="true"
                  animate={{ x: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
                  className="text-2xl text-cyan-300"
                >
                  →
                </motion.div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
