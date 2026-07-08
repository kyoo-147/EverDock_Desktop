import { MCConsolePane } from "../types/terminal";

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
