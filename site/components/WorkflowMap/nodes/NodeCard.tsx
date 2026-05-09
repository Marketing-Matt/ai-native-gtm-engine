'use client';

import { KeyboardEvent } from 'react';
import styles from '../WorkflowMap.module.css';
import type { WorkflowNode } from '../WorkflowMap.types';

interface Props {
  node: WorkflowNode;
  isActive: boolean;
  onClick: (node: WorkflowNode) => void;
}

const statusClass: Record<WorkflowNode['status'], string> = {
  live: styles.statusLive,
  'in-progress': styles.statusProgress,
  planned: styles.statusPlanned,
};

const statusLabel: Record<WorkflowNode['status'], string> = {
  live: 'Status: live',
  'in-progress': 'Status: in progress',
  planned: 'Status: planned',
};

export function NodeCard({ node, isActive, onClick }: Props) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(node);
    }
  };

  const className = [
    styles.card,
    isActive ? styles.cardActive : '',
    node.isWide ? styles.cardWide : '',
    node.isDashed ? styles.cardDashed : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${node.title} — ${statusLabel[node.status]}`}
      className={className}
      onClick={() => onClick(node)}
      onKeyDown={handleKeyDown}
    >
      <span
        className={`${styles.statusDot} ${statusClass[node.status]}`}
        aria-label={statusLabel[node.status]}
      />
      <p className={styles.cardTitle}>{node.title}</p>
      <p className={styles.cardSubtitle}>{node.subtitle}</p>
    </div>
  );
}

NodeCard.displayName = 'NodeCard';
