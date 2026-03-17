import { portfolioData } from '@/lib/portfolio';

export default function Footer() {
  return (
    <footer className="section-shell border-t border-slate-900 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">{portfolioData.personal.name}</p>
          <p className="mt-1 text-sm text-slate-500">Built with Next.js, TypeScript, Three.js, React Flow, Recharts, and Gemini.</p>
        </div>
        <div className="flex gap-5 text-sm text-slate-400">
          <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="transition hover:text-white">
            GitHub
          </a>
          <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white">
            LinkedIn
          </a>
          <a href={`mailto:${portfolioData.personal.email}`} className="transition hover:text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
