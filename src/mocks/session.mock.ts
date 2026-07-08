import { Session, RecentSessionItem } from "../types/session";

export const mockSessions: Session[] = [
  { id: 1, name: 'auth/session.ts fix', status: 'running', agent: 'claude', branch: 'master', workspace: 'herdr', environment: 'dev.local', duration: '12m' },
  { id: 2, name: 'CLI docs update', status: 'running', agent: 'opencode', branch: 'master', workspace: 'herdr', environment: 'dev.local', duration: '1h' },
  { id: 3, name: 'Redis cache config', status: 'running', agent: 'claude', branch: 'master', workspace: 'llm-proxy', environment: 'staging.local', duration: '2h' },
  { id: 4, name: 'Refactor search API', status: 'idle', agent: 'claude', branch: 'autosearch/qmp-refactor', workspace: 'qmp', environment: 'dev.local', duration: '45m' }
];

export const mockRecentSessions: RecentSessionItem[] = [
  { name: 'auth/session.ts fix', agent: 'claude', workspace: 'herdr', time: '12m', active: true },
  { name: 'CLI docs update', agent: 'opencode', workspace: 'herdr', time: '1h', active: false },
  { name: 'Redis cache config', agent: 'claude', workspace: 'llm-proxy', time: '2h', active: false },
  { name: 'Refactor search API', agent: 'claude', workspace: 'qmp', time: 'Yesterday', active: false },
  { name: 'Dependency update', agent: 'opencode', workspace: 'herdr', time: 'Yesterday', active: false }
];
