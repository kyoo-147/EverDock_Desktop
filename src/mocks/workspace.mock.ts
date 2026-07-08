import { Space, WorkspaceDetail } from "../types/workspace";

export const mockSpaces: Space[] = [
  { name: 'herdr', branch: 'master', status: 'active', color: 'blue', activeCount: 3 },
  { name: 'llm-proxy', branch: 'master', status: 'active', color: 'pink', activeCount: 1 },
  { name: 'qmp', branch: 'autosearch/qmp-refactor', status: 'idle', color: 'green', activeCount: 0 }
];

export const mockWorkspaceDetail: WorkspaceDetail = {
  name: 'herdr',
  branch: 'master',
  status: 'Healthy',
  servers: [
    { name: 'prod-web-01', ip: '10.0.1.12', type: 'ssh', latency: '22ms', status: 'online' },
    { name: 'staging-api', ip: '10.0.2.15', type: 'ssh', latency: '48ms', status: 'online' },
    { name: 'db-primary', ip: '10.0.3.20', type: 'ssh', latency: '16ms', status: 'online' }
  ],
  repository: {
    name: 'herdr',
    branch: 'master',
    commit: 'a7f3c2d',
    message: 'Add rate limiter middleware',
    ahead: 2,
    behind: 0,
    updated: 'Updated 7m ago'
  },
  environments: [
    { name: 'dev.local', status: 'Active' },
    { name: 'staging', status: 'Active' },
    { name: 'production', status: 'Inactive' }
  ],
  installedAgents: [
    { name: 'claude', version: 'v2.1.168', status: 'Active' },
    { name: 'opencode', version: 'v0.8.41', status: 'Active' },
    { name: 'codex', version: 'v1.3.2', status: 'Idle' }
  ],
  activeSessions: [
    { name: 'login-redirect', agent: 'claude', duration: '12m' },
    { name: 'auth/session.ts', agent: 'opencode', duration: '8m' }
  ],
  recentFiles: [
    { name: 'src/middleware/rate-limiter.ts', commit: 'a7f3c2d', time: '7m ago' },
    { name: 'src/routes/auth/session.ts', commit: 'c5b9e1a', time: '12m ago' },
    { name: 'src/services/user.service.ts', commit: '9d1a7f2', time: '25m ago' }
  ]
};
