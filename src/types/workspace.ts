export interface Space {
  name: string;
  branch: string;
  status: 'active' | 'idle' | 'error' | 'done';
  color: string;
  activeCount?: number;
}

export interface WorkspaceServer {
  name: string;
  ip: string;
  type: string;
  latency: string;
  status: 'online' | 'offline';
}

export interface WorkspaceRepository {
  name: string;
  branch: string;
  commit: string;
  message: string;
  ahead: number;
  behind: number;
  updated: string;
}

export interface WorkspaceEnvironment {
  name: string;
  status: string;
}

export interface WorkspaceAgent {
  name: string;
  version: string;
  status: string;
}

export interface WorkspaceSession {
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
