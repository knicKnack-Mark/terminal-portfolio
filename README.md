# Terminal Portfolio — Modular Refactor + Recruiter Mode

This bundle refactors the existing terminal portfolio into smaller files while preserving the existing CSS class names and shell features.

## Files

- `src/components/TerminalPortfolio.tsx` — small entry component
- `src/components/terminal/TerminalView.tsx` — terminal UI
- `src/components/terminal/useTerminalShell.ts` — state, keyboard controls, and command execution
- `src/components/terminal/filesystem.ts` — virtual filesystem and filesystem helpers
- `src/components/terminal/types.ts` — shared TypeScript types
- `src/components/terminal/config.ts` — help text, command suggestions, and project metadata
- `src/components/terminal/ProjectDemo.tsx` — project showcase panel

## Install

1. Back up your existing `src/components/TerminalPortfolio.tsx`.
2. Extract this ZIP into the root of your Next.js project (the folder containing `package.json`).
3. Allow it to overwrite `src/components/TerminalPortfolio.tsx`.
4. Keep your existing `globals.css`; the existing CSS classes are retained.
5. The running Next.js dev server should recompile automatically. If it does not, stop it with Ctrl+C and run `npm run dev`.

## Recruiter mode

Run either command in the terminal:

```bash
recruiter
./recruiter.sh
```

The report summarizes profile, experience, skills, projects, and suggested next commands. It uses the existing known profile details and reminds you to replace placeholder contact/education/project metadata before publishing.

## Existing features retained

- Boot sequence and welcome screen
- `pwd`, `ls`, `ls -l`, `ls -a`, `ls -la`, `ll`, `cd`, `tree`, `find`
- `cat`, simulated `nano`, `grep`, `file`, `stat`
- `whoami`, `hostname`, `uname`, `neofetch`, `date`, `echo`
- `history`, `help`, `man`, `clear`, `cls`, `exit`, `sudo`
- Project listing and project launcher (`projects`, `open <project>`, `open github`, `open live`)
- Project showcase cards and configured-link buttons
- Contact and resume commands
- Up/down command history, Tab autocomplete, Ctrl+L
- Read-only guard for mutating/system commands

This is a browser-based simulated shell, not a real Linux shell. Project URLs remain blank until you add real URLs in `config.ts`.
