
"use client";

import { useEffect, useState } from "react";
import TerminalView from "./terminal/TerminalView";
import { useTerminalShell } from "./terminal/useTerminalShell";

export default function TerminalPortfolio() {
  const [mounted, setMounted] = useState(false);
  const shell = useTerminalShell();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keep server and initial client output identical.
  if (!mounted) {
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
              neil@portfolio: ~
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
          <section className="terminal-output" aria-label="Terminal output">
            <div className="terminal-welcome">
              <p className="terminal-muted">NEIL_OS — SYSTEM STARTUP</p>
              <pre className="terminal-result">{"▌"}</pre>
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
      </main>
    );
  }

  return <TerminalView shell={shell} />;
}
