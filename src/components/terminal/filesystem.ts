// Virtual filesystem and path utilities for the portfolio shell.
import type { FsFile, FsDirectory, FsNode } from "./types";

export const directory = (children: Record<string, FsNode>): FsDirectory => ({
  type: "directory",
  children,
});

export const file = (content: string): FsFile => ({ type: "file", content });

export const filesystem: FsDirectory = directory({
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
      "recruiter.sh": file(`#!/bin/bash
# Neil Bertiz — recruiter quick overview
# Run: ./recruiter.sh

echo "Recruiter overview"
echo "Use recruiter or ./recruiter.sh in the portfolio terminal."
`),
      "contact.txt": file(`CONTACT

Email:   markneilbertiz21@gmail.com
GitHub:   https://github.com/knicKnack-Mark
LinkedIn: https://www.linkedin.com/in/mark-neil-bertiz-b90b9230a/

For inquiries, use the contact information above.
`),
      "resume.pdf": file(
        "This is a virtual placeholder. Add your real resume PDF to public/resume.pdf and update the resume command to open it."
      ),
    }),
  }),
});

export const HOME = "/home/neil";

export function normalizePath(cwd: string, target: string): string {
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

export function getNode(path: string): FsNode | undefined {
  let node: FsNode = filesystem;

  for (const part of path.split("/").filter(Boolean)) {
    if (node.type !== "directory") return undefined;
    const nextNode: FsNode | undefined = node.children[part];
    if (!nextNode) return undefined;
    node = nextNode;
  }

  return node;
}

export function formatPath(path: string): string {
  if (path === HOME) return "~";
  if (path.startsWith(`${HOME}/`)) {
    return `~${path.slice(HOME.length)}`;
  }
  return path;
}

export function listDirectory(
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

export function readFile(path: string): string {
  const node = getNode(path);

  if (!node) return `cat: ${path}: No such file or directory`;

  if (node.type === "directory") {
    return `cat: ${path}: Is a directory`;
  }

  return node.content;
}

export function tree(path: string, prefix = ""): string {
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

