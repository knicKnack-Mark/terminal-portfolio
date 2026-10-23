"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { COMMANDS, HELP, PROJECT_DETAILS } from "./config";
import {
  HOME, directory, file, filesystem, getNode, listDirectory, normalizePath,
  readFile, tree,
} from "./filesystem";
import type { FsNode, HistoryEntry } from "./types";

export function useTerminalShell() {
  const [cwd, setCwd] = useState(HOME);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activePreview, setActivePreview] = useState("");
  const [editorPath, setEditorPath] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [message, setMessage] = useState("");
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const startupLines = [
      "[  OK  ] Initializing NEIL_OS portfolio shell",
      "[  OK  ] Loading developer profile",
      "[  OK  ] Mounting virtual filesystem at /home/neil",
      "[  OK  ] Enabling command history and Tab completion",
      "[  OK  ] Starting interactive session",
    ];

    const timers = startupLines.map((line, index) =>
      window.setTimeout(() => {
        setBootLines((previous) => [...previous, line]);
      }, 250 + index * 360),
    );

    const finishTimer = window.setTimeout(() => {
      setBooted(true);
      inputRef.current?.focus();
    }, 250 + startupLines.length * 360 + 250);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries, activePreview, editorPath]);

  const append = useCallback(
    (command: string, output: string, directoryPath = cwd) => {
      setEntries((previous) => [
        ...previous,
        {
          id: nextId.current++,
          cwd: directoryPath,
          command,
          output,
        },
      ]);
    },
    [cwd],
  );

  const execute = useCallback(
    (rawCommand: string) => {
      const commandLine = rawCommand.trim();
      if (!commandLine) return;

      setHistory((previous) => [...previous, commandLine]);
      setHistoryIndex(-1);
      setInput("");
      setMessage("");

      const args = commandLine.match(/(?:[^\s"]+|"[^"]*")+/g) ?? [];
      const command = args[0]?.toLowerCase() ?? "";
      const params = args.slice(1).map((arg) =>
        arg.startsWith('"') && arg.endsWith('"')
          ? arg.slice(1, -1)
          : arg
      );

      if (command === "clear" || command === "cls") {
        setEntries([]);
        setActivePreview("");
        return;
      }

      const run = (output: string) => append(commandLine, output);

      switch (command) {
        case "help":
        case "man":
          run(command === "man"
            ? "Manual pages available: bash, cd, ls, cat, nano, grep, find.\nType 'help' for command usage."
            : HELP);
          break;

        case "pwd":
          run(cwd);
          break;

        case "whoami":
          run("neil");
          break;

        case "hostname":
          run("portfolio");
          break;

        case "uname":
          run("Linux portfolio 6.8.0-generic x86_64 GNU/Linux\nNote: simulated browser environment.");
          break;

        case "neofetch":
          run(
            [
              "       _   __ _____",
              "      / | / // ____/",
              "     /  |/ // __/   ",
              "    / /|  // /___   ",
              "   /_/ |_//_____/   ",
              "",
              "neil@portfolio",
              "------------------------------",
              "OS:         Neil Linux x86_64",
              "Host:       Portfolio Shell",
              "Role:       Developer / IT Professional",
              "Focus:      Web Apps, APIs, Databases",
              "            Linux & System Administration",
              "Stack:      Python, PHP, TypeScript, SQL",
              "Frontend:   React, Next.js, Vue, Nuxt",
              "Location:   Philippines",
              "Shell:      portfolio-bash (simulated)",
              "Filesystem: /home/neil",
              "",
              "A portfolio built like a system.",
            ].join("\n"),
          );
          break;

        case "recruiter":
        case "./recruiter.sh": {
          run(
            [
              "NEIL BERTIZ — RECRUITER BRIEF",
              "════════════════════════════════════════════",
              "PROFILE",
              "Developer and IT professional working across web applications,",
              "REST APIs, database administration, and Linux/system administration.",
              "",
              "EXPERIENCE",
              "• Spondise LLC — Full-Stack Web Developer",
              "  Dec 2024 – Jan 2025 | Nuxt.js, Bootstrap, Laravel, CRUD APIs",
              "• Database & System Administration",
              "  Database operations, production troubleshooting, Linux servers,",
              "  monitoring, deployment, and web development.",
              "",
              "TECHNICAL SKILLS",
              "• Frontend: JavaScript, TypeScript, React/Next.js, Vue/Nuxt, CSS",
              "• Backend: Python, PHP/Laravel, REST APIs, CRUD",
              "• Data & Infrastructure: MySQL/MariaDB, SQL optimization, Linux",
              "  administration, deployment, monitoring, and reporting",
              "",
              "FEATURED PROJECTS",
              "• GEO//NEXUS — immersive geospatial/surveying website",
              "• BRMS — banking management frontend and REST integration",
              "• Invoice System Generator — invoicing/expense management",
              "• Vet Care System — veterinary management application",
              "",
              "NEXT STEPS",
              "• Type 'projects' to explore project showcases.",
              "• Type 'contact' for contact details.",
              "• Type 'resume' to open public/resume.pdf when configured.",
              "",
              "Note: Update contact details, education, project stacks, and URLs",
              "before publishing this portfolio.",
            ].join("\n"),
          );
          break;
        }

        case "date":
          run(new Date().toString());
          break;

        case "projects": {
          run(
            [
              "FEATURED PROJECTS",
              "────────────────────────────────────────────",
              "geonexus          Geospatial & surveying website",
              "brms              Banking management frontend",
              "invoice-system    Invoice and expense management",
              "vet-care-system   Veterinary management application",
              "",
              "Use: open <project-name>",
              "Example: open geonexus",
            ].join("\n"),
          );
          break;
        }

        case "open": {
          const target = (params[0] ?? "").toLowerCase();
          const projectSlugs = [
            "geonexus",
            "brms",
            "invoice-system",
            "vet-care-system",
          ];

          if (!target) {
            run("Usage: open <project-name|github|live>");
            break;
          }

          if (projectSlugs.includes(target)) {
            const projectPath = `${HOME}/projects/${target}`;
            const projectNode = getNode(projectPath);
            if (!projectNode || projectNode.type !== "directory") {
              run(`open: project '${target}' was not found`);
            } else {
              append(commandLine, `Opening ${target} project showcase…`);
              setActivePreview(`${projectPath}/preview.app`);
            }
            break;
          }

          if (target === "github" || target === "live") {
            const currentProject = cwd.startsWith(`${HOME}/projects/`)
              ? cwd.slice(`${HOME}/projects/`.length).split("/")[0]
              : "";
            const details = PROJECT_DETAILS[currentProject];
            const url = target === "github" ? details?.githubUrl : details?.liveUrl;

            if (!currentProject || !details) {
              run(`open ${target}: first navigate into a project, e.g. 'cd projects/geonexus'`);
            } else if (!url) {
              run(`open ${target}: no ${target === "github" ? "GitHub repository" : "live demo"} URL configured for ${currentProject}. Add it to PROJECT_DETAILS in TerminalPortfolio.tsx.`);
            } else {
              append(commandLine, `Opening ${target} for ${currentProject}…`);
              window.open(url, "_blank", "noopener,noreferrer");
            }
            break;
          }

          run(`open: unknown target '${target}'. Try 'projects' to list available projects.`);
          break;
        }

        case "echo":
          run(params.join(" "));
          break;

        case "ls":
        case "ll":
        case "dir": {
          const flags = params.filter((arg) => arg.startsWith("-"));
          const targets = params.filter((arg) => !arg.startsWith("-"));
          const detailed = command === "ll" || flags.some((flag) => flag.includes("l"));
          const showHidden = flags.some((flag) => flag.includes("a"));
          const target = targets[0] ? normalizePath(cwd, targets[0]) : cwd;
          run(listDirectory(target, detailed, showHidden));
          break;
        }

        case "cd": {
          const target = params[0] ?? HOME;
          const nextPath = target === "~"
            ? HOME
            : normalizePath(cwd, target);
          const node = getNode(nextPath);

          if (!node) {
            run(`bash: cd: ${target}: No such file or directory`);
          } else if (node.type !== "directory") {
            run(`bash: cd: ${target}: Not a directory`);
          } else {
            append(commandLine, "", cwd);
            setCwd(nextPath);
            setActivePreview("");
          }
          break;
        }

        case "cat": {
          if (!params[0]) {
            run("cat: missing file operand");
            break;
          }

          const target = normalizePath(cwd, params[0]);
          const node = getNode(target);

          if (
            node?.type === "file" &&
            node.content === "Interactive project preview"
          ) {
            append(commandLine, "Launching project preview…");
            setActivePreview(target);
          } else {
            run(readFile(target));
          }
          break;
        }

        case "tree": {
          const target = params[0]
            ? normalizePath(cwd, params[0])
            : cwd;
          run(tree(target));
          break;
        }

        case "history":
          run(
            [...history, commandLine]
              .map((entry, index) => `${String(index + 1).padStart(4)}  ${entry}`)
              .join("\n")
          );
          break;

        case "nano": {
          if (!params[0]) {
            run("nano: missing filename");
            break;
          }

          const target = normalizePath(cwd, params[0]);
          const node = getNode(target);

          if (node?.type === "directory") {
            run(`nano: ${params[0]}: Is a directory`);
          } else if (!node) {
            run(`nano: ${params[0]}: No such file or directory. Create files through the editor only when enabled.`);
          } else {
            setEditorPath(target);
            setEditorValue(node.content);
            append(commandLine, `Opening ${params[0]} in the simulated nano editor…`);
          }
          break;
        }

        case "grep": {
          if (params.length < 2) {
            run("Usage: grep <text> <file>");
            break;
          }

          const target = normalizePath(cwd, params[1]);
          const node = getNode(target);

          if (!node || node.type !== "file") {
            run(`grep: ${params[1]}: No such file or directory`);
          } else {
            const matches = node.content
              .split("\n")
              .filter((line) => line.toLowerCase().includes(params[0].toLowerCase()));
            run(matches.join("\n") || "(no matches)");
          }
          break;
        }

        case "find": {
          const needleIndex = params.indexOf("-name");
          if (needleIndex < 0 || !params[needleIndex + 1]) {
            run("Usage: find . -name <filename>");
            break;
          }

          const needle = params[needleIndex + 1].replaceAll("*", "");
          const found: string[] = [];

          const walk = (node: FsNode, path: string) => {
            if (node.type !== "directory") return;

            for (const [name, child] of Object.entries(node.children)) {
              const childPath = `${path}/${name}`;
              if (name.includes(needle)) found.push(childPath);
              if (child.type === "directory") walk(child, childPath);
            }
          };

          walk(filesystem, "");
          run(found.join("\n") || "find: no matching files");
          break;
        }

        case "file": {
          const target = normalizePath(cwd, params[0] ?? "");
          const node = getNode(target);
          run(!node
            ? `file: cannot open '${params[0] ?? ""}': No such file`
            : node.type === "directory"
              ? `${params[0]}: directory`
              : `${params[0]}: UTF-8 text`);
          break;
        }

        case "stat": {
          const target = normalizePath(cwd, params[0] ?? "");
          const node = getNode(target);
          run(!node
            ? `stat: cannot stat '${params[0] ?? ""}': No such file`
            : `  File: ${target}\n  Type: ${node.type}\n  Owner: neil\n  Permissions: ${node.type === "directory" ? "0755" : "0644"}`);
          break;
        }

        case "contact":
          run(readFile(`${HOME}/contact.txt`));
          break;

        case "resume": {
          append(commandLine, "Opening resume…");
          window.open("/resume.pdf", "_blank", "noopener,noreferrer");
          break;
        }

        case "exit":
          run("logout\nSession remains available. Continue exploring with 'help'.");
          break;

        case "sudo":
          run("neil is not in the sudoers file. This incident will be reported. (Just kidding.)");
          break;

        case "rm":
        case "mkdir":
        case "touch":
        case "mv":
        case "cp":
        case "chmod":
        case "chown":
        case "kill":
        case "shutdown":
          run(`${command}: operation not enabled in this read-only portfolio shell.`);
          break;

        default:
          run(`bash: ${command}: command not found\nType 'help' to see available commands.`);
      }
    },
    [append, cwd, history],
  );

  const saveEditor = () => {
    const parts = editorPath.split("/").filter(Boolean);
    let node: FsNode = filesystem;

    for (const part of parts.slice(0, -1)) {
      if (node.type !== "directory" || !node.children[part]) return;
      node = node.children[part];
    }

    if (node.type === "directory") {
      node.children[parts[parts.length - 1]] = file(editorValue);
      setMessage(`[ Saved ${editorPath} ]`);
      setEditorPath("");
    }
  };

  const autocomplete = () => {
    const raw = input;
    const tokens = raw.split(/\s+/);
    const partial = tokens[tokens.length - 1] ?? "";

    if (tokens.length === 1) {
      const matches = COMMANDS.filter((item) => item.startsWith(partial));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) setMessage(matches.join("    "));
      return;
    }

    const targetDir = partial.includes("/")
      ? normalizePath(cwd, partial.slice(0, partial.lastIndexOf("/")) || ".")
      : cwd;
    const prefix = partial.includes("/")
      ? partial.slice(partial.lastIndexOf("/") + 1)
      : partial;
    const node = getNode(targetDir);

    if (!node || node.type !== "directory") return;

    const matches = Object.entries(node.children)
      .map(([name, child]) => name + (child.type === "directory" ? "/" : ""))
      .filter((name) => name.startsWith(prefix));

    if (matches.length === 1) {
      tokens[tokens.length - 1] =
        partial.includes("/")
          ? partial.slice(0, partial.lastIndexOf("/") + 1) + matches[0]
          : matches[0];
      setInput(tokens.join(" ") + (matches[0].endsWith("/") ? "" : " "));
    } else if (matches.length > 1) {
      setMessage(matches.join("    "));
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      execute(input);
    } else if (event.key === "Tab") {
      event.preventDefault();
      autocomplete();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = historyIndex < 0
        ? history.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = Math.min(history.length, historyIndex + 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setEntries([]);
      setActivePreview("");
    }
  };


  return {
    cwd, input, setInput, entries, history, historyIndex, activePreview,
    setActivePreview, editorPath, setEditorPath, editorValue, setEditorValue,
    message, booted, bootLines, inputRef, outputRef, execute, saveEditor,
    handleKeyDown,
  };
}

export type TerminalShellState = ReturnType<typeof useTerminalShell>;
