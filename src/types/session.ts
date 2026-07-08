export interface Session {
  id: number;
  name: string;
  status: 'running' | 'idle' | 'completed' | 'failed' | 'needs_approval';
  agent: string;
  branch: string;
  workspace: string;
  environment: string;
  duration: string;
}

export interface RecentSessionItem {
  name: string;
  agent: string;
  workspace: string;
  time: string;
  active: boolean;
}
