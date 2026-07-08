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
