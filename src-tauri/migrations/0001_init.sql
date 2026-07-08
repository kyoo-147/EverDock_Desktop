PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('personal', 'team', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active',
  billing_customer_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  plan_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_memberships (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'developer', 'reviewer', 'viewer')),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(team_id, user_id)
);

CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  app_version TEXT,
  device_public_key TEXT,
  trusted INTEGER NOT NULL DEFAULT 0,
  last_seen_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS licenses (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  plan_code TEXT NOT NULL,
  trial_started_at TEXT,
  trial_ends_at TEXT,
  expires_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  plan_code TEXT NOT NULL,
  status TEXT NOT NULL,
  billing_provider TEXT,
  billing_customer_id TEXT,
  current_period_start TEXT,
  current_period_end TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS offline_entitlements (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  valid_until TEXT NOT NULL,
  reason TEXT,
  last_verified_at TEXT
);

CREATE TABLE IF NOT EXISTS spaces (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repositories (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  space_id TEXT REFERENCES spaces(id) ON DELETE SET NULL,
  provider TEXT NOT NULL CHECK (provider IN ('github', 'gitlab', 'bitbucket', 'local', 'git_url')),
  external_id TEXT,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  url TEXT NOT NULL,
  default_branch TEXT NOT NULL,
  connected_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_sync_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  space_id TEXT REFERENCES spaces(id) ON DELETE SET NULL,
  repository_id TEXT REFERENCES repositories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  default_branch TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS environments (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  approval_policy_id TEXT,
  metadata TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS execution_targets (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('local_machine', 'ssh_host', 'runner_host', 'managed_server')),
  connection_type TEXT NOT NULL CHECK (connection_type IN ('local', 'ssh', 'runner', 'cloud_relay')),
  hostname TEXT,
  ip_address TEXT,
  region TEXT,
  os TEXT,
  architecture TEXT,
  status TEXT NOT NULL DEFAULT 'unknown',
  last_seen_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS runner_registrations (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  execution_target_id TEXT NOT NULL REFERENCES execution_targets(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  paired_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  paired_at TEXT,
  revoked_at TEXT,
  last_rotated_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS runners (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  execution_target_id TEXT NOT NULL REFERENCES execution_targets(id) ON DELETE CASCADE,
  runner_registration_id TEXT REFERENCES runner_registrations(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('unpaired', 'pairing', 'online', 'degraded', 'updating', 'restarting', 'recovering', 'offline', 'revoked')),
  version TEXT,
  installed_at TEXT,
  last_heartbeat_at TEXT,
  capabilities TEXT NOT NULL DEFAULT '[]',
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS managed_servers (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  execution_target_id TEXT REFERENCES execution_targets(id) ON DELETE SET NULL,
  provider TEXT,
  region TEXT,
  size TEXT,
  status TEXT NOT NULL DEFAULT 'requested',
  provision_mode TEXT NOT NULL CHECK (provision_mode IN ('manual', 'automated')),
  billing_status TEXT,
  snapshot_policy TEXT,
  auto_shutdown_policy TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS workspace_bindings (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  execution_target_id TEXT NOT NULL REFERENCES execution_targets(id) ON DELETE CASCADE,
  runner_id TEXT REFERENCES runners(id) ON DELETE SET NULL,
  environment_id TEXT REFERENCES environments(id) ON DELETE SET NULL,
  path TEXT NOT NULL,
  branch TEXT NOT NULL,
  checkout_ref TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  health TEXT NOT NULL DEFAULT 'unknown',
  drift_status TEXT NOT NULL DEFAULT 'unknown',
  storage_used INTEGER NOT NULL DEFAULT 0,
  preview_url TEXT,
  last_sync_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  space_id TEXT REFERENCES spaces(id) ON DELETE SET NULL,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  execution_target_id TEXT REFERENCES execution_targets(id) ON DELETE SET NULL,
  runner_id TEXT REFERENCES runners(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('created', 'starting', 'running', 'idle', 'waiting_approval', 'blocked', 'detached', 'recovering', 'disconnected', 'completed', 'failed', 'terminated', 'unknown')),
  owner_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  persistence_mode TEXT NOT NULL CHECK (persistence_mode IN ('app_owned', 'ssh_only', 'runner_managed')),
  started_at TEXT,
  ended_at TEXT,
  last_activity_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS panes (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  pane_type TEXT NOT NULL,
  ownership_mode TEXT NOT NULL,
  layout TEXT NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS pane_bindings (
  id TEXT PRIMARY KEY,
  pane_id TEXT NOT NULL REFERENCES panes(id) ON DELETE CASCADE,
  binding_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS terminals (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  pane_id TEXT REFERENCES panes(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  execution_target_id TEXT REFERENCES execution_targets(id) ON DELETE SET NULL,
  runner_id TEXT REFERENCES runners(id) ON DELETE SET NULL,
  shell TEXT,
  working_directory TEXT,
  status TEXT NOT NULL DEFAULT 'created',
  cols INTEGER,
  rows INTEGER,
  created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  started_at TEXT,
  ended_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS processes (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  runner_id TEXT REFERENCES runners(id) ON DELETE SET NULL,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  terminal_id TEXT REFERENCES terminals(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  pid INTEGER,
  command TEXT NOT NULL,
  cwd TEXT,
  status TEXT NOT NULL DEFAULT 'starting',
  exit_code INTEGER,
  started_at TEXT,
  ended_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS log_streams (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  source_type TEXT NOT NULL,
  source_path TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS agent_providers (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  provider_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  auth_status TEXT NOT NULL DEFAULT 'unknown',
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS agent_runtimes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  runtime_type TEXT NOT NULL,
  default_capabilities TEXT NOT NULL DEFAULT '[]',
  detection_strategy TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS agent_installations (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  agent_runtime_id TEXT NOT NULL REFERENCES agent_runtimes(id) ON DELETE CASCADE,
  execution_target_id TEXT NOT NULL REFERENCES execution_targets(id) ON DELETE CASCADE,
  runner_id TEXT REFERENCES runners(id) ON DELETE SET NULL,
  binary_path TEXT,
  version TEXT,
  status TEXT NOT NULL DEFAULT 'detected',
  capabilities TEXT NOT NULL DEFAULT '[]',
  last_checked_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS agent_profiles (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  agent_runtime_id TEXT REFERENCES agent_runtimes(id) ON DELETE SET NULL,
  provider_id TEXT REFERENCES agent_providers(id) ON DELETE SET NULL,
  model TEXT,
  system_prompt TEXT,
  default_policy_id TEXT,
  default_budget_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS agent_instances (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  agent_installation_id TEXT REFERENCES agent_installations(id) ON DELETE SET NULL,
  agent_profile_id TEXT REFERENCES agent_profiles(id) ON DELETE SET NULL,
  process_id TEXT REFERENCES processes(id) ON DELETE SET NULL,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'starting',
  started_at TEXT,
  ended_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS completion_policies (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  policy_type TEXT NOT NULL,
  rules TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  space_id TEXT REFERENCES spaces(id) ON DELETE SET NULL,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE SET NULL,
  repository_id TEXT REFERENCES repositories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'queued',
  priority TEXT,
  created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  completion_policy_id TEXT REFERENCES completion_policies(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS task_runs (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  execution_target_id TEXT REFERENCES execution_targets(id) ON DELETE SET NULL,
  runner_id TEXT REFERENCES runners(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  branch TEXT,
  worktree_path TEXT,
  started_at TEXT,
  ended_at TEXT,
  verification_status TEXT,
  cost_estimate REAL,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS agent_sessions (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  agent_instance_id TEXT REFERENCES agent_instances(id) ON DELETE SET NULL,
  agent_profile_id TEXT REFERENCES agent_profiles(id) ON DELETE SET NULL,
  agent_installation_id TEXT REFERENCES agent_installations(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  terminal_id TEXT REFERENCES terminals(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'created',
  started_at TEXT,
  ended_at TEXT,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  compute_used REAL NOT NULL DEFAULT 0,
  cost_estimate REAL,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS task_run_agent_assignments (
  id TEXT PRIMARY KEY,
  task_run_id TEXT NOT NULL REFERENCES task_runs(id) ON DELETE CASCADE,
  agent_profile_id TEXT REFERENCES agent_profiles(id) ON DELETE SET NULL,
  agent_installation_id TEXT REFERENCES agent_installations(id) ON DELETE SET NULL,
  agent_session_id TEXT REFERENCES agent_sessions(id) ON DELETE SET NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS policies (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  scope_type TEXT NOT NULL,
  scope_id TEXT,
  rules TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS action_intents (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  agent_session_id TEXT REFERENCES agent_sessions(id) ON DELETE SET NULL,
  requested_by_actor_type TEXT NOT NULL,
  requested_by_actor_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  command TEXT,
  affected_paths TEXT NOT NULL DEFAULT '[]',
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  normalized_payload TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS approval_requests (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  action_intent_id TEXT REFERENCES action_intents(id) ON DELETE SET NULL,
  task_id TEXT REFERENCES tasks(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  agent_session_id TEXT REFERENCES agent_sessions(id) ON DELETE SET NULL,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  requested_by_actor_type TEXT NOT NULL,
  requested_by_actor_id TEXT NOT NULL,
  type TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT,
  payload TEXT NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at TEXT,
  resolved_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS secrets (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE CASCADE,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE CASCADE,
  environment_id TEXT REFERENCES environments(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  encrypted_value_ref TEXT NOT NULL,
  scope TEXT NOT NULL,
  created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_rotated_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS secret_leases (
  id TEXT PRIMARY KEY,
  secret_id TEXT NOT NULL REFERENCES secrets(id) ON DELETE CASCADE,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  agent_session_id TEXT REFERENCES agent_sessions(id) ON DELETE SET NULL,
  granted_to_actor_type TEXT NOT NULL,
  granted_to_actor_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS artifacts (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  space_id TEXT REFERENCES spaces(id) ON DELETE SET NULL,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  task_id TEXT REFERENCES tasks(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  agent_session_id TEXT REFERENCES agent_sessions(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  storage_ref TEXT NOT NULL,
  size_bytes INTEGER,
  hash TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS file_changes (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  task_id TEXT REFERENCES tasks(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  agent_session_id TEXT REFERENCES agent_sessions(id) ON DELETE SET NULL,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  file_path TEXT NOT NULL,
  change_type TEXT NOT NULL,
  additions INTEGER NOT NULL DEFAULT 0,
  deletions INTEGER NOT NULL DEFAULT 0,
  diff_artifact_id TEXT REFERENCES artifacts(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  sequence INTEGER NOT NULL,
  timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  source TEXT NOT NULL,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
  space_id TEXT REFERENCES spaces(id) ON DELETE SET NULL,
  repository_id TEXT REFERENCES repositories(id) ON DELETE SET NULL,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  execution_target_id TEXT REFERENCES execution_targets(id) ON DELETE SET NULL,
  runner_id TEXT REFERENCES runners(id) ON DELETE SET NULL,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  pane_id TEXT REFERENCES panes(id) ON DELETE SET NULL,
  terminal_id TEXT REFERENCES terminals(id) ON DELETE SET NULL,
  process_id TEXT REFERENCES processes(id) ON DELETE SET NULL,
  task_id TEXT REFERENCES tasks(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  agent_session_id TEXT REFERENCES agent_sessions(id) ON DELETE SET NULL,
  approval_id TEXT REFERENCES approval_requests(id) ON DELETE SET NULL,
  artifact_id TEXT REFERENCES artifacts(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  payload TEXT NOT NULL DEFAULT '{}',
  causation_id TEXT,
  correlation_id TEXT,
  schema_version INTEGER NOT NULL DEFAULT 1,
  UNIQUE(team_id, sequence)
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  workspace_id TEXT REFERENCES workspaces(id) ON DELETE SET NULL,
  workspace_binding_id TEXT REFERENCES workspace_bindings(id) ON DELETE SET NULL,
  session_id TEXT REFERENCES sessions(id) ON DELETE SET NULL,
  task_id TEXT REFERENCES tasks(id) ON DELETE SET NULL,
  task_run_id TEXT REFERENCES task_runs(id) ON DELETE SET NULL,
  approval_id TEXT REFERENCES approval_requests(id) ON DELETE SET NULL,
  risk_level TEXT,
  result TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS integration_connections (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  scopes TEXT NOT NULL DEFAULT '[]',
  encrypted_credentials_ref TEXT,
  connected_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  connected_at TEXT,
  last_sync_at TEXT,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS api_clients (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  client_type TEXT NOT NULL CHECK (client_type IN ('api_key', 'oauth_app', 'webhook')),
  status TEXT NOT NULL DEFAULT 'active',
  scopes TEXT NOT NULL DEFAULT '[]',
  created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  last_used_at TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS webhook_endpoints (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  event_types TEXT NOT NULL DEFAULT '[]',
  secret_ref TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  last_delivery_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  channel TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread',
  read_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS usage_records (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  account_id TEXT REFERENCES accounts(id) ON DELETE SET NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  metric TEXT NOT NULL,
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS budgets (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  scope_type TEXT NOT NULL,
  scope_id TEXT,
  metric TEXT NOT NULL,
  soft_limit REAL,
  hard_limit REAL,
  period TEXT NOT NULL,
  action_on_exceed TEXT NOT NULL CHECK (action_on_exceed IN ('warn', 'require_approval', 'stop')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_spaces_team ON spaces(team_id);
CREATE INDEX IF NOT EXISTS idx_repositories_team_space ON repositories(team_id, space_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_team_space ON workspaces(team_id, space_id);
CREATE INDEX IF NOT EXISTS idx_workspace_bindings_workspace ON workspace_bindings(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_bindings_target ON workspace_bindings(execution_target_id);
CREATE INDEX IF NOT EXISTS idx_execution_targets_team_status ON execution_targets(team_id, status);
CREATE INDEX IF NOT EXISTS idx_runners_target_status ON runners(execution_target_id, status);
CREATE INDEX IF NOT EXISTS idx_sessions_workspace_binding ON sessions(workspace_binding_id);
CREATE INDEX IF NOT EXISTS idx_sessions_runner_status ON sessions(runner_id, status);
CREATE INDEX IF NOT EXISTS idx_panes_session ON panes(session_id, order_index);
CREATE INDEX IF NOT EXISTS idx_terminals_session ON terminals(session_id);
CREATE INDEX IF NOT EXISTS idx_processes_session ON processes(session_id);
CREATE INDEX IF NOT EXISTS idx_agent_installations_target ON agent_installations(execution_target_id);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_task_run ON agent_sessions(task_run_id);
CREATE INDEX IF NOT EXISTS idx_tasks_workspace_status ON tasks(workspace_id, status);
CREATE INDEX IF NOT EXISTS idx_task_runs_task_status ON task_runs(task_id, status);
CREATE INDEX IF NOT EXISTS idx_approvals_status_risk ON approval_requests(status, risk_level);
CREATE INDEX IF NOT EXISTS idx_action_intents_session ON action_intents(session_id);
CREATE INDEX IF NOT EXISTS idx_secret_leases_secret_status ON secret_leases(secret_id, status);
CREATE INDEX IF NOT EXISTS idx_artifacts_task_run ON artifacts(task_run_id);
CREATE INDEX IF NOT EXISTS idx_file_changes_task_run ON file_changes(task_run_id);
CREATE INDEX IF NOT EXISTS idx_events_team_sequence ON events(team_id, sequence);
CREATE INDEX IF NOT EXISTS idx_events_session_sequence ON events(session_id, sequence);
CREATE INDEX IF NOT EXISTS idx_events_task_run_sequence ON events(task_run_id, sequence);
CREATE INDEX IF NOT EXISTS idx_audit_events_team_created ON audit_events(team_id, created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_status ON notifications(user_id, status);
CREATE INDEX IF NOT EXISTS idx_usage_records_team_metric ON usage_records(team_id, metric, recorded_at);

INSERT OR IGNORE INTO schema_migrations (version) VALUES ('0001_init');
