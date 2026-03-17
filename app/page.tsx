'use client';

import { portfolioData } from '@/data/portfolio-data';

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

export default function Home() {
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
        <div className="hero-copy-card">
          <p className="section-tag">Ashish Soni • GenAI Portfolio</p>
          <h1>{portfolioData.personal.name}</h1>
          <p className="hero-role">{portfolioData.personal.title}</p>
          <p className="hero-summary">{portfolioData.personal.about}</p>

          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              View Selected Work
            </a>
            <a className="secondary-button" href={`mailto:${portfolioData.personal.email}`}>
              Let&apos;s Connect
            </a>
          </div>
        </div>

        <aside className="hero-side-column">
          <article className="info-panel">
            <p className="section-tag">Now Building</p>
            <ul className="clean-list">
              {featuredProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="info-panel contrast-panel">
            <p className="section-tag">Contact</p>
            <div className="contact-stack">
              <span>{portfolioData.personal.location}</span>
              <a href={`mailto:${portfolioData.personal.email}`}>{portfolioData.personal.email}</a>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </article>
        </aside>
      </section>

      <section className="metric-grid">
        {impactMetrics.map((metric) => (
          <article key={metric.label} className="metric-panel">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
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
          {portfolioData.projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-topline">
                <span>{project.category}</span>
                <strong>{project.impact}</strong>
              </div>
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="card-copy">{project.description}</p>

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
            </article>
          ))}
        </div>
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

      <section className="three-panel-grid">
        <article className="info-card">
          <p className="section-tag">Education</p>
          {portfolioData.education.map((item) => (
            <div key={item.institution} className="info-block">
              <h3>{item.institution}</h3>
              <p>{item.degree}</p>
              <span>
                CGPA {item.cgpa} • {item.graduationYear} • {item.location}
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
            If you&apos;re hiring, collaborating, or exploring an AI-led product direction,
            I&apos;d be glad to connect.
          </p>
        </div>

        <div className="hero-actions">
          <a className="primary-button" href={`mailto:${portfolioData.personal.email}`}>
            {portfolioData.personal.email}
          </a>
          <a
            className="secondary-button"
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>
      </section>
    </main>
  );
}
