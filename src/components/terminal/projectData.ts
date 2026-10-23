
export type ProjectSlug =
  | "geonexus"
  | "brms"
  | "invoice-system"
  | "vet-care-system";

export type ProjectCaseStudyData = {
  slug: ProjectSlug;
  number: string;
  name: string;
  category: string;
  summary: string;
  overview: string;
  role: string;
  stack: string[];
  features: string[];
  status: string;
  githubUrl: string;
  liveUrl: string;
};

export const PROJECT_CASE_STUDIES: Record<
  ProjectSlug,
  ProjectCaseStudyData
> = {
  geonexus: {
    slug: "geonexus",
    number: "01",
    name: "GEO//NEXUS",
    category: "GEOSPATIAL / SURVEYING",
    summary:
      "An immersive digital experience for geodetic engineering and land surveying.",
    overview:
      "A concept landing page exploring how geospatial information, surveying services, and interactive terrain visuals can come together in a modern web experience.",
    role: "Frontend development / UI implementation",
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT", "THREE.JS", "CSS"],
    features: [
      "Interactive topographic terrain background",
      "Dark and light theme support",
      "Responsive service and project sections",
      "Interactive geospatial exploration experience",
    ],
    status: "CONCEPT / IN DEVELOPMENT",
    githubUrl: "",
    liveUrl: "",
  },

  brms: {
    slug: "brms",
    number: "02",
    name: "BRMS",
    category: "BANKING / BUSINESS SYSTEMS",
    summary:
      "A banking management frontend built around business workflows and API integration.",
    overview:
      "A web application project focused on connecting a responsive frontend to backend services, supporting data-driven screens and CRUD workflows.",
    role: "Full-stack development",
    stack: ["NUXT", "VUE", "BOOTSTRAP", "LARAVEL", "REST API"],
    features: [
      "Responsive application interfaces",
      "CRUD-oriented workflows",
      "Backend API integration",
      "Form handling and data presentation",
    ],
    status: "PROJECT SUMMARY",
    githubUrl: "",
    liveUrl: "",
  },

  "invoice-system": {
    slug: "invoice-system",
    number: "03",
    name: "INVOICE SYSTEM",
    category: "FINANCE / PRODUCTIVITY",
    summary:
      "An invoicing and expense-management application.",
    overview:
      "A personal project designed around invoice records, expense tracking, and organized financial workflows, with a web frontend and Python backend.",
    role: "Full-stack development",
    stack: ["NEXT.JS", "REACT", "PYTHON", "SQL", "REST API"],
    features: [
      "Invoice and expense workflows",
      "Category-based expense organization",
      "Backend validation and data access",
      "Structured frontend and backend architecture",
    ],
    status: "IN DEVELOPMENT",
    githubUrl: "",
    liveUrl: "",
  },

  "vet-care-system": {
    slug: "vet-care-system",
    number: "04",
    name: "VET CARE SYSTEM",
    category: "VETERINARY / WEB APPLICATION",
    summary:
      "A veterinary management application concept.",
    overview:
      "A web application project represented in this portfolio as a veterinary management system. Add the exact modules and implementation details once they are ready to publish.",
    role: "WEB APPLICATION DEVELOPMENT",
    stack: ["WEB APPLICATION", "DATABASE", "UI DEVELOPMENT"],
    features: [
      "Application interface for veterinary workflows",
      "Structured information presentation",
      "Extendable project architecture",
    ],
    status: "PROJECT SUMMARY",
    githubUrl: "",
    liveUrl: "",
  },
};

export function isProjectSlug(
  value: string | undefined,
): value is ProjectSlug {
  return (
    value !== undefined &&
    Object.prototype.hasOwnProperty.call(PROJECT_CASE_STUDIES, value)
  );
}
