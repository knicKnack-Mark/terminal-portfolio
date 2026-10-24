"use client";

import { formatPath } from "./filesystem";
import type { TerminalShellState } from "./useTerminalShell";
import Dashboard from "./Dashboard";
import ProjectCaseStudy from "./ProjectCaseStudy";
import ProjectDemo from "./ProjectDemo";
import SkillsMatrix from "./SkillsMatrix";
import ArchitectureExplorer from "./ArchitectureExplorer";
import RecruiterDashboard from "./RecruiterDashboard";
import CommandPalette from "./CommandPalette";

export default function TerminalView({ shell }: { shell: TerminalShellState }) {
  const {
    cwd, input, setInput, entries, activePreview, setActivePreview,
    editorPath, setEditorPath, editorValue, setEditorValue, message,
    booted, bootLines, showDashboard, setShowDashboard,
    activeCaseStudy, setActiveCaseStudy,
    showSkillsMatrix, setShowSkillsMatrix, skillsCategory,
    showArchitecture, setShowArchitecture, architectureProject,
    showRecruiterDashboard, setShowRecruiterDashboard,
    inputRef, outputRef, execute, saveEditor, handleKeyDown,
  } = shell;

  return (
    <main className="terminal-page">
      <div className="terminal-shell">
        <header className="terminal-titlebar">
          <div className="terminal-window-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="terminal-window-title">
            <span className="terminal-title-icon">⌘</span>
            neil@portfolio: {formatPath(cwd)}
          </div>
          <div className="terminal-title-actions">
            <span>UTF-8</span>
            <span>bash</span>
          </div>
        </header>

        <div className="terminal-systembar">
          <span><i className="terminal-status-dot" /> SYSTEM ONLINE</span>
          <span>USER: NEIL</span>
          <span>FS: PORTFOLIO</span>
        </div>

        <section
          className="terminal-output"
          ref={outputRef}
          onClick={() => inputRef.current?.focus()}
          aria-label="Terminal output"
        >
          {!booted && (
            <div className="terminal-welcome" role="status" aria-live="polite">
              <p className="terminal-muted">NEIL_OS — SYSTEM STARTUP</p>
                <pre className="terminal-result">
                  {bootLines.join("\n")}
                  {bootLines.length < 5 && "\n▌"}
                </pre>
            </div>
          )}

          {booted && entries.length === 0 && (
            <div className="terminal-welcome">
              <pre className="terminal-ascii" aria-label="NEIL">
{` _   _ _____ ___ _
| \\ | | ____|_ _| |
|  \\| |  _|  | || |
| |\\  | |___ | || |___
|_| \\_|_____|___|_____|`}
              </pre>
              <p className="terminal-muted">Welcome to Neil&apos;s interactive portfolio.</p>
              <p className="terminal-muted">Linux-inspired shell · Read-only virtual filesystem</p>
              <p className="terminal-hint">Type <button onClick={() => execute("help")}>help</button> to get started.</p>
            </div>
          )}

          {entries.map((entry) => (
            <div className="terminal-entry" key={entry.id}>
              <div className="terminal-command-line">
                <span className="terminal-user">neil@portfolio</span>
                <span className="terminal-path">:{formatPath(entry.cwd)}</span>
                <span className="terminal-dollar">$</span>
                <span className="terminal-command">{entry.command}</span>
              </div>
              {entry.output && (
                <pre className="terminal-result">{entry.output}</pre>
              )}
            </div>
          ))}

          {showDashboard && (
            <Dashboard
              onRunCommand={(command) => {
                setShowDashboard(false);
                execute(command);
              }}
            />
          )}

          {activeCaseStudy && (
            <ProjectCaseStudy
              slug={activeCaseStudy}
              onBack={() => {
                setActiveCaseStudy("");
                setShowDashboard(true);
              }}
              onRunCommand={(command) => {
                setActiveCaseStudy("");
                execute(command);
              }}
            />
          )}

          {showSkillsMatrix && (
            <SkillsMatrix
              key={skillsCategory}
              initialCategory={skillsCategory}
              onClose={() => setShowSkillsMatrix(false)}
            />
          )}

          {activePreview && (
            <div className="terminal-preview">
              <div className="terminal-preview-header">
                <span><i className="terminal-status-dot" /> PROJECT PREVIEW</span>
                <button onClick={() => setActivePreview("")}>[ close ]</button>
              </div>
              <ProjectDemo path={activePreview} />
            </div>
          )}

          {editorPath && (
            <div className="terminal-editor">
              <div className="terminal-editor-header">
                GNU nano — {editorPath}
              </div>
              <textarea
                value={editorValue}
                onChange={(event) => setEditorValue(event.target.value)}
                spellCheck={false}
                aria-label="Nano text editor"
              />
              <div className="terminal-editor-footer">
                <button onClick={saveEditor}>Ctrl+O Save</button>
                <button onClick={() => setEditorPath("")}>Ctrl+X Exit</button>
              </div>
            </div>
          )}

          {message && <div className="terminal-message">{message}</div>}

          <div className="terminal-input-line">
            <span className="terminal-user">neil@portfolio</span>
            <span className="terminal-path">:{formatPath(cwd)}</span>
            <span className="terminal-dollar">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Enter a terminal command"
              placeholder="type a command..."
            />
            <span className="terminal-cursor" aria-hidden="true" />
          </div>
        </section>

        <footer className="terminal-footer">
          <span>INTERACTIVE PORTFOLIO / v1.0.0</span>
          <span>↑↓ HISTORY · TAB AUTOCOMPLETE · CTRL+L CLEAR</span>
        </footer>
      </div>

      <p className="terminal-outside-note">
        A portfolio built like a system. Explore it like a developer.
      </p>

      {showArchitecture && (
        <ArchitectureExplorer
          key={architectureProject}
          initialProject={architectureProject}
          onClose={() => setShowArchitecture(false)}
        />
      )}

      {showRecruiterDashboard && (
        <RecruiterDashboard
          onRunCommand={(command) => {
            setShowRecruiterDashboard(false);
            execute(command);
          }}
          onClose={() => setShowRecruiterDashboard(false)}
        />
      )}

      <CommandPalette onRunCommand={execute} />
    </main>
  );
}
