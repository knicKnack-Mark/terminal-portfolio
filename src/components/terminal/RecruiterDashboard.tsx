"use client";

type RecruiterDashboardProps = {
  onRunCommand: (command: string) => void;
  onClose: () => void;
};

const projects = [
  {
    number: "01",
    name: "GEO//NEXUS",
    category: "GEOSPATIAL EXPERIENCE",
    stack: "NEXT.JS · TYPESCRIPT · THREE.JS",
    description:
      "An immersive geodetic engineering experience with animated terrain and geospatial exploration.",
    command: "open geonexus",
  },
  {
    number: "02",
    name: "BRMS",
    category: "BANKING MANAGEMENT",
    stack: "NUXT · LARAVEL · REST API",
    description:
      "A banking management frontend integrated with backend APIs and authentication workflows.",
    command: "open brms",
  },
  {
    number: "03",
    name: "INVOICE SYSTEM",
    category: "BUSINESS APPLICATION",
    stack: "NEXT.JS · PYTHON · SQLALCHEMY",
    description:
      "An invoice and expense management application with structured backend services and data access.",
    command: "open invoice-system",
  },
  {
    number: "04",
    name: "VET CARE SYSTEM",
    category: "WEB APPLICATION",
    stack: "STACK TO BE CONFIRMED",
    description:
      "A portfolio project ready for its verified technology stack and case study.",
    command: "open vet-care-system",
  },
];

const strengths = [
  {
    number: "01",
    title: "Web Development",
    detail: "Responsive interfaces, reusable components, frontend integration",
    tags: ["Next.js", "React", "Nuxt", "TypeScript"],
  },
  {
    number: "02",
    title: "Backend & APIs",
    detail: "REST endpoints, CRUD workflows, validation, application logic",
    tags: ["Python", "Laravel", "PHP", "REST APIs"],
  },
  {
    number: "03",
    title: "Database Administration",
    detail: "Database troubleshooting, integrity, access control, optimization",
    tags: ["SQL", "MySQL", "MariaDB"],
  },
  {
    number: "04",
    title: "Systems & Operations",
    detail: "Linux environments, server troubleshooting, deployment and monitoring",
    tags: ["Linux", "AWS", "Server Operations"],
  },
];

export default function RecruiterDashboard({
  onRunCommand,
  onClose,
}: RecruiterDashboardProps) {
  return (
    <main className="recruiter-dashboard">
      <header className="recruiter-dashboard__topbar">
        <button
          type="button"
          className="recruiter-dashboard__brand"
          onClick={onClose}
          aria-label="Return to terminal"
        >
          <span className="recruiter-dashboard__brand-mark">N.</span>
          <span>
            <strong>NEIL&apos;S PORTFOLIO</strong>
            <small>RECRUITER ACCESS / 01</small>
          </span>
        </button>

        <div className="recruiter-dashboard__system-status">
          <span />
          PORTFOLIO SYSTEM ONLINE
        </div>

        <button
          type="button"
          className="recruiter-dashboard__terminal-button"
          onClick={onClose}
        >
          <span aria-hidden="true">{"<"}</span> TERMINAL
        </button>
      </header>

      <section className="recruiter-dashboard__hero">
        <div className="recruiter-dashboard__hero-copy">
          <div className="recruiter-dashboard__eyebrow">
            <span>AVAILABLE FOR THE RIGHT OPPORTUNITY</span>
          </div>

          <h1>
            Building systems.
            <br />
            <span>Solving problems.</span>
          </h1>

          <p className="recruiter-dashboard__intro">
            A technology professional working across web development,
            database administration, and systems operations. Focused on
            building practical applications and keeping the systems behind
            them reliable.
          </p>

          <div className="recruiter-dashboard__hero-actions">
            <button
              type="button"
              className="recruiter-dashboard__primary-button"
              onClick={() => onRunCommand("projects")}
            >
              EXPLORE PROJECTS <span aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              className="recruiter-dashboard__secondary-button"
              onClick={() => onRunCommand("contact")}
            >
              CONTACT ME <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="recruiter-dashboard__identity-panel">
          <div className="recruiter-dashboard__panel-top">
            <span>PROFILE / NEIL</span>
            <span>SYS.001</span>
          </div>

          <div className="recruiter-dashboard__identity-art" aria-hidden="true">
            <div className="recruiter-dashboard__orbit recruiter-dashboard__orbit--one" />
            <div className="recruiter-dashboard__orbit recruiter-dashboard__orbit--two" />
            <div className="recruiter-dashboard__identity-initials">N</div>
            <div className="recruiter-dashboard__identity-cross">+</div>
          </div>

          <div className="recruiter-dashboard__identity-info">
            <span>PRIMARY FOCUS</span>
            <strong>APPLICATIONS &amp; SYSTEMS</strong>
            <span>WORKING ACROSS THE STACK</span>
          </div>

          <div className="recruiter-dashboard__panel-bottom">
            <span>STATUS: OPERATIONAL</span>
            <span>PH / UTC+8</span>
          </div>
        </div>
      </section>

      <section
        className="recruiter-dashboard__metrics"
        aria-label="Profile highlights"
      >
        <div>
          <span>01 / DEVELOPMENT</span>
          <strong>Web Applications</strong>
          <small>Interfaces · APIs · Integration</small>
        </div>
        <div>
          <span>02 / DATA</span>
          <strong>Database Systems</strong>
          <small>Integrity · Troubleshooting</small>
        </div>
        <div>
          <span>03 / OPERATIONS</span>
          <strong>Server Administration</strong>
          <small>Linux · Monitoring · Deployment</small>
        </div>
      </section>

      <section className="recruiter-dashboard__section">
        <div className="recruiter-dashboard__section-heading">
          <div>
            <span className="recruiter-dashboard__eyebrow">
              SELECTED WORK / 001—004
            </span>
            <h2>Featured projects</h2>
          </div>
          <button
            type="button"
            className="recruiter-dashboard__text-action"
            onClick={() => onRunCommand("projects")}
          >
            ALL PROJECTS ↗
          </button>
        </div>

        <div className="recruiter-dashboard__projects">
          {projects.map((project) => (
            <article
              key={project.number}
              className="recruiter-dashboard__project"
            >
              <div className="recruiter-dashboard__project-top">
                <span>PROJECT / {project.number}</span>
                <span aria-hidden="true">↗</span>
              </div>

              <div
                className={`recruiter-dashboard__project-art recruiter-dashboard__project-art--${project.number}`}
                aria-hidden="true"
              >
                <div className="recruiter-dashboard__art-grid" />
                <div className="recruiter-dashboard__art-label">
                  {project.number} / SYSTEM
                </div>
                <div className="recruiter-dashboard__art-title">
                  {project.name}
                </div>
              </div>

              <div className="recruiter-dashboard__project-content">
                <span className="recruiter-dashboard__project-category">
                  {project.category}
                </span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="recruiter-dashboard__project-stack">
                  {project.stack}
                </div>
                <button
                  type="button"
                  className="recruiter-dashboard__project-link"
                  onClick={() => onRunCommand(project.command)}
                >
                  OPEN CASE STUDY <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="recruiter-dashboard__section recruiter-dashboard__strength-section">
        <div className="recruiter-dashboard__section-heading">
          <div>
            <span className="recruiter-dashboard__eyebrow">
              CAPABILITIES / 004 DOMAINS
            </span>
            <h2>Technical strengths</h2>
          </div>
          <button
            type="button"
            className="recruiter-dashboard__text-action"
            onClick={() => onRunCommand("skills")}
          >
            SKILLS MATRIX ↗
          </button>
        </div>

        <div className="recruiter-dashboard__strengths">
          {strengths.map((strength) => (
            <article
              key={strength.number}
              className="recruiter-dashboard__strength"
            >
              <span className="recruiter-dashboard__strength-number">
                {strength.number}
              </span>
              <h3>{strength.title}</h3>
              <p>{strength.detail}</p>
              <div className="recruiter-dashboard__tags">
                {strength.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="recruiter-dashboard__cta">
        <div>
          <span className="recruiter-dashboard__eyebrow">
            NEXT STEP / COLLABORATION
          </span>
          <h2>Have a role or project in mind?</h2>
          <p>
            Let&apos;s discuss how my development, database, and systems
            experience could contribute to your team.
          </p>
        </div>
        <div className="recruiter-dashboard__cta-actions">
          <button
            type="button"
            className="recruiter-dashboard__primary-button"
            onClick={() => onRunCommand("contact")}
          >
            GET IN TOUCH ↗
          </button>
          <button
            type="button"
            className="recruiter-dashboard__resume-button"
            disabled
            title="Resume download will be connected later"
          >
            RESUME / COMING SOON
          </button>
        </div>
      </section>

      <footer className="recruiter-dashboard__footer">
        <span>NEIL / DEVELOPER &amp; SYSTEMS PROFESSIONAL</span>
        <button type="button" onClick={onClose}>
          RETURN TO SHELL ↑
        </button>
        <span>© {new Date().getFullYear()} / END OF PROFILE</span>
      </footer>
    </main>
  );
}
