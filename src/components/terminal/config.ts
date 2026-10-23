// Shell help, autocomplete command names, and project showcase metadata.
export const HELP = `GNU BASH — PORTFOLIO SHELL

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
  recruiter            Recruiter-ready profile summary
  ./recruiter.sh       Run recruiter summary script
  date                 Current date
  echo <text>          Print text
  history              Show recent commands
  clear                Clear the terminal
  help                 Show this help
  exit                 Display exit message

PORTFOLIO
  projects             List featured projects
  projects --featured  List highlighted work
  open <project>       Open a detailed project case study
  open github          Open current project's repository
  open live            Open current project's live demo
  resume               Open resume, if configured
  contact              Display contact information

KEYBOARD
  ↑ / ↓                Navigate command history
  Tab                  Autocomplete commands and paths
  Ctrl + L             Clear terminal
`;

export const COMMANDS = [
  "pwd", "ls", "ll", "cd", "cat", "nano", "grep",
  "find", "tree", "file", "stat", "whoami", "hostname",
  "uname", "neofetch", "date", "echo", "history", "clear", "help",
  "exit", "resume", "contact", "dashboard", "terminal", "open",
  "projects", "recruiter",
];

export type ProjectDetails = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  status: string;
  githubUrl: string;
  liveUrl: string;
};

// Add your real public URLs here when they are ready. Leave empty until then.
export const PROJECT_DETAILS: Record<string, ProjectDetails> = {
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
