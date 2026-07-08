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
