# Domain Types Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align frontend TypeScript domain types with the finalized Everdock ontology before implementing runtime behavior.

**Architecture:** Keep UI-compatible mock data working while introducing stable domain types that match the docs. Add shared domain modules under `src/types/` first, then adapt existing page-specific types without forcing a full UI rewrite.

**Tech Stack:** React 19, TypeScript, Vite, Tauri v2, existing `src/types/*` files, `npm run build` for verification.

---

## File Structure

Modify:

- `D:\working\EverDock\src\types\workspace.ts`: replace flat Space/Workspace shape with Space, Repository, Environment, ExecutionTarget, Runner, WorkspaceBinding, WorkspaceSummary, and WorkspaceDetail types.
- `D:\working\EverDock\src\types\session.ts`: expand Session statuses and add Pane, PaneBinding, Terminal, Process, SessionSummary types.
- `D:\working\EverDock\src\types\terminal.ts`: align terminal/pane statuses with Session model while keeping `MCConsolePane` compatibility for current mock UI.
- `D:\working\EverDock\src\types\agent.ts`: split Agent into AgentProvider, AgentRuntime, AgentInstallation, AgentProfile, AgentInstance, AgentSession, while keeping lightweight view types for the current table/sidebar.
- `D:\working\EverDock\src\types\task.ts`: add TaskRun, TaskRunAgentAssignment, CompletionPolicy, FileChange, and keep TaskCard/TaskDetail view types.
- `D:\working\EverDock\src\types\approval.ts`: add ActionIntent, Policy, Secret, SecretLease, and expand ApprovalRequest.

Verification:

- `npm run build`

No runtime behavior changes in this plan.

---

### Task 1: Align Workspace And Execution Target Types

**Files:**
- Modify: `D:\working\EverDock\src\types\workspace.ts`

- [ ] **Step 1: Replace `workspace.ts` with ontology-compatible types**

Use this complete file content:

```ts
export type EntityStatus =
  | "active"
  | "idle"
  | "error"
  | "done"
  | "offline"
  | "online"
  | "syncing"
  | "degraded"
  | "unknown";

export interface Space {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  branch?: string;
  status: EntityStatus;
  color: string;
  activeCount?: number;
}

export interface Repository {
  id: string;
  teamId: string;
  spaceId: string;
  provider: "github" | "gitlab" | "bitbucket" | "local" | "git_url";
  name: string;
  fullName: string;
  url: string;
  defaultBranch: string;
  lastSyncAt?: string;
}

export interface Environment {
  id: string;
  teamId: string;
  workspaceId: string;
  name: "local" | "dev" | "staging" | "production" | "custom";
  status: string;
  approvalPolicyId?: string;
}

export interface ExecutionTarget {
  id: string;
  teamId: string;
  name: string;
  targetType: "local_machine" | "ssh_host" | "runner_host" | "managed_server";
  connectionType: "local" | "ssh" | "runner" | "cloud_relay";
  hostname?: string;
  ipAddress?: string;
  region?: string;
  os?: string;
  architecture?: string;
  status: "online" | "offline" | "degraded" | "unknown";
  lastSeenAt?: string;
}

export interface Runner {
  id: string;
  teamId: string;
  executionTargetId: string;
  status:
    | "unpaired"
    | "pairing"
    | "online"
    | "degraded"
    | "updating"
    | "restarting"
    | "recovering"
    | "offline"
    | "revoked";
  version?: string;
  lastHeartbeatAt?: string;
  capabilities?: string[];
}

export interface WorkspaceBinding {
  id: string;
  teamId: string;
  workspaceId: string;
  executionTargetId: string;
  runnerId?: string;
  environmentId?: string;
  path: string;
  branch: string;
  checkoutRef?: string;
  status: EntityStatus;
  health: "healthy" | "warning" | "error" | "unknown";
  driftStatus?: "synced" | "ahead" | "behind" | "diverged" | "unknown";
  storageUsed?: number;
  previewUrl?: string;
  lastSyncAt?: string;
}

export interface Workspace {
  id: string;
  teamId: string;
  spaceId: string;
  repositoryId: string;
  name: string;
  defaultBranch: string;
  status: EntityStatus;
  lastActivityAt?: string;
}

export interface WorkspaceServer {
  id?: string;
  name: string;
  ip: string;
  type: string;
  latency: string;
  status: "online" | "offline";
}

export interface WorkspaceRepository {
  id?: string;
  name: string;
  branch: string;
  commit: string;
  message: string;
  ahead: number;
  behind: number;
  updated: string;
}

export interface WorkspaceEnvironment {
  id?: string;
  name: string;
  status: string;
}

export interface WorkspaceAgent {
  id?: string;
  name: string;
  version: string;
  status: string;
}

export interface WorkspaceSession {
  id?: string;
  name: string;
  agent: string;
  duration: string;
}

export interface WorkspaceFile {
  name: string;
  commit: string;
  time: string;
}

export interface WorkspaceDetail {
  id?: string;
  name: string;
  branch: string;
  status: string;
  servers: WorkspaceServer[];
  repository: WorkspaceRepository;
  environments: WorkspaceEnvironment[];
  installedAgents: WorkspaceAgent[];
  activeSessions: WorkspaceSession[];
  recentFiles: WorkspaceFile[];
}
```

- [ ] **Step 2: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: build passes with the existing chunk-size warning only.

---

### Task 2: Align Session, Pane, Terminal, And Process Types

**Files:**
- Modify: `D:\working\EverDock\src\types\session.ts`
- Modify: `D:\working\EverDock\src\types\terminal.ts`

- [ ] **Step 1: Replace `session.ts` with expanded session model**

Use this complete file content:

```ts
export type SessionStatus =
  | "created"
  | "starting"
  | "running"
  | "idle"
  | "waiting_approval"
  | "blocked"
  | "detached"
  | "recovering"
  | "disconnected"
  | "completed"
  | "failed"
  | "terminated"
  | "unknown"
  | "needs_approval";

export type PersistenceMode = "app_owned" | "ssh_only" | "runner_managed";

export type PaneType =
  | "terminal"
  | "log_stream"
  | "agent_chat"
  | "diff"
  | "approval"
  | "artifact"
  | "browser_preview";

export type PaneOwnershipMode =
  | "user_controlled"
  | "agent_controlled"
  | "shared_read_only"
  | "read_only"
  | "takeover_locked";

export interface Session {
  id: number | string;
  teamId?: string;
  spaceId?: string;
  workspaceId?: string;
  workspaceBindingId?: string;
  executionTargetId?: string;
  runnerId?: string;
  name: string;
  status: SessionStatus;
  agent: string;
  branch: string;
  workspace: string;
  environment: string;
  duration: string;
  persistenceMode?: PersistenceMode;
  lastActivityAt?: string;
}

export interface Pane {
  id: string;
  sessionId: string;
  title: string;
  paneType: PaneType;
  ownershipMode: PaneOwnershipMode;
  layout?: Record<string, unknown>;
  orderIndex: number;
  status: string;
}

export interface PaneBinding {
  id: string;
  paneId: string;
  bindingType:
    | "terminal"
    | "process"
    | "agent_session"
    | "task_run"
    | "log_stream"
    | "diff"
    | "approval"
    | "artifact";
  resourceId: string;
}

export interface RecentSessionItem {
  name: string;
  agent: string;
  workspace: string;
  time: string;
  active: boolean;
}
```

- [ ] **Step 2: Replace `terminal.ts` with terminal/process-compatible types**

Use this complete file content:

```ts
export type TerminalStatus =
  | "created"
  | "connected"
  | "disconnected"
  | "running_command"
  | "waiting_approval"
  | "read_only"
  | "closed";

export type ProcessStatus = "starting" | "running" | "exited" | "killed" | "unknown";

export interface MCConsolePane {
  id: string;
  title: string;
  server: string;
  shell: string;
  agent: string;
  logs: string[];
}

export interface TerminalSession {
  id: string;
  title: string;
  workspaceId: string;
  workspaceBindingId?: string;
  serverId: string;
  executionTargetId?: string;
  runnerId?: string;
  status: TerminalStatus;
  cwd: string;
  shell?: string;
  cols?: number;
  rows?: number;
}

export interface ProcessRecord {
  id: string;
  runnerId?: string;
  sessionId?: string;
  terminalId?: string;
  workspaceBindingId?: string;
  pid?: number;
  command: string;
  cwd: string;
  status: ProcessStatus;
  exitCode?: number;
  startedAt?: string;
  endedAt?: string;
}
```

- [ ] **Step 3: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: build passes with the existing chunk-size warning only.

---

### Task 3: Align Agent Runtime Types

**Files:**
- Modify: `D:\working\EverDock\src\types\agent.ts`

- [ ] **Step 1: Replace `agent.ts` with split agent ontology**

Use this complete file content:

```ts
export type AgentStatus = "active" | "idle" | "blocked" | "offline";

export interface AgentProvider {
  id: string;
  teamId: string;
  name: string;
  providerType: "openai" | "anthropic" | "google" | "local" | "custom";
  status: string;
  authStatus: "connected" | "missing" | "expired" | "unknown";
}

export interface AgentRuntime {
  id: string;
  name: "codex" | "claude_code" | "opencode" | "gemini_cli" | "agy" | "custom_cli" | "acp";
  displayName: string;
  runtimeType: string;
  defaultCapabilities: string[];
  detectionStrategy?: string;
}

export interface AgentInstallation {
  id: string;
  teamId: string;
  agentRuntimeId: string;
  executionTargetId: string;
  runnerId?: string;
  binaryPath?: string;
  version?: string;
  status: "detected" | "ready" | "missing_auth" | "broken" | "disabled";
  capabilities: string[];
  lastCheckedAt?: string;
}

export interface AgentProfile {
  id: string;
  teamId: string;
  name: string;
  role: "builder" | "reviewer" | "tester" | "docs_writer" | "researcher" | "ops" | "custom";
  agentRuntimeId: string;
  providerId?: string;
  model?: string;
  systemPrompt?: string;
  defaultPolicyId?: string;
  defaultBudgetId?: string;
  status: string;
}

export interface AgentInstance {
  id: string;
  teamId: string;
  agentInstallationId: string;
  agentProfileId?: string;
  processId?: string;
  sessionId?: string;
  status: "starting" | "idle" | "running" | "waiting_approval" | "blocked" | "done" | "failed" | "stopped";
  startedAt?: string;
  endedAt?: string;
}

export interface AgentSession {
  id: string;
  teamId: string;
  sessionId: string;
  taskRunId?: string;
  agentInstanceId?: string;
  agentProfileId?: string;
  agentInstallationId?: string;
  workspaceBindingId?: string;
  terminalId?: string;
  status: "created" | "planning" | "running" | "waiting_approval" | "blocked" | "completed" | "failed" | "stopped";
  startedAt?: string;
  endedAt?: string;
  tokensUsed?: number;
  computeUsed?: number;
  costEstimate?: number;
}

export interface Agent {
  name: string;
  category: string;
  status: AgentStatus;
  provider: string;
  model: string;
  workspace: string;
  branch: string;
  lastAction: string;
  lastActionTime: string;
  version: string;
}

export interface SidebarAgent {
  name: string;
  state: "working" | "idle" | "blocked" | "done";
  agent: string;
  statusColor: "green" | "amber" | "red" | "gray";
}
```

- [ ] **Step 2: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: build passes with the existing chunk-size warning only.

---

### Task 4: Align Task And Approval Types

**Files:**
- Modify: `D:\working\EverDock\src\types\task.ts`
- Modify: `D:\working\EverDock\src\types\approval.ts`

- [ ] **Step 1: Replace `task.ts` with TaskRun-compatible types**

Use this complete file content:

```ts
export type TaskStatus = "queued" | "planning" | "running" | "needs_approval" | "blocked" | "review" | "done" | "failed" | "cancelled";

export type TaskRunStatus = "queued" | "starting" | "running" | "waiting_approval" | "blocked" | "review" | "completed" | "failed" | "cancelled";

export interface Task {
  id: string;
  title: string;
  tags: string[];
  agent: string;
  time?: string;
  status: "In Progress" | "Queued" | "Review" | "Done";
  teamId?: string;
  spaceId?: string;
  workspaceId?: string;
  repositoryId?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  completionPolicyId?: string;
}

export interface TaskRun {
  id: string;
  teamId: string;
  taskId: string;
  sessionId?: string;
  workspaceBindingId: string;
  executionTargetId?: string;
  runnerId?: string;
  status: TaskRunStatus;
  branch?: string;
  worktreePath?: string;
  verificationStatus?: "pending" | "passed" | "failed" | "skipped";
  costEstimate?: number;
  startedAt?: string;
  endedAt?: string;
}

export interface TaskRunAgentAssignment {
  id: string;
  taskRunId: string;
  agentProfileId: string;
  agentInstallationId?: string;
  agentSessionId?: string;
  role: "planner" | "builder" | "reviewer" | "tester" | "researcher" | "docs" | "ops";
  status: string;
  orderIndex: number;
}

export interface CompletionPolicy {
  id: string;
  teamId: string;
  name: string;
  policyType:
    | "manual"
    | "agent_declared"
    | "command_succeeded"
    | "tests_passed"
    | "reviewer_approved"
    | "user_approved"
    | "pr_merged"
    | "composite";
  rules: Record<string, unknown>;
}

export interface TaskStep {
  text: string;
  done: boolean;
}

export interface TaskComment {
  author: string;
  time: string;
  text: string;
}

export interface TaskRelatedFile {
  name: string;
  path: string;
  additions: number;
  deletions: number;
}

export interface FileChange {
  id: string;
  taskId?: string;
  taskRunId?: string;
  agentSessionId?: string;
  workspaceId?: string;
  workspaceBindingId?: string;
  filePath: string;
  changeType: "added" | "modified" | "deleted" | "renamed";
  additions: number;
  deletions: number;
  diffArtifactId?: string;
}

export interface TaskDetail {
  id: string;
  title: string;
  status: string;
  created: string;
  tags: string[];
  objective: string;
  steps: TaskStep[];
  assignedAgent: { name: string; status: string };
  workspace: { name: string; branch: string };
  comments: TaskComment[];
  relatedFiles: TaskRelatedFile[];
}
```

- [ ] **Step 2: Replace `approval.ts` with policy/action/secret-compatible types**

Use this complete file content:

```ts
export type ApprovalType =
  | "command_execution"
  | "file_change"
  | "package_install"
  | "git_push"
  | "pr_create"
  | "deploy_preview"
  | "deploy_production"
  | "secret_access"
  | "network_access"
  | "database_migration";

export type ApprovalRiskLevel = "low" | "medium" | "high" | "critical";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "changes_requested" | "expired";

export interface ActionIntent {
  id: string;
  teamId?: string;
  sessionId?: string;
  taskRunId?: string;
  agentSessionId?: string;
  requestedByActorType: "user" | "agent" | "system" | "runner";
  requestedByActorId: string;
  actionType: string;
  targetType?: string;
  targetId?: string;
  command?: string;
  affectedPaths?: string[];
  riskLevel: ApprovalRiskLevel;
  normalizedPayload?: Record<string, unknown>;
  status: "pending" | "allowed" | "approval_required" | "denied";
}

export interface Policy {
  id: string;
  teamId: string;
  name: string;
  scopeType: "account" | "team" | "space" | "workspace" | "workspace_binding" | "environment" | "task_run" | "agent_profile";
  scopeId?: string;
  rules: Record<string, unknown>;
}

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  riskLevel: ApprovalRiskLevel;
  title: string;
  description: string;
  requestedByAgentId?: string;
  requestedByActorType?: "user" | "agent" | "system" | "runner";
  requestedByActorId?: string;
  actionIntentId?: string;
  taskId?: string;
  taskRunId?: string;
  sessionId?: string;
  agentSessionId?: string;
  workspaceId?: string;
  workspaceBindingId?: string;
  payload?: string | Record<string, unknown>;
  status: ApprovalStatus;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface Secret {
  id: string;
  teamId: string;
  workspaceId?: string;
  workspaceBindingId?: string;
  environmentId?: string;
  name: string;
  encryptedValueRef: string;
  scope: string;
  createdByUserId?: string;
  lastRotatedAt?: string;
}

export interface SecretLease {
  id: string;
  secretId: string;
  teamId: string;
  sessionId?: string;
  taskRunId?: string;
  agentSessionId?: string;
  grantedToActorType: "user" | "agent" | "system" | "runner";
  grantedToActorId: string;
  status: "pending" | "active" | "expired" | "revoked";
  expiresAt: string;
  revokedAt?: string;
}
```

- [ ] **Step 3: Run TypeScript build**

Run:

```bash
npm run build
```

Expected: build passes with the existing chunk-size warning only.

---

### Task 5: Final Verification

**Files:**
- No additional files.

- [ ] **Step 1: Run final build**

Run:

```bash
npm run build
```

Expected: build passes with the existing chunk-size warning only.

- [ ] **Step 2: Inspect git changes**

Run:

```bash
git status --short
```

Expected: only the intended type files and docs/plans changes are listed, unless `everdock_product_docs/` remains ignored by `.gitignore`.
