export type NodeStatus = 'live' | 'in-progress' | 'planned';

export interface WorkflowNode {
  id: string;
  title: string;
  subtitle: string;
  status: NodeStatus;
  description: string;
  repoPath?: string;
  isWide?: boolean;
  isDashed?: boolean;
}

export interface WorkflowLayer {
  id: string;
  label: string;
  nodes: WorkflowNode[];
  tint?: string;
  isContainer?: boolean;
  containerLabel?: string;
}
