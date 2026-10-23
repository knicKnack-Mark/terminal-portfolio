
"use client";

type DashboardProps = {
  onRunCommand: (command: string) => void;
};

const projects = [
  {
    number: "01",
    name: "GEO//NEXUS",
    slug: "geonexus",
    description: "Geospatial and surveying experience",
    stack: "NEXT.JS / TYPESCRIPT",
  },
  {
    number: "02",
    name: "BRMS",
    slug: "brms",
    description: "Banking management frontend",
    stack: "NUXT / LARAVEL",
  },
  {
    number: "03",
    name: "INVOICE SYSTEM",
    slug: "invoice-system",
    description: "Invoicing and expense management",
    stack: "NEXT.JS / PYTHON",
  },
  {
    number: "04",
    name: "VET CARE SYSTEM",
    slug: "vet-care-system",
    description: "Veterinary management application",
    stack: "WEB APPLICATION",
  },
];

const skills = [
  "TYPESCRIPT",
  "REACT / NEXT.JS",
  "VUE / NUXT",
  "PYTHON",
  "PHP / LARAVEL",
  "SQL / DATABASES",
  "LINUX ADMIN",
  "REST APIS",
];

export default function Dashboard({ onRunCommand }: DashboardProps) {
  return (
    <section className="command-dashboard" aria-label="NEIL_OS Command Center">
      <div className="dashboard-topline">
        <span className="dashboard-eyebrow">
          <span className="dashboard-live-dot" />
          NEIL_OS / COMMAND CENTER
        </span>
        <span className="dashboard-version">BUILD 1.0.0</span>
      </div>

      <div className="dashboard-hero">
        <div>
          <p className="dashboard-kicker">DEVELOPER PROFILE // 001</p>
          <h2>
            SYSTEM
            <br />
            <span>OVERVIEW.</span>
          </h2>
          <p className="dashboard-intro">
            Developer and IT professional working across web applications,
            APIs, databases, and Linux infrastructure.
          </p>
          <div className="dashboard-actions">
            <button
              type="button"
              onClick={() => onRunCommand("recruiter")}
            >
              <span>↗</span> RECRUITER MODE
            </button>
            <button
              type="button"
              className="dashboard-button-secondary"
              onClick={() => onRunCommand("contact")}
            >
              CONTACT
            </button>
          </div>
        </div>

        <div className="dashboard-orbit" aria-hidden="true">
          <div className="dashboard-orbit-ring dashboard-orbit-ring-outer" />
          <div className="dashboard-orbit-ring dashboard-orbit-ring-inner" />
          <div className="dashboard-orbit-center">
            <span>NB</span>
            <small>ONLINE</small>
          </div>
          <span className="dashboard-orbit-label dashboard-orbit-label-top">
            SYS.ACTIVE
          </span>
          <span className="dashboard-orbit-label dashboard-orbit-label-bottom">
            PH / DEV
          </span>
        </div>
      </div>

      <div className="dashboard-section-heading">
        <span>01 / CORE DOMAINS</span>
        <span>CAPABILITIES</span>
      </div>

      <div className="dashboard-metrics">
        <article className="dashboard-metric">
          <span className="dashboard-metric-icon">{"</>"}</span>
          <span className="dashboard-metric-value">WEB</span>
          <span className="dashboard-metric-label">APPLICATIONS</span>
          <p>Frontend interfaces and full-stack workflows.</p>
        </article>

        <article className="dashboard-metric">
          <span className="dashboard-metric-icon">⌘</span>
          <span className="dashboard-metric-value">API</span>
          <span className="dashboard-metric-label">BACKEND SYSTEMS</span>
          <p>REST endpoints, integrations, and business logic.</p>
        </article>

        <article className="dashboard-metric">
          <span className="dashboard-metric-icon">▤</span>
          <span className="dashboard-metric-value">DATA</span>
          <span className="dashboard-metric-label">DATABASES</span>
          <p>SQL, database operations, and troubleshooting.</p>
        </article>

        <article className="dashboard-metric">
          <span className="dashboard-metric-icon">$_</span>
          <span className="dashboard-metric-value">SYS</span>
          <span className="dashboard-metric-label">INFRASTRUCTURE</span>
          <p>Linux administration, monitoring, and deployment.</p>
        </article>
      </div>

      <div className="dashboard-section-heading">
        <span>02 / SELECTED WORK</span>
        <button
          type="button"
          className="dashboard-text-button"
          onClick={() => onRunCommand("projects")}
        >
          ALL PROJECTS ↗
        </button>
      </div>

      <div className="dashboard-projects">
        {projects.map((project) => (
          <button
            type="button"
            className="dashboard-project"
            key={project.slug}
            onClick={() => onRunCommand(`open ${project.slug}`)}
          >
            <span className="dashboard-project-number">{project.number}</span>
            <span className="dashboard-project-content">
              <strong>{project.name}</strong>
              <span>{project.description}</span>
              <small>{project.stack}</small>
            </span>
            <span className="dashboard-project-arrow">↗</span>
          </button>
        ))}
      </div>

      <div className="dashboard-section-heading">
        <span>03 / TECHNICAL STACK</span>
        <span>SELECTED SKILLS</span>
      </div>

      <div className="dashboard-skills">
        {skills.map((skill) => (
          <span key={skill} className="dashboard-skill">
            <span>+</span> {skill}
          </span>
        ))}
      </div>

      <div className="dashboard-bottom">
        <div>
          <span className="dashboard-bottom-label">CURRENT SESSION</span>
          <strong>INTERACTIVE PORTFOLIO</strong>
        </div>
        <button
          type="button"
          onClick={() => onRunCommand("help")}
        >
          OPEN COMMAND REFERENCE →
        </button>
      </div>

      <p className="dashboard-disclaimer">
        PROJECT DESCRIPTIONS AND TECHNOLOGY LABELS ARE PORTFOLIO SUMMARIES.
        VERIFY DETAILS AND LINKS BEFORE PUBLICATION.
      </p>
    </section>
  );
}
