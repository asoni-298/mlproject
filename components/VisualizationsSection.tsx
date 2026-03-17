'use client';

import dynamic from 'next/dynamic';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SectionShell from '@/components/SectionShell';
import { forecastSeries } from '@/lib/portfolio';

const LLMPipeline = dynamic(() => import('@/components/LLMPipeline'), {
  ssr: false,
});

export default function VisualizationsSection() {
  return (
    <SectionShell
      id="visualizations"
      eyebrow="Interactive Visualizations"
      title="Visual explanations for retrieval flows, LLM pipelines, and forecasting behavior."
      description="Combining AI system thinking with engineering storytelling helps recruiters and stakeholders understand both the technical depth and the product shape."
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <LLMPipeline />

        <div className="glass-panel rounded-[2rem] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">Forecasting Visualization</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Forecast vs. actual series inspired by Ashish&apos;s commodity intelligence work.
          </p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastSeries}>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    background: '#0F172A',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '16px',
                  }}
                />
                <Line type="monotone" dataKey="actual" stroke="#38BDF8" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="predicted" stroke="#6366F1" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span className="text-cyan-300">Actual</span>
            <span className="text-indigo-300">Predicted</span>
          </div>
        </div>
      </div>

      <div className="mt-6 glass-panel rounded-[2rem] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Confidence Surface</p>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastSeries}>
              <defs>
                <linearGradient id="confidenceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  background: '#0F172A',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  borderRadius: '16px',
                }}
              />
              <Area type="monotone" dataKey="confidence" stroke="#38BDF8" fill="url(#confidenceFill)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SectionShell>
  );
}
