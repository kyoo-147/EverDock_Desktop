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
  id?: string;
  teamId?: string;
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
