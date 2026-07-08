import { Task, TaskDetail } from "../types/task";

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
