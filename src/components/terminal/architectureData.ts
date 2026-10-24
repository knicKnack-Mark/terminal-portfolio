
export type ArchitectureProjectSlug =
  | "geonexus"
  | "brms"
  | "invoice-system"
  | "vet-care-system";

export type ArchitectureLayer =
  | "frontend"
  | "api"
  | "backend"
  | "database"
  | "infrastructure";

export type ArchitectureNode = {
  id: string;
  label: string;
  technology: string;
  layer: ArchitectureLayer;
  description: string;
  responsibilities: string[];
  verified: boolean;
};

export type ArchitectureConnection = {
  from: string;
  to: string;
  label: string;
};

export type ArchitectureProject = {
  slug: ArchitectureProjectSlug;
  name: string;
  subtitle: string;
  description: string;
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
};

export const ARCHITECTURE_PROJECTS: Record<
  ArchitectureProjectSlug,
  ArchitectureProject
> = {
  geonexus: {
    slug: "geonexus",
    name: "GEO//NEXUS",
    subtitle: "GEOSPATIAL EXPERIENCE",
    description:
      "An immersive geodetic engineering experience built around interactive visuals, terrain rendering, and geospatial exploration.",
    nodes: [
      {
        id: "interface",
        label: "Web Interface",
        technology: "Next.js · React · TypeScript",
        layer: "frontend",
        description:
          "The application interface, page composition, navigation, and reusable UI components.",
        responsibilities: [
          "Render the landing page and application routes",
          "Manage interactive UI state",
          "Organize reusable React components",
        ],
        verified: true,
      },
      {
        id: "visualization",
        label: "Terrain Visualization",
        technology: "Three.js · WebGL",
        layer: "frontend",
        description:
          "The visual rendering layer for the animated topographic terrain experience.",
        responsibilities: [
          "Render terrain in a WebGL scene",
          "Manage the camera and renderer",
          "Support immersive geospatial presentation",
        ],
        verified: true,
      },
      {
        id: "explore",
        label: "Explore Experience",
        technology: "Interactive map interface",
        layer: "frontend",
        description:
          "The project’s geospatial exploration interface. Exact data providers and map-service integrations should be confirmed against the implementation.",
        responsibilities: [
          "Present the exploration experience",
          "Connect user interactions to the map interface",
          "Keep map-service details configurable",
        ],
        verified: false,
      },
    ],
    connections: [
      {
        from: "interface",
        to: "visualization",
        label: "renders",
      },
      {
        from: "interface",
        to: "explore",
        label: "navigates to",
      },
    ],
  },

  brms: {
    slug: "brms",
    name: "BRMS",
    subtitle: "BANKING MANAGEMENT SYSTEM",
    description:
      "A web application with a Nuxt frontend, Laravel backend, API integration, and authentication-related workflows.",
    nodes: [
      {
        id: "frontend",
        label: "Frontend",
        technology: "Nuxt 3 · Vue · Bootstrap",
        layer: "frontend",
        description:
          "The user-facing banking management interface.",
        responsibilities: [
          "Render responsive application screens",
          "Manage client-side navigation and UI state",
          "Communicate with backend endpoints",
        ],
        verified: true,
      },
      {
        id: "api",
        label: "API Layer",
        technology: "REST · Laravel routes",
        layer: "api",
        description:
          "The HTTP boundary between the frontend and backend application logic.",
        responsibilities: [
          "Receive frontend requests",
          "Return structured responses",
          "Connect UI workflows to backend operations",
        ],
        verified: true,
      },
      {
        id: "services",
        label: "Backend Logic",
        technology: "Laravel · PHP",
        layer: "backend",
        description:
          "Backend application logic and authentication-related workflows.",
        responsibilities: [
          "Process application requests",
          "Apply server-side validation and rules",
          "Support authentication and access-control workflows",
        ],
        verified: true,
      },
      {
        id: "data",
        label: "Data Layer",
        technology: "Database integration",
        layer: "database",
        description:
          "The persistence layer used by backend operations. The exact database engine and schema are not asserted here.",
        responsibilities: [
          "Support application data access",
          "Persist and retrieve records through backend logic",
          "Apply database rules defined by the application",
        ],
        verified: false,
      },
    ],
    connections: [
      { from: "frontend", to: "api", label: "HTTP request" },
      { from: "api", to: "services", label: "routes to" },
      { from: "services", to: "data", label: "data access" },
    ],
  },

  "invoice-system": {
    slug: "invoice-system",
    name: "INVOICE SYSTEM",
    subtitle: "INVOICE & EXPENSE MANAGEMENT",
    description:
      "An invoice and expense management application using a Next.js frontend and a Python backend with asynchronous service and repository patterns.",
    nodes: [
      {
        id: "frontend",
        label: "Frontend",
        technology: "Next.js · React · TypeScript",
        layer: "frontend",
        description:
          "The application interface for invoice and expense workflows.",
        responsibilities: [
          "Present application forms and views",
          "Manage client-side interaction",
          "Send requests to backend endpoints",
        ],
        verified: true,
      },
      {
        id: "api",
        label: "API Layer",
        technology: "Python API",
        layer: "api",
        description:
          "The backend request layer. The project uses a Python backend; verify the exact route structure against the current code before presenting detailed endpoints.",
        responsibilities: [
          "Receive application requests",
          "Validate incoming data",
          "Return application responses",
        ],
        verified: true,
      },
      {
        id: "services",
        label: "Service & Repository Layer",
        technology: "Python · Async SQLAlchemy",
        layer: "backend",
        description:
          "A backend structure that separates application operations from database access.",
        responsibilities: [
          "Coordinate invoice and expense operations",
          "Validate organization and category relationships",
          "Separate business logic from persistence operations",
        ],
        verified: true,
      },
      {
        id: "database",
        label: "Persistence",
        technology: "SQLAlchemy ORM",
        layer: "database",
        description:
          "Database access through SQLAlchemy. The specific database engine is not asserted here.",
        responsibilities: [
          "Map application entities",
          "Support asynchronous database operations",
          "Persist application records",
        ],
        verified: true,
      },
    ],
    connections: [
      { from: "frontend", to: "api", label: "API request" },
      { from: "api", to: "services", label: "dispatches" },
      { from: "services", to: "database", label: "repository access" },
    ],
  },

  "vet-care-system": {
    slug: "vet-care-system",
    name: "VET CARE SYSTEM",
    subtitle: "APPLICATION ARCHITECTURE",
    description:
      "A project entry reserved for the verified application architecture. Add its actual stack and layers when its implementation details are confirmed.",
    nodes: [
      {
        id: "application",
        label: "Application",
        technology: "Stack not verified",
        layer: "frontend",
        description:
          "The application entry point. Its framework and UI structure have not yet been confirmed.",
        responsibilities: [
          "Represent the project in the portfolio",
          "Document verified application responsibilities",
        ],
        verified: false,
      },
      {
        id: "services",
        label: "Services",
        technology: "Not yet documented",
        layer: "backend",
        description:
          "Backend services are intentionally left unspecified until the implementation is verified.",
        responsibilities: [
          "Document actual business logic",
          "Record confirmed API integrations",
        ],
        verified: false,
      },
      {
        id: "data",
        label: "Data Layer",
        technology: "Not yet documented",
        layer: "database",
        description:
          "Database technology and persistence design have not yet been confirmed.",
        responsibilities: [
          "Document the actual persistence layer",
          "Record verified data relationships",
        ],
        verified: false,
      },
    ],
    connections: [
      { from: "application", to: "services", label: "integration to verify" },
      { from: "services", to: "data", label: "data flow to verify" },
    ],
  },
};

export function isArchitectureProjectSlug(
  value: string | undefined,
): value is ArchitectureProjectSlug {
  return (
    value !== undefined &&
    Object.prototype.hasOwnProperty.call(ARCHITECTURE_PROJECTS, value)
  );
}

export function normalizeArchitectureLayer(
  value: string | undefined,
): ArchitectureLayer | "all" {
  const normalized = value?.toLowerCase();

  if (
    normalized === "frontend" ||
    normalized === "api" ||
    normalized === "backend" ||
    normalized === "database" ||
    normalized === "infrastructure"
  ) {
    return normalized;
  }

  return "all";
}
