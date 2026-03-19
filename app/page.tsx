'use client';

import { useState } from 'react';
import { portfolioData } from '@/data/portfolio-data';
import RecruiterAgent from '@/components/RecruiterAgent';

const impactMetrics = [
  { value: '3+', label: 'Years in AI systems' },
  { value: '70%', label: 'Latency reduction' },
  { value: '99.78%', label: 'Forecast accuracy' },
  { value: 'Rs. 19 Cr+', label: 'Business value created' },
];

const featuredProof = [
  'Enterprise RAG systems for decision intelligence',
  'Forecasting and optimization platforms with measurable outcomes',
  'Production-focused AI engineering across backend, data, and UX',
];

const contactDetails = [
  {
    label: 'Gmail',
    value: portfolioData.personal.email,
    href: `mailto:${portfolioData.personal.email}`,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M4.9 18.3h2.6V12l-3.7-2.8v7.7c0 .8.6 1.4 1.1 1.4Z" />
        <path fill="#34A853" d="M16.5 18.3h2.6c.6 0 1.1-.6 1.1-1.4V9.2L16.5 12v6.3Z" />
        <path fill="#FBBC04" d="M16.5 6.9V12l3.7-2.8V7.6c0-1.7-1.8-2.6-3-1.7l-.7 1Z" />
        <path fill="#4285F4" d="M7.5 12V6.9l4.5 3.4 4.5-3.4V12l-4.5 3.4L7.5 12Z" />
        <path fill="#C5221F" d="M3.8 7.6v1.6L7.5 12V6.9l-.7-1C5.5 5 3.8 5.9 3.8 7.6Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'ashish-soni12',
    href: portfolioData.personal.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#0A66C2" d="M5.3 8.6A1.65 1.65 0 1 1 5.3 5.3a1.65 1.65 0 0 1 0 3.3Zm1.4 1.2H3.9v8.9h2.8V9.8Zm4.5 0H8.5v8.9h2.8V14c0-2.4 3.1-2.6 3.1 0v4.7h2.8v-5.6c0-4.4-4.9-4.2-6-.9V9.8Z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'asoni-298',
    href: portfolioData.personal.github,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#181717" d="M12 2.7a9.3 9.3 0 0 0-2.9 18.1c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.3-1.2-3.3-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.6.3-1 .6-1.2-2.2-.3-4.5-1.1-4.5-4.8a3.8 3.8 0 0 1 1-2.6c-.1-.3-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.2.1 2.5a3.8 3.8 0 0 1 1 2.6c0 3.7-2.3 4.5-4.5 4.8.4.3.7.9.7 1.7v2.5c0 .3.2.6.7.5A9.3 9.3 0 0 0 12 2.7Z" />
      </svg>
    ),
  },
];

const contactMeta = [
  { label: 'Phone', value: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone.replace(/\s+/g, '')}` },
  { label: 'Current Location', value: portfolioData.personal.location, href: 'https://www.google.com/maps/search/?api=1&query=Ahmedabad%2C%20Gujarat' },
  { label: 'Home Town', value: portfolioData.personal.hometown, href: 'https://www.google.com/maps/search/?api=1&query=Indore%2C%20Madhya%20Pradesh' },
];

type Tone = 'gold' | 'blue' | 'cyan' | 'violet' | 'emerald' | 'rose';
type IconKey =
  | 'docs'
  | 'user'
  | 'agent'
  | 'api'
  | 'vector'
  | 'llm'
  | 'dashboard'
  | 'ocr'
  | 'storage'
  | 'forecast'
  | 'nlp'
  | 'model'
  | 'inventory'
  | 'optimization'
  | 'supply'
  | 'customer'
  | 'segmentation'
  | 'retention'
  | 'analytics';

type ArchitectureNode = {
  label: string;
  icon: IconKey;
  tone: Tone;
  caption?: string;
};

type ProjectArchitecture = {
  title: string;
  primary: ArchitectureNode[];
  secondary?: ArchitectureNode[];
  foundation: ArchitectureNode[];
};

const projectArchitectures: Record<number, ProjectArchitecture> = {
  1: {
    title: 'Agentic RAG System Architecture',
    primary: [
      { label: 'Enterprise Docs', icon: 'docs', tone: 'gold', caption: 'Reports, emails, contracts' },
      { label: 'OCR + Parsing', icon: 'ocr', tone: 'cyan', caption: 'Azure Document Intelligence' },
      { label: 'Vector Index', icon: 'vector', tone: 'blue', caption: 'FAISS + embeddings' },
      { label: 'LLM Router', icon: 'llm', tone: 'violet', caption: 'GPT-4o | Claude | Gemini' },
      { label: 'AI Dashboard', icon: 'dashboard', tone: 'emerald', caption: 'Decision-ready insights' },
    ],
    secondary: [
      { label: 'User Query', icon: 'user', tone: 'blue' },
      { label: 'Query Agent', icon: 'agent', tone: 'cyan' },
      { label: 'API Gateway', icon: 'api', tone: 'rose' },
      { label: 'Blob Storage', icon: 'storage', tone: 'gold' },
    ],
    foundation: [
      { label: 'FastAPI', icon: 'api', tone: 'cyan' },
      { label: 'LangChain', icon: 'agent', tone: 'violet' },
      { label: 'FAISS', icon: 'vector', tone: 'blue' },
      { label: 'Azure Blob', icon: 'storage', tone: 'gold' },
    ],
  },
  2: {
    title: 'Coal Price Forecasting Architecture',
    primary: [
      { label: 'Market + News Data', icon: 'docs', tone: 'gold', caption: 'Prices, reports, external signals' },
      { label: 'NLP Sentiment Layer', icon: 'nlp', tone: 'cyan', caption: 'Geopolitical context extraction' },
      { label: 'Feature Engineering', icon: 'analytics', tone: 'blue', caption: 'Time-series decomposition' },
      { label: 'Ensemble Models', icon: 'model', tone: 'violet', caption: 'XGBoost | RF | Holt-Winters' },
      { label: 'Forecast Console', icon: 'forecast', tone: 'emerald', caption: 'Accuracy + trend outputs' },
    ],
    secondary: [
      { label: 'Azure ML', icon: 'api', tone: 'blue' },
      { label: 'Flask / R Shiny', icon: 'dashboard', tone: 'rose' },
      { label: 'Monitoring', icon: 'analytics', tone: 'gold' },
    ],
    foundation: [
      { label: 'Python', icon: 'api', tone: 'cyan' },
      { label: 'Scikit-learn', icon: 'model', tone: 'violet' },
      { label: 'NLP Toolkit', icon: 'nlp', tone: 'emerald' },
      { label: 'Visualization Apps', icon: 'dashboard', tone: 'blue' },
    ],
  },
  3: {
    title: 'Demand Forecasting & Inventory Architecture',
    primary: [
      { label: 'Sourcing / Dispatch / Sales', icon: 'supply', tone: 'gold', caption: 'Multi-dataset input streams' },
      { label: 'Demand Forecast Engine', icon: 'forecast', tone: 'blue', caption: 'Predictive demand scenarios' },
      { label: 'Optimization Layer', icon: 'optimization', tone: 'violet', caption: 'Constraint-based planning' },
      { label: 'Inventory Recommender', icon: 'inventory', tone: 'emerald', caption: 'Optimal stock levels' },
      { label: 'Business Impact View', icon: 'dashboard', tone: 'cyan', caption: 'Revenue uplift tracking' },
    ],
    secondary: [
      { label: 'Planning Inputs', icon: 'docs', tone: 'rose' },
      { label: 'ML Models', icon: 'model', tone: 'blue' },
      { label: 'What-if Analysis', icon: 'analytics', tone: 'gold' },
    ],
    foundation: [
      { label: 'Pandas', icon: 'analytics', tone: 'blue' },
      { label: 'Scikit-learn', icon: 'model', tone: 'violet' },
      { label: 'Linear Programming', icon: 'optimization', tone: 'emerald' },
      { label: 'Python', icon: 'api', tone: 'cyan' },
    ],
  },
  4: {
    title: 'Customer Intelligence Platform Architecture',
    primary: [
      { label: 'Customer Data Streams', icon: 'customer', tone: 'gold', caption: 'Behavior, transactions, tenure' },
      { label: 'Feature Engineering', icon: 'analytics', tone: 'cyan', caption: 'Signals + engagement metrics' },
      { label: 'Segmentation Model', icon: 'segmentation', tone: 'violet', caption: 'High / medium / low value' },
      { label: 'Churn Predictor', icon: 'retention', tone: 'rose', caption: 'At-risk customer scoring' },
      { label: 'Retention Dashboard', icon: 'dashboard', tone: 'emerald', caption: 'Actionable interventions' },
    ],
    secondary: [
      { label: 'CRM Inputs', icon: 'docs', tone: 'blue' },
      { label: 'Classification Models', icon: 'model', tone: 'violet' },
      { label: 'Sales Action Loop', icon: 'user', tone: 'gold' },
    ],
    foundation: [
      { label: 'Python', icon: 'api', tone: 'cyan' },
      { label: 'ML Classification', icon: 'model', tone: 'blue' },
      { label: 'Customer Analytics', icon: 'analytics', tone: 'emerald' },
      { label: 'Segmentation Logic', icon: 'segmentation', tone: 'rose' },
    ],
  },
};

function ArchitectureGlyph({ icon }: { icon: IconKey }) {
  switch (icon) {
    case 'docs':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1-1.5Z" fill="currentColor" opacity=".2" />
          <path d="M8.5 11h7M8.5 14h7M8.5 17h5M14 3.5v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'user':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M5.5 18.5c1.5-3 4-4.5 6.5-4.5s5 1.5 6.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'agent':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M12 3.5v3M12 17.5v3M20.5 12h-3M6.5 12h-3M18.2 5.8l-2.1 2.1M7.9 16.1l-2.1 2.1M18.2 18.2l-2.1-2.1M7.9 7.9 5.8 5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'api':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="m9 9-2.5 3L9 15M15 9l2.5 3-2.5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'vector':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="7" cy="7" r="2" fill="currentColor" />
          <circle cx="17" cy="7" r="2" fill="currentColor" opacity=".85" />
          <circle cx="7" cy="17" r="2" fill="currentColor" opacity=".7" />
          <circle cx="17" cy="17" r="2" fill="currentColor" opacity=".55" />
          <path d="M9 7h6M7 9v6M17 9v6M9 17h6M8.4 8.4l7.2 7.2M15.6 8.4l-7.2 7.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case 'llm':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 6.5h8A3.5 3.5 0 0 1 19.5 10v4A3.5 3.5 0 0 1 16 17.5h-2.5L10 20v-2.5H8A3.5 3.5 0 0 1 4.5 14v-4A3.5 3.5 0 0 1 8 6.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
          <path d="M9 11.5h6M9 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'dashboard':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M8 19.5h8M10 16v3.5M14 16v3.5M7.5 13l3-3 2.4 1.8 3.6-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'ocr':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M16 8h4M16 12h4M16 16h4M7 9.5h4M7 13h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'storage':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <ellipse cx="12" cy="7" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M6 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7M6 12v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'forecast':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18.5h14M6.5 15.5l3-3 2.4 1.6 5.6-6.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M15 8h2.5v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'nlp':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.5 8.5h11M6.5 12h7M6.5 15.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16.5 5.5h1a2 2 0 0 1 2 2v9l-3-2.2-3 2.2V7.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        </svg>
      );
    case 'model':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="7" cy="12" r="2" fill="currentColor" />
          <circle cx="17" cy="7" r="2" fill="currentColor" opacity=".8" />
          <circle cx="17" cy="17" r="2" fill="currentColor" opacity=".6" />
          <path d="M9 12h6M15.5 8.4 9 11M15.5 15.6 9 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'inventory':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 8.5 12 5l7 3.5v7L12 19l-7-3.5v-7Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
          <path d="M12 5v14M5 8.5l7 3.5 7-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case 'optimization':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 17.5 18 6.5M8 6.5h10v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="6" cy="17.5" r="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'supply':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 8.5h10v7h-10ZM14.5 10.5h2.8l2.2 2.5v2.5h-5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
          <circle cx="8" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="17" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'customer':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="16.5" cy="10" r="2" stroke="currentColor" strokeWidth="1.6" fill="none" opacity=".8" />
          <path d="M4.8 18c1.2-2.4 3.2-3.6 5.2-3.6s4 1.2 5.2 3.6M14.5 17.5c.8-1.5 2.1-2.2 3.3-2.2s2.5.7 3.3 2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'segmentation':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4.5a7.5 7.5 0 1 1-7.5 7.5A7.5 7.5 0 0 1 12 4.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M12 4.5V12l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'retention':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19s-6-3.5-6-8.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 6 3.8C18 15.5 12 19 12 19Z" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'analytics':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18.5h14M7.5 16V12M12 16V8M16.5 16v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

function ArchitectureDiagram({ projectId }: { projectId: number }) {
  const architecture = projectArchitectures[projectId];
  const secondaryNodes = architecture.secondary ?? [];

  return (
    <section className="architecture-panel">
      <div className="architecture-heading">
        <p className="section-tag">Architecture</p>
        <h4>{architecture.title}</h4>
      </div>

      <div className="architecture-canvas">
        {secondaryNodes.length > 0 ? (
          <div className="architecture-row architecture-row-secondary">
            {secondaryNodes.map((node, index) => (
              <div key={`${node.label}-${index}`} className="architecture-flow-item">
                <div className={`architecture-node tone-${node.tone}`}>
                  <span className="architecture-icon">
                    <ArchitectureGlyph icon={node.icon} />
                  </span>
                  <span className="architecture-label">{node.label}</span>
                </div>
                {index < secondaryNodes.length - 1 ? <span className="architecture-arrow" aria-hidden="true" /> : null}
              </div>
            ))}
          </div>
        ) : null}

        <div className="architecture-row">
          {architecture.primary.map((node, index) => (
            <div key={`${node.label}-${index}`} className="architecture-flow-item">
              <div className={`architecture-node tone-${node.tone}`}>
                <span className="architecture-icon">
                  <ArchitectureGlyph icon={node.icon} />
                </span>
                <span className="architecture-label">{node.label}</span>
                {node.caption ? <span className="architecture-caption">{node.caption}</span> : null}
              </div>
              {index < architecture.primary.length - 1 ? <span className="architecture-arrow" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>

        <div className="architecture-foundation">
          {architecture.foundation.map((node) => (
            <div key={node.label} className={`architecture-foundation-pill tone-${node.tone}`}>
              <span className="architecture-icon architecture-icon-small">
                <ArchitectureGlyph icon={node.icon} />
              </span>
              <span>{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

  const toggleProject = (projectId: number) => {
    setExpandedProjects((current) => ({
      ...current,
      [projectId]: !current[projectId],
    }));
  };

  return (
    <main className="folio-shell">
      <div className="folio-glow folio-glow-left" />
      <div className="folio-glow folio-glow-right" />

      <header className="topbar">
        <a className="wordmark" href="#home">
          AS
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="home" className="hero-layout">
        <div className="hero-name-block">
          <p className="section-tag">Open to Next-Gen AI Roles</p>
          <h1>{portfolioData.personal.name}</h1>
          <p className="hero-current-role">Working as a Gen AI Data Scientist at Adani AI Labs, Ahmedabad</p>
          <p className="hero-role-line">
            <span>{portfolioData.personal.desiredRoleLabel}</span>
            {portfolioData.personal.title}
          </p>
        </div>

        <div className="hero-bento">
          <article className="hero-copy-card">
            <p className="section-tag">Ashish Soni | GenAI Portfolio</p>
            <p className="hero-summary">{portfolioData.personal.about}</p>

            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                View Selected Work
              </a>
              <a className="secondary-button" href="#contact">
                Go to Contact
              </a>
            </div>
          </article>

          <article className="hero-copy-card contrast-panel contact-panel">
            <div className="contact-panel-heading">
              <p className="section-tag">Contact Details</p>
              <p className="contact-panel-copy">Organized access points for recruiters, collaborators, and hiring teams.</p>
            </div>

            <div className="contact-social-row">
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  className="contact-social-link"
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={`${item.label}: ${item.value}`}
                  title={item.label}
                >
                  <span className="contact-social-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div className="contact-detail-list">
              <a className="contact-detail-card" href={`mailto:${portfolioData.personal.email}`}>
                <span className="contact-detail-label">Email Address</span>
                <span className="contact-detail-value">{portfolioData.personal.email}</span>
              </a>

              {contactMeta.map((item) =>
                item.href ? (
                  <a key={item.label} className="contact-detail-card" href={item.href}>
                    <span className="contact-detail-label">{item.label}</span>
                    <span className="contact-detail-value">{item.value}</span>
                  </a>
                ) : (
                  <div key={item.label} className="contact-detail-card">
                    <span className="contact-detail-label">{item.label}</span>
                    <span className="contact-detail-value">{item.value}</span>
                  </div>
                ),
              )}
            </div>
          </article>

          <article className="info-panel hero-focus-panel">
            <p className="section-tag">Now Building</p>
            <ul className="clean-list">
              {featuredProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="metric-grid">
        {impactMetrics.map((metric) => (
          <article key={metric.label} className="metric-panel">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section id="skills" className="skills-section">
        <div className="section-heading-wide">
          <p className="section-tag">Capabilities</p>
          <h2>A full-stack AI toolkit across modeling, orchestration, backend systems, and delivery.</h2>
        </div>

        <div className="skills-grid">
          {Object.entries(portfolioData.skills).map(([category, items]) => (
            <article key={category} className="skill-panel">
              <h3>{category}</h3>
              <div className="pill-row">
                {items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section-grid">
        <div className="section-title-block">
          <p className="section-tag">About</p>
          <h2>Designing AI systems that turn fragmented data into decision-ready intelligence.</h2>
        </div>
        <div className="section-body-card">
          <p>{portfolioData.personal.summary}</p>
          <p>{portfolioData.summary}</p>
        </div>
      </section>

      <section id="experience" className="section-grid">
        <div className="section-title-block">
          <p className="section-tag">Experience</p>
          <h2>Enterprise-first engineering with measurable impact and production depth.</h2>
        </div>
        <div className="experience-stack">
          {portfolioData.experience.map((item) => (
            <article key={item.id} className="experience-card">
              <div className="experience-head">
                <div>
                  <p className="meta-label">{item.company}</p>
                  <h3>{item.role}</h3>
                </div>
                <div className="experience-meta">
                  <span>{item.duration}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <p className="card-copy">{item.overview}</p>

              <div className="pill-row">
                {item.technologies.map((tech) => (
                  <span key={tech} className="pill">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="clean-list compact-list">
                {item.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-heading-wide">
          <p className="section-tag">Selected Work</p>
          <h2>Projects grounded in architecture, execution quality, and business outcomes.</h2>
        </div>

        <div className="project-grid">
          {portfolioData.projects.map((project) => {
            const isExpanded = Boolean(expandedProjects[project.id]);

            return (
              <article key={project.id} className={`project-card ${isExpanded ? 'project-card-expanded' : ''}`}>
                <div className="project-card-header">
                  <div className="project-heading-block">
                    <div className="project-topline">
                      <span className="project-topline-pill">{project.category}</span>
                      <strong className="project-topline-pill project-topline-impact">{project.impact}</strong>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>

                  <button
                    type="button"
                    className={`project-toggle ${isExpanded ? 'is-open' : ''}`}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? `Collapse ${project.title}` : `Expand ${project.title}`}
                    onClick={() => toggleProject(project.id)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 10.5 12 14.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <p className="card-copy project-description-preview">{project.description}</p>

                <div className="mini-metric-grid">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="mini-metric-card">
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pill-row">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <span key={tech} className="pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {isExpanded ? (
                  <div className="project-expanded">
                    <ArchitectureDiagram projectId={project.id} />

                    <div className="project-expanded-grid">
                      <section className="project-detail-block">
                        <p className="section-tag">Project Description</p>
                        <p className="card-copy">{project.description}</p>
                        <p className="card-copy">{project.results}</p>
                      </section>

                      <section className="project-detail-block">
                        <p className="section-tag">Core Features</p>
                        <ul className="clean-list compact-list project-detail-list">
                          {project.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="project-detail-block">
                        <p className="section-tag">Resume Highlights</p>
                        <ul className="clean-list compact-list project-detail-list">
                          {project.keyContributions.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="project-detail-block">
                        <p className="section-tag">Tech Stack</p>
                        <div className="pill-row project-detail-pills">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="pill">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="three-panel-grid">
        <article className="info-card">
          <p className="section-tag">Education</p>
          {portfolioData.education.map((item) => (
            <div key={item.institution} className="info-block">
              <h3>{item.institution}</h3>
              <p>{item.degree}</p>
              <span>
                CGPA {item.cgpa} | {item.graduationYear} | {item.location}
              </span>
            </div>
          ))}
        </article>

        <article className="info-card">
          <p className="section-tag">Internships</p>
          <div className="info-list">
            {portfolioData.internships.map((item) => (
              <div key={item.company} className="info-block">
                <h3>{item.company}</h3>
                <p>{item.title}</p>
                <span>{item.duration}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="info-card">
          <p className="section-tag">Achievements</p>
          <ul className="clean-list compact-list">
            {portfolioData.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="contact" className="contact-banner">
        <div>
          <p className="section-tag">Contact</p>
          <h2>Open to building ambitious AI products, platforms, and decision systems.</h2>
          <p className="card-copy">
            If you&apos;re hiring, collaborating, or exploring an AI-led product direction, I&apos;d be glad to connect.
          </p>
        </div>
      </section>

      <RecruiterAgent />
    </main>
  );
}
