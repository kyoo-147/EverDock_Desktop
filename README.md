# EverDock Desktop App

> **EverDock** is a remote AI work server control plane and desktop workspace workstation built with **Tauri v2**, **React**, **TypeScript**, and **Tailwind CSS v4**.

It is designed to connect to your local machines, VPS, or remote server docks and orchestrate AI coding agents (such as Codex, Claude Code, OpenCode, Agy) to complete development tasks 24/7.

---

## 📺 Implemented Screens (7 Screens)

The desktop workspace implements **all 7 core operational screens** from the product requirements:
1. **Terminal Workspace (Default Work Mode)**: Features a 2x2 multi-pane terminal grid (API Server, Worker process, Postgres db client, live App Logs) and an interactive **Agent Chat / Approval panel** on the right side.
2. **Sessions Management**: A 3-column live session inspector displaying active developer session lists, activity timeline events, linked tasks, and active console outputs.
3. **Task Orchestration (Kanban Board)**: A fully populated Kanban board (*In Progress*, *Queued*, *Review*, *Done*) linked to task details including checklist step completion states, agent commentaries, and file line changes (+/-).
4. **Agent Fleet**: A comprehensive overview of AI agent profiles, credentials configuration, execution permissions, tool access controls, and connection servers.
5. **Workspaces overview**: Overview of repo paths, connected deployment environments, active sessions, and an **Environment Preview** console running Astro dev servers.
6. **Screen Fleet**: Live preview grid of 8 remote server terminals, with options to follow, full-screen, or inspect terminal sessions.
7. **Mission Control**: Executive telemetry dashboard highlighting active workflows, pending high-risk approvals, active task queues, and real-time CPU/RAM/Network utilization.

---

## 🛠️ Tech Stack & Architecture

- **Desktop Shell**: [Tauri v2](https://tauri.app/) (Rust core + webview)
- **Frontend Layer**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **CSS Utility**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icon Suite**: [Phosphor Icons](https://phosphoricons.com/)
- **Fonts**: **Inter** (Interface) + **JetBrains Mono** (Console Code)
- **Local Storage**: [SQLite](https://sqlite.org/) (planned for native implementation)

---

## 🚀 Running the App locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. To run the Tauri desktop app, you also need [Rust and Tauri CLI prerequisites installed](https://tauri.app/start/prerequisites/).

### 1. Install dependencies
```bash
npm install
```

### 2. Run React Web Dev Server
To preview the web interface inside your browser:
```bash
npm run dev
```
Open [http://localhost:1420](http://localhost:1420) in your browser.

### 3. Run Tauri Desktop App
To launch the native desktop application window:
```bash
npm run tauri dev
```

### 4. Build Production Bundle
To compile the static client and package the installer:
```bash
npm run build
```
This runs TypeScript checking (`tsc`) and compiles the assets into the `dist/` directory.

---

## 🔒 Security & Approval Gate
Everdock integrates a strict safety approval model classifying actions into:
- 🟢 **Low Risk**: File reading, code analysis (Auto-Approved)
- 🟡 **Medium Risk**: File edits, local installations (Configurable policies)
- 🟠 **High Risk**: Git pushes, preview deployments, database migrations (Requires user permission)
- 🔴 **Critical Risk**: Production releases, system-level configurations (Always requires authorization)
