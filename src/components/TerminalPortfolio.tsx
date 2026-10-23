
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

type FsFile = {
  type: "file";
  content: string;
};

type FsDirectory = {
  type: "directory";
  children: Record<string, FsNode>;
};

type FsNode = FsFile | FsDirectory;

type HistoryEntry = {
  id: number;
  cwd: string;
  command: string;
  output: string;
};

const directory = (children: Record<string, FsNode>): FsDirectory => ({
  type: "directory",
  children,
});

const file = (content: string): FsFile => ({ type: "file", content });

const filesystem: FsDirectory = directory({
  home: directory({
    neil: directory({
      "README.md": file(`# Neil Bertiz

Welcome to my terminal portfolio.

I am a developer and IT professional interested in building
web applications, APIs, database systems, and infrastructure.

Start exploring:
  ls
  cd projects
  cd about
  cat README.md
  help

Type 'help' to discover all available commands.
`),
      about: directory({
        "profile.txt": file(`NAME       Neil Bertiz
ROLE       Full-Stack Developer
           Database Administrator
           System Administrator

FOCUS
  Web applications and REST APIs
  Database administration and optimization
  Linux server administration
  System monitoring and deployment

PHILOSOPHY
  Understand the system.
  Build reliable solutions.
  Keep learning.
`),
        "experience.txt": file(`EXPERIENCE

Spondise LLC
Full-Stack Web Developer
December 2024 - January 2025

Worked with Nuxt.js, Bootstrap, Laravel, responsive interfaces,
and CRUD API development.

Current professional focus:
Database administration, system administration,
production troubleshooting, and web development.
`),
        "education.txt": file(`Education details will be added here.

Use this file to document your degree, school,
certifications, and other qualifications.
`),
      }),
      projects: directory({
        "vet-care-system": directory({
          "README.md": file(`# Vet Care System

A veterinary management application.

Explore:
  cat package.json
  cat features.txt
  cat preview.app

TECHNOLOGY
Update this section with the project's actual stack.

STATUS
Project showcase entry. Replace the demo metadata
with details from the deployed application.
`),
          "package.json": file(`{
  "name": "vet-care-system",
  "description": "Veterinary management application",
  "portfolioPreview": "preview.app"
}
`),
          "features.txt": file(`FEATURES

- Veterinary patient records
- Appointment management
- Owner information
- Treatment and visit history

Replace these sample features with the actual
features implemented in your project.
`),
          "preview.app": file("Interactive project preview"),
        }),
        "invoice-system": directory({
          "README.md": file(`# Invoice System Generator

A personal invoicing and expense management application.

Areas of focus:
- Invoice generation
- Expense and category management
- Organization-aware data
- Python backend and database services

Type 'cat preview.app' to launch the demo preview.
`),
          "package.json": file(`{
  "name": "invoice-system-generator",
  "description": "Invoice and expense management"
}
`),
          "preview.app": file("Interactive project preview"),
        }),
        geonexus: directory({
          "README.md": file(`# GEO//NEXUS

An immersive geodetic engineering and land surveying website.

Design direction:
- Topographic terrain
- Interactive geospatial exploration
- Responsive layouts
- WebGL and Three.js experiments

Type 'cat preview.app' to launch the demo preview.
`),
          "package.json": file(`{
  "name": "geonexus",
  "description": "Geodetic engineering portfolio website"
}
`),
          "preview.app": file("Interactive project preview"),
        }),
        brms: directory({
          "README.md": file(`# BRMS

A banking-related management system frontend.

Technology context:
- Nuxt 3
- Laravel API
- Authentication and access control
- REST API integration

Update this project entry with your final public
description and deployment URL.
`),
          "package.json": file(`{
  "name": "brms-frontend",
  "description": "Banking management system frontend"
}
`),
          "preview.app": file("Interactive project preview"),
        }),
      }),
      skills: directory({
        "frontend.txt": file(`FRONTEND
- JavaScript / TypeScript
- React / Next.js
- Vue / Nuxt
- HTML / CSS / Bootstrap
- Responsive interfaces
`),
        "backend.txt": file(`BACKEND
- Python
- PHP / Laravel
- REST APIs
- CRUD operations
- API integration
`),
        "infrastructure.txt": file(`DATABASE & INFRASTRUCTURE
- MySQL / MariaDB
- SQL and query optimization
- Linux administration
- Production troubleshooting
- Server deployment
- Monitoring and reporting
`),
      }),
      experience: directory({
        "career.log": file(`2024-12 | Spondise LLC
           Full-Stack Web Developer

CURRENT  | Database & System Administration
           Production systems, database operations,
           server troubleshooting, and development.
`),
      }),
      "contact.txt": file(`CONTACT

Email:    Replace with your professional email
GitHub:   Replace with your GitHub profile URL
LinkedIn: Replace with your LinkedIn profile URL

For inquiries, use the contact information above.
`),
      "resume.pdf": file(
        "This is a virtual placeholder. Add your real resume PDF to public/resume.pdf and update the resume command to open it."
      ),
    }),
  }),
});

const HOME = "/home/neil";

function normalizePath(cwd: string, target: string): string {
  const raw = target.startsWith("/")
    ? target
    : `${cwd}/${target}`;

  const parts: string[] = [];

  for (const part of raw.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }

  return `/${parts.join("/")}`;
}

function getNode(path: string): FsNode | undefined {
  let node: FsNode = filesystem;

  for (const part of path.split("/").filter(Boolean)) {
    if (node.type !== "directory") return undefined;
    const nextNode: FsNode | undefined = node.children[part];
    if (!nextNode) return undefined;
    node = nextNode;
  }

  return node;
}

function formatPath(path: string): string {
  if (path === HOME) return "~";
  if (path.startsWith(`${HOME}/`)) {
    return `~${path.slice(HOME.length)}`;
  }
  return path;
}

function listDirectory(
  path: string,
  detailed = false,
  showHidden = false,
): string {
  const node = getNode(path);

  if (!node || node.type !== "directory") {
    return `ls: cannot access '${path}': No such file or directory`;
  }

  const entries: [string, FsNode][] = [
    ...(showHidden
      ? ([ [".", node], ["..", directory({})] ] as [string, FsNode][])
      : []),
    ...Object.entries(node.children).filter(
      ([name]) => showHidden || !name.startsWith("."),
    ),
  ];

  return entries
    .map(([name, child]) => {
      if (!detailed) {
        return child.type === "directory" && name !== "." && name !== ".."
          ? `${name}/`
          : name;
      }

      const permissions =
        child.type === "directory" ? "drwxr-xr-x" : "-rw-r--r--";
      const size = child.type === "file" ? child.content.length : 4096;
      const label = child.type === "directory" ? "directory" : "file";

      return `${permissions}  1 neil neil ${String(size).padStart(5)} ${label.padEnd(9)} ${name}${child.type === "directory" && name !== "." && name !== ".." ? "/" : ""}`;
    })
    .join("\n");
}

function readFile(path: string): string {
  const node = getNode(path);

  if (!node) return `cat: ${path}: No such file or directory`;

  if (node.type === "directory") {
    return `cat: ${path}: Is a directory`;
  }

  return node.content;
}

function tree(path: string, prefix = ""): string {
  const node = getNode(path);

  if (!node || node.type !== "directory") {
    return `tree: '${path}': Not a directory`;
  }

  const lines: string[] = [formatPath(path)];

  const walk = (dir: FsDirectory, currentPrefix: string) => {
    const entries = Object.entries(dir.children);

    entries.forEach(([name, child], index) => {
      const last = index === entries.length - 1;
      const connector = last ? "└── " : "├── ";

      lines.push(`${currentPrefix}${connector}${name}${child.type === "directory" ? "/" : ""}`);

      if (child.type === "directory") {
        walk(child, currentPrefix + (last ? "    " : "│   "));
      }
    });
  };

  walk(node, prefix);
  return lines.join("\n");
}

const HELP = `GNU BASH — PORTFOLIO SHELL

NAVIGATION
  pwd                  Print working directory
  ls                   List directory contents (supports -la, -l, -a)
  ll                   Detailed directory listing
  cd <directory>       Change directory
  cd ..                Move to parent directory
  cd ~                 Return to home
  tree                 Display directory tree
  find . -name <name>  Search for a filename

FILES
  cat <file>           Read a file
  nano <file>          Edit a text file
  grep <text> <file>   Search file contents
  file <file>          Identify a virtual file
  stat <file>          Display virtual file metadata

SHELL
  whoami               Display user
  hostname             Display hostname
  uname -a             System information
  neofetch             Developer profile and system summary
  date                 Current date
  echo <text>          Print text
  history              Show recent commands
  clear                Clear the terminal
  help                 Show this help
  exit                 Display exit message

PORTFOLIO
  projects             List featured projects
  projects --featured  List highlighted work
  open <project>       Open a project showcase card
  open github          Open current project's repository
  open live            Open current project's live demo
  resume               Open resume, if configured
  contact              Display contact information

KEYBOARD
  ↑ / ↓                Navigate command history
  Tab                  Autocomplete commands and paths
  Ctrl + L             Clear terminal
`;

const COMMANDS = [
  "pwd", "ls", "ll", "cd", "cat", "nano", "grep",
  "find", "tree", "file", "stat", "whoami", "hostname",
  "uname", "neofetch", "date", "echo", "history", "clear", "help",
  "exit", "resume", "contact", "open", "projects",
];

type ProjectDetails = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  status: string;
  githubUrl: string;
  liveUrl: string;
};

// Add your real public URLs here when they are ready. Leave empty until then.
const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  geonexus: {
    title: "GEO//NEXUS",
    subtitle: "Geospatial & surveying experience",
    description: "An immersive website concept for geodetic engineering and land surveying, with topographic terrain and interactive geospatial exploration.",
    stack: ["Next.js", "TypeScript", "Three.js"],
    status: "In development",
    githubUrl: "",
    liveUrl: "",
  },
  brms: {
    title: "BRMS",
    subtitle: "Banking management frontend",
    description: "A banking-related management system frontend focused on authentication, access control, and REST API integration.",
    stack: ["Nuxt 3", "Laravel API", "REST"],
    status: "Project showcase",
    githubUrl: "",
    liveUrl: "",
  },
  "invoice-system": {
    title: "Invoice System Generator",
    subtitle: "Invoice & expense management",
    description: "A personal invoicing and expense management application with organization-aware data, category management, and Python backend services.",
    stack: ["Next.js", "Python", "SQLAlchemy"],
    status: "In development",
    githubUrl: "",
    liveUrl: "",
  },
  "vet-care-system": {
    title: "Vet Care System",
    subtitle: "Veterinary management application",
    description: "A veterinary application showcase. Update this summary and technology stack to match the features implemented in your actual project.",
    stack: ["Technology stack to confirm"],
    status: "Details to confirm",
    githubUrl: "",
    liveUrl: "",
  },
};

export default function TerminalPortfolio() {
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
                {bootLines.join("\\n")}
                {bootLines.length < 5 ? "\\n▌" : ""}
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
    </main>
  );
}

function ProjectDemo({ path }: { path: string }) {
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
