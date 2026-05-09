'use client';

import { useEffect, useRef } from 'react';
import styles from '../WorkflowMap.module.css';
import type { WorkflowNode } from '../WorkflowMap.types';

export interface FocusedNode extends WorkflowNode {
  layerId: string;
  layerName: string;
}

interface Props {
  node: FocusedNode | null;
  onClose: () => void;
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
    <span className={`${styles.status} ${statusClass[status]}`}>
      <span className={styles.statusDot} aria-hidden />
      {statusText[status]}
    </span>
  );
}

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
        className={`${styles.panelOverlay} ${
          isOpen ? styles.panelOverlayOpen : ''
        }`}
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
            <div className={styles.panelHead}>
              <button
                ref={closeRef}
                type="button"
                className={styles.panelClose}
                onClick={onClose}
                aria-label="Close detail panel"
              >
                [ esc ] close
              </button>
              <span className={styles.panelLayer}>
                &gt;_ {node.layerId} / {node.layerName}
              </span>
              <h2
                id={`panel-${node.id}-title`}
                className={styles.panelTitle}
              >
                {node.title}
              </h2>
              <div>
                <StatusBadge status={node.status} />
              </div>
            </div>

            <div className={styles.panelBody}>
              <div className={styles.panelRow}>
                <span className={styles.panelKey}># description</span>
                <p className={styles.panelValue}>{node.sub}</p>
              </div>

              {node.path ? (
                <div className={styles.panelRow}>
                  <span className={styles.panelKey}># path</span>
                  <p
                    className={`${styles.panelValue} ${styles.panelValueMono}`}
                  >
                    {node.path}
                  </p>
                </div>
              ) : null}

              {node.github ? (
                <div className={styles.panelRow}>
                  <span className={styles.panelKey}># github</span>
                  <a
                    className={styles.panelLink}
                    href={node.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.github} ↗
                  </a>
                </div>
              ) : null}

              {node.note ? (
                <div className={styles.panelRow}>
                  <span className={styles.panelKey}># note</span>
                  <p
                    className={`${styles.panelValue} ${styles.panelValueMono} ${styles.panelValueLime}`}
                  >
                    {node.note}
                  </p>
                </div>
              ) : null}

              <div className={styles.panelRow}>
                <span className={styles.panelKey}># layer</span>
                <p
                  className={`${styles.panelValue} ${styles.panelValueMono} ${styles.panelValueMuted}`}
                >
                  layer {node.layerId} — {node.layerName}
                </p>
              </div>

              <div className={styles.panelRow}>
                <span className={styles.panelKey}># node id</span>
                <p
                  className={`${styles.panelValue} ${styles.panelValueMono} ${styles.panelValueMuted}`}
                >
                  {node.id}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </>
  );
}

DetailPanel.displayName = 'DetailPanel';

export default DetailPanel;
