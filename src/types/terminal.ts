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
  serverId: string;
  status: 'connected' | 'disconnected' | 'running_command' | 'waiting_approval' | 'read_only';
  cwd: string;
}
