import { Agent, SidebarAgent } from "../types/agent";

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
