export type ApprovalType = 
  | 'command_execution' 
  | 'file_change' 
  | 'package_install' 
  | 'git_push' 
  | 'pr_create' 
  | 'deploy_preview' 
  | 'deploy_production' 
  | 'secret_access' 
  | 'network_access' 
  | 'database_migration';

export type ApprovalRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested' | 'expired';

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  riskLevel: ApprovalRiskLevel;
  title: string;
  description: string;
  requestedByAgentId: string;
  taskId?: string;
  sessionId?: string;
  workspaceId?: string;
  payload?: string;
  status: ApprovalStatus;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}
