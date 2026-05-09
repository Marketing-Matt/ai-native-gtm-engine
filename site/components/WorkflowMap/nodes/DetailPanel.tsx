'use client';

import { useEffect, useRef } from 'react';
import styles from '../WorkflowMap.module.css';
import type { WorkflowNode } from '../WorkflowMap.types';

interface Props {
  node: WorkflowNode | null;
  onClose: () => void;
}

const badgeClass: Record<WorkflowNode['status'], string> = {
  live: styles.badgeLive,
  'in-progress': styles.badgeProgress,
  planned: styles.badgePlanned,
};

const badgeLabel: Record<WorkflowNode['status'], string> = {
  live: 'Live',
  'in-progress': 'In progress',
  planned: 'Planned',
};

export function DetailPanel({ node, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = node !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        // Close button is the only focusable element in the panel —
        // trap Tab to keep focus inside the dialog while open.
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      previous?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-labelledby={node ? `panel-${node.id}-title` : undefined}
      >
        {node ? (
          <>
            <div className={styles.panelHeader}>
              <h2
                id={`panel-${node.id}-title`}
                className={styles.panelTitle}
              >
                {node.title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                className={styles.panelClose}
                onClick={onClose}
                aria-label="Close detail panel"
              >
                ×
              </button>
            </div>

            <span
              className={`${styles.panelBadge} ${badgeClass[node.status]}`}
            >
              {badgeLabel[node.status]}
            </span>

            <p className={styles.panelDescription}>{node.description}</p>

            {node.repoPath ? (
              <p className={styles.panelRepo}>{node.repoPath}</p>
            ) : null}
          </>
        ) : null}
      </aside>
    </>
  );
}

DetailPanel.displayName = 'DetailPanel';

export default DetailPanel;
