export interface Agent {
  name: string;
  category: string;
  status: 'active' | 'idle' | 'blocked' | 'offline';
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
  state: 'working' | 'idle' | 'blocked' | 'done';
  agent: string;
  statusColor: 'green' | 'amber' | 'red' | 'gray';
}
