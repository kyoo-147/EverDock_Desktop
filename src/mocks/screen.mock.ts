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
