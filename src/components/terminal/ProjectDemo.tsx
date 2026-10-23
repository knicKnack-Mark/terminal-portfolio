"use client";

import { PROJECT_DETAILS } from "./config";

export default function ProjectDemo({ path }: { path: string }) {
  const projectName = path.split("/").slice(-2, -1)[0] ?? "project";
  const details = PROJECT_DETAILS[projectName];

  if (!details) {
    return (
      <div className="project-demo">
        <div className="project-demo-label">PORTFOLIO SANDBOX</div>
        <h2>{projectName.replaceAll("-", " ")}</h2>
        <p>Project details are not configured yet.</p>
      </div>
    );
  }

  const openUrl = (url: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="project-demo">
      <div className="project-demo-label">PROJECT SHOWCASE / {details.status.toUpperCase()}</div>
      <h2>{details.title}</h2>
      <p>{details.subtitle}</p>
      <div className="project-demo-screen">
        <span className="project-demo-prompt">neil@portfolio:~/projects/{projectName}$</span>
        <p><i className="terminal-status-dot" /> {details.status}</p>
        <p>{details.description}</p>
        <div className="project-demo-stack" style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "14px 0" }}>
          {details.stack.map((technology) => (
            <span
              key={technology}
              style={{ border: "1px solid var(--terminal-border, #29413b)", borderRadius: "4px", padding: "4px 8px", fontSize: "0.8rem" }}
            >
              {technology}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
          <button type="button" onClick={() => openUrl(details.githubUrl)} disabled={!details.githubUrl}>
            {details.githubUrl ? "View GitHub ↗" : "GitHub URL not configured"}
          </button>
          <button type="button" onClick={() => openUrl(details.liveUrl)} disabled={!details.liveUrl}>
            {details.liveUrl ? "Open live demo ↗" : "Live demo not configured"}
          </button>
        </div>
        {(!details.githubUrl || !details.liveUrl) && (
          <p className="terminal-muted" style={{ marginTop: "12px" }}>
            Add the real repository and deployment URLs in PROJECT_DETAILS near the top of TerminalPortfolio.tsx to enable these links.
          </p>
        )}
      </div>
      <p className="terminal-muted" style={{ marginTop: "12px" }}>
        Tip: run <code>cat README.md</code> to read the project file, or <code>cd projects/{projectName}</code> from your home directory to explore its virtual files.
      </p>
    </div>
  );
}
