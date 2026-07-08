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
