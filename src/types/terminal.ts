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
