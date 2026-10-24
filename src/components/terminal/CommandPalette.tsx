"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Command,
  CornerDownLeft,
  FolderGit2,
  Gauge,
  Layers3,
  Search,
  Terminal,
  UserRound,
  X,
} from "lucide-react";

type CommandPaletteProps = {
  onRunCommand: (command: string) => void;
};

type PaletteItem = {
  id: string;
  title: string;
  description: string;
  command: string;
  group: string;
  keywords: string;
  icon: typeof Terminal;
};

const ITEMS: PaletteItem[] = [
  {
    id: "dashboard",
    title: "Recruiter Dashboard",
    description: "Open the portfolio command center",
    command: "recruiter",
    group: "Navigation",
    keywords: "recruiter profile overview home",
    icon: Gauge,
  },
  {
    id: "projects",
    title: "All Projects",
    description: "Browse the project collection",
    command: "projects",
    group: "Navigation",
    keywords: "portfolio work applications",
    icon: FolderGit2,
  },
  {
    id: "skills",
    title: "Skills Matrix",
    description: "Explore technical skills",
    command: "skills",
    group: "Navigation",
    keywords: "technology stack frontend backend database",
    icon: Layers3,
  },
  {
    id: "architecture",
    title: "System Architecture",
    description: "Explore application architecture",
    command: "architecture",
    group: "Navigation",
    keywords: "systems diagram infrastructure flow",
    icon: Layers3,
  },
  {
    id: "contact",
    title: "Contact",
    description: "View contact information",
    command: "contact",
    group: "Navigation",
    keywords: "email connect message",
    icon: UserRound,
  },
  {
    id: "geonexus",
    title: "GEO//NEXUS",
    description: "Open the geospatial project",
    command: "open geonexus",
    group: "Projects",
    keywords: "nextjs react typescript threejs gis surveying",
    icon: FolderGit2,
  },
  {
    id: "brms",
    title: "BRMS",
    description: "Open the banking management project",
    command: "open brms",
    group: "Projects",
    keywords: "nuxt vue laravel banking api",
    icon: FolderGit2,
  },
  {
    id: "invoice-system",
    title: "Invoice System",
    description: "Open the invoice and expense project",
    command: "open invoice-system",
    group: "Projects",
    keywords: "python nextjs finance expenses",
    icon: FolderGit2,
  },
  {
    id: "vet-care-system",
    title: "Vet Care System",
    description: "Open the veterinary management project",
    command: "open vet-care-system",
    group: "Projects",
    keywords: "veterinary clinic animal management",
    icon: FolderGit2,
  },
  {
    id: "architecture-geonexus",
    title: "GEO//NEXUS Architecture",
    description: "Inspect the GEO//NEXUS system layers",
    command: "architecture geonexus",
    group: "Architecture",
    keywords: "geospatial nextjs threejs frontend",
    icon: Layers3,
  },
  {
    id: "architecture-brms",
    title: "BRMS Architecture",
    description: "Inspect the BRMS system layers",
    command: "architecture brms",
    group: "Architecture",
    keywords: "laravel nuxt api banking",
    icon: Layers3,
  },
  {
    id: "terminal",
    title: "Terminal",
    description: "Return to the terminal",
    command: "terminal",
    group: "System",
    keywords: "shell console command line",
    icon: Terminal,
  },
  {
    id: "help",
    title: "Help",
    description: "List available terminal commands",
    command: "help",
    group: "System",
    keywords: "manual commands documentation",
    icon: Terminal,
  },
  {
    id: "neofetch",
    title: "System Information",
    description: "Display terminal system information",
    command: "neofetch",
    group: "System",
    keywords: "about hostname operating system",
    icon: Terminal,
  },
  {
    id: "clear",
    title: "Clear Terminal",
    description: "Clear the terminal output",
    command: "clear",
    group: "System",
    keywords: "reset clean screen",
    icon: Terminal,
  },
];

export default function CommandPalette({
  onRunCommand,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return ITEMS;

    return ITEMS.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.command,
        item.group,
        item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  const runItem = useCallback(
    (item: PaletteItem) => {
      setIsOpen(false);
      setQuery("");
      onRunCommand(item.command);
    },
    [onRunCommand],
  );

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      const isPaletteShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k";

      if (isPaletteShortcut) {
        event.preventDefault();
        setIsOpen(true);
        setQuery("");
        setSelectedIndex(0);
        return;
      }

      if (!isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) =>
          filteredItems.length === 0
            ? 0
            : (current + 1) % filteredItems.length
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) =>
          filteredItems.length === 0
            ? 0
            : (current - 1 + filteredItems.length) %
              filteredItems.length
        );
        return;
      }

      if (event.key === "Enter" && filteredItems.length > 0) {
        event.preventDefault();
        runItem(filteredItems[selectedIndex] ?? filteredItems[0]);
      }
    }

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isOpen, filteredItems, selectedIndex, runItem]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedIndex(0);
  }

  if (!isOpen) return null;

  return (
    <div
      className="command-palette__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <section
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Global command palette"
      >
        <div className="command-palette__search">
          <Search size={19} aria-hidden="true" />

          <input
            ref={inputRef}
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search projects, skills, commands..."
            aria-label="Search commands"
            aria-controls="command-palette-results"
            autoComplete="off"
            spellCheck={false}
          />

          <button
            type="button"
            className="command-palette__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
          >
            <X size={17} />
          </button>
        </div>

        <div className="command-palette__meta">
          <span>COMMAND CENTER</span>
          <span>{filteredItems.length} RESULTS</span>
        </div>

        <div
          id="command-palette-results"
          className="command-palette__results"
        >
          {filteredItems.length === 0 ? (
            <div className="command-palette__empty">
              <Search size={22} />
              <p>No matching commands found.</p>
              <span>Try a project name or a command.</span>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  type="button"
                  key={item.id}
                  className={`command-palette__item ${
                    isSelected ? "is-selected" : ""
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => runItem(item)}
                >
                  <span className="command-palette__item-icon">
                    <Icon size={17} />
                  </span>

                  <span className="command-palette__item-copy">
                    <span className="command-palette__item-title">
                      {item.title}
                    </span>
                    <span className="command-palette__item-description">
                      {item.description}
                    </span>
                  </span>

                  <span className="command-palette__item-group">
                    {item.group}
                  </span>

                  {isSelected && (
                    <CornerDownLeft
                      className="command-palette__enter-icon"
                      size={15}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>

        <footer className="command-palette__footer">
          <span>
            <kbd><ArrowUp size={11} /></kbd>
            <kbd><ArrowDown size={11} /></kbd>
            Navigate
          </span>
          <span>
            <kbd><CornerDownLeft size={11} /></kbd>
            Run command
          </span>
          <span>
            <kbd>ESC</kbd>
            Close
          </span>
          <span className="command-palette__brand">
            <Command size={12} /> GEO//NEXUS
          </span>
        </footer>
      </section>
    </div>
  );
}
