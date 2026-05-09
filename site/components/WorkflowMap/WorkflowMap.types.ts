export type NodeStatus = 'live' | 'in-progress' | 'planned';

export type FilterId = 'all' | 'live' | 'in-progress' | 'planned';

export type LayerTint = 'violet' | 'amber' | 'green';

export type LayerCols = 1 | 3 | 4 | 'last-2x';

export interface WorkflowNode {
  id: string;
  title: string;
  sub: string;
  status: NodeStatus;
  path?: string;
  github?: string;
  note?: string;
  feature?: boolean;
}

export interface WorkflowLayer {
  id: string;
  name: string;
  cols: LayerCols;
  nodes: WorkflowNode[];
  tint?: LayerTint;
  container?: string;
  containerHref?: string;
}
