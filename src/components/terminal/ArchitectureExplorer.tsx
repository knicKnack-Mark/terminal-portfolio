
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ARCHITECTURE_PROJECTS,
  type ArchitectureLayer,
  type ArchitectureProjectSlug,
  type ArchitectureNode,
  isArchitectureProjectSlug,
} from "./architectureData";

type ArchitectureExplorerProps = {
  initialProject?: ArchitectureProjectSlug;
  onClose: () => void;
};

const PROJECTS = Object.values(ARCHITECTURE_PROJECTS);

const LAYERS: Array<{ value: ArchitectureLayer | "all"; label: string }> = [
  { value: "all", label: "ALL LAYERS" },
  { value: "frontend", label: "FRONTEND" },
  { value: "api", label: "API" },
  { value: "backend", label: "BACKEND" },
  { value: "database", label: "DATA" },
  { value: "infrastructure", label: "INFRASTRUCTURE" },
];

export default function ArchitectureExplorer({
  initialProject = "geonexus",
  onClose,
}: ArchitectureExplorerProps) {
  const [projectSlug, setProjectSlug] =
    useState<ArchitectureProjectSlug>(initialProject);
  const [selectedNodeId, setSelectedNodeId] =
    useState(ARCHITECTURE_PROJECTS[initialProject].nodes[0]?.id ?? "");
  const [activeLayer, setActiveLayer] =
    useState<ArchitectureLayer | "all">("all");
  const [flowRunning, setFlowRunning] = useState(false);
  const [flowStep, setFlowStep] = useState(0);

  const project = ARCHITECTURE_PROJECTS[projectSlug];

  useEffect(() => {
    if (!flowRunning) return;

    if (flowStep >= project.connections.length) {
      const timeout = window.setTimeout(() => {
        setFlowRunning(false);
        setFlowStep(0);
      }, 1000);

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setFlowStep((step) => step + 1);
    }, 850);

    return () => window.clearTimeout(timeout);
  }, [flowRunning, flowStep, project.connections.length]);

  const selectedNode = useMemo(
    () =>
      project.nodes.find((node) => node.id === selectedNodeId) ??
      project.nodes[0],
    [project.nodes, selectedNodeId],
  );

  const visibleNodes = project.nodes.filter(
    (node) => activeLayer === "all" || node.layer === activeLayer,
  );

  const getNode = (id: string) =>
    project.nodes.find((node) => node.id === id);

  function selectProject(value: string) {
    if (!isArchitectureProjectSlug(value)) return;

    const nextProject = ARCHITECTURE_PROJECTS[value];

    setProjectSlug(value);
    setSelectedNodeId(nextProject.nodes[0]?.id ?? "");
    setActiveLayer("all");
    setFlowRunning(false);
    setFlowStep(0);
  }

  function runFlow() {
    setSelectedNodeId(project.nodes[0]?.id ?? "");
    setActiveLayer("all");
    setFlowStep(0);
    setFlowRunning(true);
  }

  function layerLabel(layer: ArchitectureLayer) {
    return LAYERS.find((item) => item.value === layer)?.label ?? layer;
  }

  return (
    <section
      className="architecture-explorer"
      aria-label="Interactive system architecture explorer"
    >
      <header className="architecture-explorer__header">
        <div className="architecture-explorer__eyebrow">
          <span className="architecture-explorer__pulse" />
          SYSTEMS / ARCHITECTURE LAB
        </div>

        <div className="architecture-explorer__heading-row">
          <div>
            <h1>Architecture Explorer</h1>
            <p>
              Inspect system layers, responsibilities, and request flow.
            </p>
          </div>

          <button
            type="button"
            className="architecture-explorer__close"
            onClick={onClose}
          >
            <span aria-hidden="true">←</span> TERMINAL
          </button>
        </div>
      </header>

      <nav
        className="architecture-explorer__projects"
        aria-label="Select project"
      >
        {PROJECTS.map((item, index) => (
          <button
            type="button"
            key={item.slug}
            className={`architecture-explorer__project ${
              projectSlug === item.slug
                ? "is-active"
                : ""
            }`}
            onClick={() => selectProject(item.slug)}
            aria-pressed={projectSlug === item.slug}
          >
            <span className="architecture-explorer__project-number">
              SYS_0{index + 1}
            </span>
            <span>{item.name}</span>
            <span className="architecture-explorer__project-arrow">↗</span>
          </button>
        ))}
      </nav>

      <div className="architecture-explorer__project-intro">
        <div>
          <span className="architecture-explorer__eyebrow">
            {project.subtitle}
          </span>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>

        <button
          type="button"
          className="architecture-explorer__run"
          onClick={runFlow}
          disabled={flowRunning || project.connections.length === 0}
        >
          <span aria-hidden="true">▶</span>
          {flowRunning ? "TRACING FLOW..." : "TRACE REQUEST FLOW"}
        </button>
      </div>

      <div className="architecture-explorer__workspace">
        <section className="architecture-explorer__diagram">
          <div className="architecture-explorer__section-heading">
            <div>
              <span className="architecture-explorer__eyebrow">
                FIG. 01 / SYSTEM MAP
              </span>
              <h3>Component topology</h3>
            </div>
            <span className="architecture-explorer__count">
              {project.nodes.length.toString().padStart(2, "0")} NODES
            </span>
          </div>

          <div className="architecture-explorer__filters">
            {LAYERS.map((layer) => (
              <button
                type="button"
                key={layer.value}
                className={`architecture-explorer__filter ${
                  activeLayer === layer.value ? "is-active" : ""
                }`}
                onClick={() => setActiveLayer(layer.value)}
                aria-pressed={activeLayer === layer.value}
              >
                {layer.label}
              </button>
            ))}
          </div>

          <div className="architecture-explorer__node-grid">
            {visibleNodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const originalIndex = project.nodes.findIndex(
                (item) => item.id === node.id,
              );
              const isFlowActive =
                flowRunning &&
                project.connections[flowStep]?.to === node.id;

              return (
                <div className="architecture-explorer__node-wrap" key={node.id}>
                  {index > 0 && (
                    <div className="architecture-explorer__connector">
                      <span aria-hidden="true">↓</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className={[
                      "architecture-explorer__node",
                      isSelected ? "is-selected" : "",
                      isFlowActive ? "is-flow-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setSelectedNodeId(node.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="architecture-explorer__node-top">
                      <span>
                        NODE / {String(originalIndex + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`architecture-explorer__node-dot layer-${node.layer}`}
                      />
                    </span>

                    <span className="architecture-explorer__node-title">
                      {node.label}
                    </span>

                    <span className="architecture-explorer__node-tech">
                      {node.technology}
                    </span>

                    <span className="architecture-explorer__node-bottom">
                      <span>{layerLabel(node.layer)}</span>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </button>

                  {index < visibleNodes.length - 1 && (
                    <div className="architecture-explorer__connection-label">
                      {project.connections.find(
                        (connection) =>
                          connection.from === node.id &&
                          connection.to === visibleNodes[index + 1]?.id,
                      )?.label ?? "RELATED COMPONENT"}
                    </div>
                  )}
                </div>
              );
            })}

            {visibleNodes.length === 0 && (
              <div className="architecture-explorer__empty">
                No nodes in this layer for the selected project.
              </div>
            )}
          </div>

          <div className="architecture-explorer__legend">
            <span>
              <span className="architecture-explorer__legend-dot" />
              Selected component
            </span>
            <span>
              <span className="architecture-explorer__legend-dot is-flow" />
              Active flow step
            </span>
          </div>

          <div className="architecture-explorer__flow-status" aria-live="polite">
            <span className="architecture-explorer__flow-indicator" />
            {flowRunning
              ? `TRACING: ${
                  getNode(project.connections[flowStep]?.from ?? "")?.label ??
                  "REQUEST"
                } → ${
                  getNode(project.connections[flowStep]?.to ?? "")?.label ??
                  "COMPLETE"
                }`
              : "SYSTEM MAP READY · SELECT A NODE TO INSPECT"}
          </div>
        </section>

        <aside className="architecture-explorer__details">
          <div className="architecture-explorer__section-heading">
            <div>
              <span className="architecture-explorer__eyebrow">
                FIG. 02 / COMPONENT DETAIL
              </span>
              <h3>Node inspector</h3>
            </div>
            <span className="architecture-explorer__inspect-icon">⌘</span>
          </div>

          {selectedNode ? (
            <NodeDetails
              node={selectedNode}
              layerLabel={layerLabel}
            />
          ) : (
            <p className="architecture-explorer__muted">
              Select a component from the system map.
            </p>
          )}

          <div className="architecture-explorer__detail-footer">
            <span>PROJECT</span>
            <strong>{project.name}</strong>
            <span>COMPONENTS</span>
            <strong>{project.nodes.length} documented nodes</strong>
          </div>
        </aside>
      </div>

      <footer className="architecture-explorer__footer">
        <span>PORTFOLIO SYSTEMS LAB</span>
        <span>INTERACTIVE ARCHITECTURE / 01</span>
        <span>BUILD WITH INTENT.</span>
      </footer>
    </section>
  );
}

function NodeDetails({
  node,
  layerLabel,
}: {
  node: ArchitectureNode;
  layerLabel: (layer: ArchitectureLayer) => string;
}) {
  return (
    <div className="architecture-explorer__node-details">
      <span className="architecture-explorer__detail-index">
        COMPONENT / {node.id.toUpperCase().replaceAll("-", "_")}
      </span>

      <h4>{node.label}</h4>

      <span className="architecture-explorer__detail-layer">
        {layerLabel(node.layer)}
      </span>

      <div className="architecture-explorer__detail-block">
        <span className="architecture-explorer__detail-label">
          TECHNOLOGY
        </span>
        <p>{node.technology}</p>
      </div>

      <div className="architecture-explorer__detail-block">
        <span className="architecture-explorer__detail-label">
          RESPONSIBILITY
        </span>
        <p>{node.description}</p>
      </div>

      <div className="architecture-explorer__detail-block">
        <span className="architecture-explorer__detail-label">
          KEY FUNCTIONS
        </span>
        <ul>
          {node.responsibilities.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      </div>

      <div
        className={`architecture-explorer__verification ${
          node.verified ? "is-verified" : "is-unverified"
        }`}
      >
        <span aria-hidden="true">{node.verified ? "●" : "○"}</span>
        {node.verified
          ? "Based on known project implementation"
          : "Details require implementation verification"}
      </div>
    </div>
  );
}
