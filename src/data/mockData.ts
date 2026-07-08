export interface Space {
  name: string;
  branch: string;
  status: 'active' | 'idle' | 'error' | 'done';
  color: string;
  activeCount?: number;
}

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

export interface Task {
  id: string;
  title: string;
  tags: string[];
  agent: string;
  time?: string;
  status: 'In Progress' | 'Queued' | 'Review' | 'Done';
}

export interface TaskDetail {
  id: string;
  title: string;
  status: string;
  created: string;
  tags: string[];
  objective: string;
  steps: { text: string; done: boolean }[];
  assignedAgent: { name: string; status: string };
  workspace: { name: string; branch: string };
  comments: { author: string; time: string; text: string }[];
  relatedFiles: { name: string; path: string; additions: number; deletions: number }[];
}

export interface WorkspaceDetail {
  name: string;
  branch: string;
  status: string;
  servers: { name: string; ip: string; type: string; latency: string; status: 'online' | 'offline' }[];
  repository: { name: string; branch: string; commit: string; message: string; ahead: number; behind: number; updated: string };
  environments: { name: string; status: string }[];
  installedAgents: { name: string; version: string; status: string }[];
  activeSessions: { name: string; agent: string; duration: string }[];
  recentFiles: { name: string; commit: string; time: string }[];
}

export interface ScreenItem {
  id: string;
  name: string;
  server: string;
  type: string;
  latency: string;
  status: 'online' | 'busy' | 'offline';
  agentInitials: string;
  taskName?: string;
}

export interface MCConsolePane {
  id: string;
  title: string;
  server: string;
  shell: string;
  agent: string;
  logs: string[];
}

// === MOCK DATA DEFINITIONS ===

export const mockSpaces: Space[] = [
  { name: 'herdr', branch: 'master', status: 'active', color: 'blue', activeCount: 3 },
  { name: 'llm-proxy', branch: 'master', status: 'active', color: 'pink', activeCount: 1 },
  { name: 'qmp', branch: 'autosearch/qmp-refactor', status: 'idle', color: 'green', activeCount: 0 }
];

export const mockAgents: Agent[] = [
  { name: 'Claude', category: 'General Purpose', status: 'active', provider: 'Anthropic', model: 'Claude 3.5 Sonnet', workspace: 'herdr', branch: 'master', lastAction: 'Analyzed codebase', lastActionTime: '2m ago', version: 'v2.1.168' },
  { name: 'Codex', category: 'Development', status: 'active', provider: 'OpenAI', model: 'GPT-4o', workspace: 'herdr', branch: 'master', lastAction: 'Implemented feature', lastActionTime: '8m ago', version: 'v1.3.2' },
  { name: 'OpenCode', category: 'Development', status: 'idle', provider: 'OpenCode', model: 'o1-mini', workspace: 'herdr', branch: 'master', lastAction: 'Refactored module', lastActionTime: '22m ago', version: 'v0.8.41' },
  { name: 'Explorer', category: 'General Purpose', status: 'idle', provider: 'Anthropic', model: 'Claude 3 Haiku', workspace: 'llm-proxy', branch: 'master', lastAction: 'Index updated', lastActionTime: '1h ago', version: 'v1.2.0' },
  { name: 'Test Runner', category: 'Testing', status: 'active', provider: 'OpenAI', model: 'GPT-4o', workspace: 'herdr', branch: 'master', lastAction: 'Ran test suite', lastActionTime: '3m ago', version: 'v1.1.0' },
  { name: 'Docs Writer', category: 'Documentation', status: 'idle', provider: 'Anthropic', model: 'Claude 3 Haiku', workspace: 'herdr', branch: 'master', lastAction: 'Updated docs', lastActionTime: '45m ago', version: 'v0.9.3' }
];

export const mockSidebarAgents: SidebarAgent[] = [
  { name: 'herdr', state: 'working', agent: 'claude', statusColor: 'green' },
  { name: 'explore', state: 'idle', agent: 'opencode', statusColor: 'amber' },
  { name: 'llm-proxy', state: 'blocked', agent: 'claude', statusColor: 'red' },
  { name: 'qmp', state: 'done', agent: 'codex', statusColor: 'gray' }
];

export const mockSessions: Session[] = [
  { id: 1, name: 'auth/session.ts fix', status: 'running', agent: 'claude', branch: 'master', workspace: 'herdr', environment: 'dev.local', duration: '12m' },
  { id: 2, name: 'CLI docs update', status: 'running', agent: 'opencode', branch: 'master', workspace: 'herdr', environment: 'dev.local', duration: '1h' },
  { id: 3, name: 'Redis cache config', status: 'running', agent: 'claude', branch: 'master', workspace: 'llm-proxy', environment: 'staging.local', duration: '2h' },
  { id: 4, name: 'Refactor search API', status: 'idle', agent: 'claude', branch: 'autosearch/qmp-refactor', workspace: 'qmp', environment: 'dev.local', duration: '45m' }
];

export const mockRecentSessions = [
  { name: 'auth/session.ts fix', agent: 'claude', workspace: 'herdr', time: '12m', active: true },
  { name: 'CLI docs update', agent: 'opencode', workspace: 'herdr', time: '1h', active: false },
  { name: 'Redis cache config', agent: 'claude', workspace: 'llm-proxy', time: '2h', active: false },
  { name: 'Refactor search API', agent: 'claude', workspace: 'qmp', time: 'Yesterday', active: false },
  { name: 'Dependency update', agent: 'opencode', workspace: 'herdr', time: 'Yesterday', active: false }
];

export const mockTasks: Task[] = [
  // In Progress
  { id: 'TASK-1024', title: 'Implement login redirect for unauthenticated users', tags: ['herdr', 'high'], agent: 'claude', time: '12m', status: 'In Progress' },
  { id: 'TASK-1025', title: 'Add rate limiting to auth endpoints', tags: ['herdr', 'medium'], agent: 'opencode', time: '24m', status: 'In Progress' },
  { id: 'TASK-1026', title: 'Refactor session store to use Redis', tags: ['herdr', 'medium'], agent: 'claude', time: '37m', status: 'In Progress' },
  
  // Queued
  { id: 'TASK-1027', title: 'Add password reset flow', tags: ['herdr', 'low'], agent: 'codex', status: 'Queued' },
  { id: 'TASK-1028', title: 'Write integration tests for auth', tags: ['herdr', 'low'], agent: 'opencode', status: 'Queued' },
  { id: 'TASK-1029', title: 'Update docs for deployment', tags: ['herdr', 'low'], agent: 'claude', status: 'Queued' },
  
  // Review
  { id: 'TASK-1020', title: 'Implement email verification', tags: ['herdr', 'medium'], agent: 'claude', time: '1h ago', status: 'Review' },
  { id: 'TASK-1021', title: 'Add user preferences endpoint', tags: ['herdr', 'medium'], agent: 'opencode', time: '2h ago', status: 'Review' },
  
  // Done
  { id: 'TASK-1001', title: 'Set up CI pipeline', tags: ['herdr', 'low'], agent: 'codex', time: 'Yesterday', status: 'Done' },
  { id: 'TASK-1002', title: 'Initialize project structure', tags: ['herdr', 'low'], agent: 'claude', time: 'Yesterday', status: 'Done' }
];

export const mockTaskDetail: TaskDetail = {
  id: 'TASK-1024',
  title: 'Implement login redirect for unauthenticated users',
  status: 'IN PROGRESS',
  created: 'Created 2h ago',
  tags: ['herdr', 'high', 'claude', '#TASK-1024'],
  objective: 'Redirect users to /login when accessing protected routes without a valid session. Preserve the original destination in a redirect parameter.',
  steps: [
    { text: 'Define protected routes', done: true },
    { text: 'Add middleware to check auth', done: true },
    { text: 'Store redirect URL in query param', done: false },
    { text: 'Redirect to /login', done: false },
    { text: 'Add tests for redirect behavior', done: false }
  ],
  assignedAgent: { name: 'claude', status: 'Active' },
  workspace: { name: 'herdr', branch: 'master' },
  comments: [
    { author: 'claude', time: '12m ago', text: 'Middleware implemented. Working on preserving redirect URL now.' },
    { author: 'opencode', time: '45m ago', text: 'Consider excluding /api/* from protection.' }
  ],
  relatedFiles: [
    { name: 'middleware/auth.ts', path: 'src/middleware', additions: 24, deletions: -6 },
    { name: 'routes/protected.tsx', path: 'src/routes', additions: 18, deletions: -2 },
    { name: 'auth.test.ts', path: 'tests/auth', additions: 32, deletions: 0 }
  ]
};

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

export const mockScreens: ScreenItem[] = [
  { id: '1', name: 'prod-web-01', server: 'herdr • ssh', type: 'Deploying v1.18.1', latency: '22ms', status: 'online', agentInitials: 'CJ', taskName: 'Deploying v1.18.1' },
  { id: '2', name: 'staging-api', server: 'herdr • ssh', type: 'Refactoring auth module', latency: '48ms', status: 'online', agentInitials: 'AK' },
  { id: '3', name: 'db-primary', server: 'herdr • psql', type: 'Querying slow logs', latency: '16ms', status: 'online', agentInitials: 'PB' },
  { id: '4', name: 'redis-cache', server: 'herdr • redis-cli', type: 'Monitoring keyspace', latency: '35ms', status: 'online', agentInitials: 'DS' },
  { id: '5', name: 'worker-queue', server: 'herdr • ssh', type: 'Investigating job failures', latency: '62ms', status: 'online', agentInitials: 'MR' },
  { id: '6', name: 'build-runner-02', server: 'herdr • ssh', type: 'Running CI build #8821', latency: '120ms', status: 'busy', agentInitials: 'SN' },
  { id: '7', name: 'metrics-collector', server: 'herdr • ssh', type: 'Streaming metrics', latency: '28ms', status: 'online', agentInitials: 'TL' },
  { id: '8', name: 'frontend-dev', server: 'herdr • ssh', type: 'Working on dashboard UI', latency: '31ms', status: 'online', agentInitials: 'JW' }
];

export const mockMCConsoles: MCConsolePane[] = [
  {
    id: 'api-server',
    title: '1. API Server',
    server: 'prod-web-01',
    shell: 'bash',
    agent: 'claude',
    logs: [
      'herdr on master via node v18.18.1',
      '$ pnpm dev',
      '> herdr@1.0.0 dev /srv/herdr',
      '> next dev -p 3000',
      '▲ Next.js 14.2.3',
      '- Local:    http://localhost:3000',
      '- Network:  http://10.0.1.12:3000',
      '✓ Ready in 1.2s',
      '✓ Compiled / in 320ms',
      '✓ Compiled /api/health in 182ms',
      'GET /api/health 200 in 45ms',
      'GET /api/users 200 in 87ms'
    ]
  },
  {
    id: 'worker',
    title: '2. Worker',
    server: 'staging-api',
    shell: 'zsh',
    agent: 'opencode',
    logs: [
      'herdr on master via node v18.18.1',
      '$ pnpm worker:dev',
      '> herdr@1.0.0 worker:dev /srv/herdr',
      '> tsx watch src/worker.ts',
      '02:12:14 [worker] Starting job processor...',
      '02:12:14 [worker] Connected to Redis at redis://10.0.3.30:6379',
      '02:12:14 [worker] Listening for jobs in queue: email',
      '02:12:18 [job] Processing email job 8f3c2a1e',
      '02:12:18 [job] Sent email to user@example.com',
      '02:12:19 [job] Completed job 8f3c2a1e in 842ms',
      '02:12:21 [job] Processing email job 7a9d1b3f'
    ]
  },
  {
    id: 'postgres',
    title: '3. Postgres',
    server: 'db-primary',
    shell: 'psql',
    agent: 'codec',
    logs: [
      'psql (16.2)',
      'Type "help" for help.',
      'herdr=# \\dt',
      '               List of relations',
      ' Schema |    Name    | Type  | Owner ',
      '--------+------------+-------+-------',
      ' public | accounts   | table | herdr',
      ' public | api_keys   | table | herdr',
      ' public | audit_logs | table | herdr',
      ' public | sessions   | table | herdr',
      ' public | users      | table | herdr',
      '(5 rows)',
      'herdr=# SELECT COUNT(*) FROM users;',
      ' count ',
      '-------',
      '  1242',
      '(1 row)',
      'herdr=#'
    ]
  },
  {
    id: 'logs',
    title: '4. Logs',
    server: 'prod-web-01',
    shell: 'bash',
    agent: 'claude',
    logs: [
      'herdr on master via node v18.18.1',
      '$ tail -f /var/log/herdr/app.log',
      '2025-05-16T02:12:28.123Z INFO  [server] Request received',
      '2025-05-16T02:12:28.124Z INFO  [server] GET /api/health 200 45ms',
      '2025-05-16T02:12:28.136Z INFO  [server] Request received',
      '2025-05-16T02:12:28.139Z INFO  [server] GET /api/users 200 87ms',
      '2025-05-16T02:12:29.201Z WARN  [ratelimit] Rate limit approaching',
      '2025-05-16T02:12:30.452Z ERROR [auth] Invalid token',
      '2025-05-16T02:12:31.001Z INFO  [server] POST /api/auth/login 200 123ms',
      '2025-05-16T02:12:32.120Z INFO  [background] Cleanup completed',
      '2025-05-16T02:12:33.987Z INFO  [server] Request received',
      '2025-05-16T02:12:33.988Z INFO  [server] GET /api/health 200 43ms'
    ]
  }
];
