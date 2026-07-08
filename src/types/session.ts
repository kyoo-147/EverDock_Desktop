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
  id: number;
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
