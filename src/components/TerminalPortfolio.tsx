"use client";

import TerminalView from "./terminal/TerminalView";
import { useTerminalShell } from "./terminal/useTerminalShell";

export default function TerminalPortfolio() {
  const shell = useTerminalShell();
  return <TerminalView shell={shell} />;
}
