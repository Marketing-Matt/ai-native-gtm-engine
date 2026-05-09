'use client';

import { KeyboardEvent } from 'react';
import styles from '../WorkflowMap.module.css';
import type { WorkflowNode } from '../WorkflowMap.types';

interface Props {
  node: WorkflowNode;
  layerId: string;
  layerName: string;
  dimmed: boolean;
  focused: boolean;
  onSelect: (node: WorkflowNode, layerId: string, layerName: string) => void;
}

const statusClass: Record<WorkflowNode['status'], string> = {
  live: styles.statusLive ?? '',
  'in-progress': styles.statusProgress ?? '',
  planned: styles.statusPlanned ?? '',
};

const statusText: Record<WorkflowNode['status'], string> = {
  live: 'live',
  'in-progress': 'in progress',
  planned: 'planned',
};

function StatusBadge({ status }: { status: WorkflowNode['status'] }) {
  return (
    <span
      className={`${styles.status} ${statusClass[status]}`}
      aria-label={`Status: ${statusText[status]}`}
    >
      <span className={styles.statusDot} aria-hidden />
      {statusText[status]}
    </span>
  );
}

export function NodeCard({
  node,
  layerId,
  layerName,
  dimmed,
  focused,
  onSelect,
}: Props) {
  const className = [
    styles.node,
    node.status === 'planned' ? styles.nodeDashed : '',
    node.feature ? styles.nodeFeature : '',
    dimmed ? styles.nodeDimmed : '',
    focused ? styles.nodeFocused : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(node, layerId, layerName);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(node, layerId, layerName)}
      onKeyDown={handleKeyDown}
      aria-pressed={focused}
    >
      <div className={styles.nodeHead}>
        <span className={styles.nodeTitle}>{node.title}</span>
        <StatusBadge status={node.status} />
      </div>
      <div className={styles.nodeSub}>{node.sub}</div>
      {node.path ? <div className={styles.nodePath}>{node.path}</div> : null}
      {node.note ? <div className={styles.nodeNote}>{node.note}</div> : null}
    </button>
  );
}

NodeCard.displayName = 'NodeCard';
