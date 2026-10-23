  export type SkillCategory =
  | "all"
  | "frontend"
  | "backend"
  | "database"
  | "devops";

export type Skill = {
  name: string;
  category: Exclude<SkillCategory, "all">;
  description: string;
  technologies: string[];
};

export const SKILL_CATEGORIES: {
  id: SkillCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "all",
    label: "ALL SYSTEMS",
    description: "Explore the full technology stack.",
  },
  {
    id: "frontend",
    label: "FRONTEND",
    description: "Interfaces, user experience, and web applications.",
  },
  {
    id: "backend",
    label: "BACKEND",
    description: "Application logic, APIs, and integrations.",
  },
  {
    id: "database",
    label: "DATABASE",
    description: "Data management, SQL, and database operations.",
  },
  {
    id: "devops",
    label: "DEVOPS & SYSTEMS",
    description: "Linux, deployment, and production troubleshooting.",
  },
];

export const SKILLS: Skill[] = [
  {
    name: "React",
    category: "frontend",
    description:
      "Building component-based interfaces and interactive web experiences.",
    technologies: ["JavaScript", "TypeScript", "Next.js"],
  },
  {
    name: "Next.js",
    category: "frontend",
    description:
      "Developing React applications with structured routing and reusable components.",
    technologies: ["React", "TypeScript", "CSS"],
  },
  {
    name: "Vue / Nuxt",
    category: "frontend",
    description:
      "Building web interfaces with Vue and Nuxt, including API-connected pages.",
    technologies: ["Vue", "Nuxt", "Bootstrap"],
  },
  {
    name: "Responsive UI",
    category: "frontend",
    description:
      "Creating layouts that adapt to different screen sizes and devices.",
    technologies: ["HTML", "CSS", "Bootstrap"],
  },
  {
    name: "Python",
    category: "backend",
    description:
      "Writing application logic, backend services, and automation scripts.",
    technologies: ["Python", "FastAPI", "SQLAlchemy"],
  },
  {
    name: "PHP / Laravel",
    category: "backend",
    description:
      "Developing backend functionality and REST API endpoints.",
    technologies: ["PHP", "Laravel", "REST APIs"],
  },
  {
    name: "REST APIs",
    category: "backend",
    description:
      "Working with CRUD operations, API integration, and request/response flows.",
    technologies: ["HTTP", "JSON", "CRUD"],
  },
  {
    name: "MySQL / MariaDB",
    category: "database",
    description:
      "Working with relational databases, SQL queries, and database administration.",
    technologies: ["SQL", "MariaDB", "MySQL"],
  },
  {
    name: "Data Integrity",
    category: "database",
    description:
      "Investigating data issues and supporting reliable database operations.",
    technologies: ["Validation", "SQL", "Troubleshooting"],
  },
  {
    name: "Linux Administration",
    category: "devops",
    description:
      "Managing Linux environments and investigating system-level issues.",
    technologies: ["Linux", "Shell", "Logs"],
  },
  {
    name: "Deployment & Monitoring",
    category: "devops",
    description:
      "Supporting deployments, production troubleshooting, and system monitoring.",
    technologies: ["Servers", "Monitoring", "Diagnostics"],
  },
];

export function normalizeSkillCategory(
  value?: string,
): SkillCategory {
  const normalized = value?.toLowerCase();

  if (
    normalized === "frontend" ||
    normalized === "backend" ||
    normalized === "database" ||
    normalized === "devops"
  ) {
    return normalized;
  }

  return "all";
}
