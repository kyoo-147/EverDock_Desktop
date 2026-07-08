export interface Task {
  id: string;
  title: string;
  tags: string[];
  agent: string;
  time?: string;
  status: 'In Progress' | 'Queued' | 'Review' | 'Done';
}

export interface TaskStep {
  text: string;
  done: boolean;
}

export interface TaskComment {
  author: string;
  time: string;
  text: string;
}

export interface TaskRelatedFile {
  name: string;
  path: string;
  additions: number;
  deletions: number;
}

export interface TaskDetail {
  id: string;
  title: string;
  status: string;
  created: string;
  tags: string[];
  objective: string;
  steps: TaskStep[];
  assignedAgent: { name: string; status: string };
  workspace: { name: string; branch: string };
  comments: TaskComment[];
  relatedFiles: TaskRelatedFile[];
}
