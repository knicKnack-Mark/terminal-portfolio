
"use client";

import {
  PROJECT_CASE_STUDIES,
  type ProjectSlug,
} from "./projectData";

type ProjectCaseStudyProps = {
  slug: ProjectSlug;
  onBack: () => void;
  onRunCommand: (command: string) => void;
};

export default function ProjectCaseStudy({
  slug,
  onBack,
  onRunCommand,
}: ProjectCaseStudyProps) {
  const project = PROJECT_CASE_STUDIES[slug];

  return (
    <section
      className="project-case-study"
      aria-label={`${project.name} case study`}
    >
      <div className="case-study-topbar">
        <button
          type="button"
          className="case-study-back"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span> BACK TO COMMAND CENTER
        </button>

        <span className="case-study-index">
          PROJECT FILE / {project.number}
        </span>
      </div>

      <header className="case-study-hero">
        <div className="case-study-hero-copy">
          <p className="case-study-eyebrow">
            {project.category}
          </p>

          <h2>{project.name}</h2>

          <p className="case-study-summary">
            {project.summary}
          </p>

          <div className="case-study-actions">
            <button
              type="button"
              onClick={() => onRunCommand("projects")}
            >
              VIEW PROJECT LIST ↗
            </button>

            <button
              type="button"
              className="case-study-secondary"
              onClick={() => onRunCommand("contact")}
            >
              CONTACT
            </button>
          </div>
        </div>

        <div
          className={`case-study-visual case-study-visual-${slug}`}
          aria-label={`${project.name} visual preview`}
          role="img"
        >
          <div className="case-visual-grid" />
          <div className="case-visual-orbit case-visual-orbit-one" />
          <div className="case-visual-orbit case-visual-orbit-two" />

          <div className="case-visual-cross case-visual-cross-one">
            +
          </div>
          <div className="case-visual-cross case-visual-cross-two">
            +
          </div>

          <div className="case-visual-center">
            <span>{project.number}</span>
            <strong>
              {slug === "geonexus"
                ? "GEO / DATA"
                : slug === "brms"
                  ? "CORE / FLOW"
                  : slug === "invoice-system"
                    ? "FIN / TRACK"
                    : "CARE / SYS"}
            </strong>
            <small>PROJECT PREVIEW</small>
          </div>

          <span className="case-visual-coordinate">
            SYS://PROJECT_{project.number}
          </span>
        </div>
      </header>

      <div className="case-study-meta">
        <div>
          <span>PROJECT STATUS</span>
          <strong>{project.status}</strong>
        </div>

        <div>
          <span>ROLE</span>
          <strong>{project.role}</strong>
        </div>

        <div>
          <span>PROJECT ID</span>
          <strong>NX-{project.number}-2026</strong>
        </div>
      </div>

      <div className="case-study-content-grid">
        <article className="case-study-panel case-study-overview">
          <p className="case-study-section-label">
            01 / OVERVIEW
          </p>
          <h3>What is this project?</h3>
          <p>{project.overview}</p>
        </article>

        <article className="case-study-panel">
          <p className="case-study-section-label">
            02 / TECHNOLOGY
          </p>
          <h3>Built with</h3>

          <div className="case-study-tech-list">
            {project.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </article>
      </div>

      <section className="case-study-panel case-study-features">
        <div className="case-study-section-label">
          03 / KEY FEATURES
        </div>

        <div className="case-study-feature-list">
          {project.features.map((feature, index) => (
            <div className="case-study-feature" key={feature}>
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{feature}</p>
              <span aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="case-study-footer">
        <div>
          <span className="case-study-section-label">
            END OF PROJECT FILE
          </span>
          <p>
            Interested in the work? Get in touch to discuss
            the project and its implementation.
          </p>
        </div>

        <div className="case-study-links">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB REPOSITORY ↗
            </a>
          ) : (
            <span className="case-study-link-disabled">
              REPOSITORY NOT CONFIGURED
            </span>
          )}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              LIVE PROJECT ↗
            </a>
          ) : (
            <span className="case-study-link-disabled">
              LIVE DEMO NOT CONFIGURED
            </span>
          )}

          <button
            type="button"
            onClick={() => onRunCommand("contact")}
          >
            CONTACT ME ↗
          </button>
        </div>
      </footer>
    </section>
  );
}
