'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './WorkflowMap.module.css';
import { layers } from './WorkflowMap.data';
import type { WorkflowNode } from './WorkflowMap.types';
import { LayerRow } from './nodes/LayerRow';

const DetailPanel = dynamic(
  () => import('./nodes/DetailPanel').then((mod) => mod.DetailPanel),
  { ssr: false },
);

interface WorkflowMapProps {
  className?: string;
}

const THEME_KEY = 'gtmstack-theme';

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 12 24"
      aria-hidden
      focusable="false"
    >
      <line x1="6" y1="0" x2="6" y2="20" strokeWidth="1" />
      <path d="M2 18 L6 22 L10 18" strokeWidth="1" />
    </svg>
  );
}

export function WorkflowMap({ className }: WorkflowMapProps) {
  const [activeNode, setActiveNode] = useState<WorkflowNode | null>(null);
  const [collapsedLayers, setCollapsedLayers] = useState<Set<string>>(
    () => new Set(),
  );
  // EXPERIMENTAL: light mode not brand standard.
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'light') setIsDark(false);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.removeAttribute('data-theme');
      window.localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      window.localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  const handleToggle = useCallback((layerId: string) => {
    setCollapsedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  }, []);

  const handleNodeClick = useCallback((node: WorkflowNode) => {
    setActiveNode((current) => (current?.id === node.id ? null : node));
  }, []);

  const handleClose = useCallback(() => setActiveNode(null), []);

  const rootClass = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div className={rootClass}>
      <button
        type="button"
        className={styles.themeToggle}
        onClick={() => setIsDark((v) => !v)}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-pressed={!isDark}
      >
        ◐
      </button>

      <div className={styles.container}>
        <h1 className={styles.heading}>session workflow map</h1>

        {layers.map((layer, index) => (
          <Fragment key={layer.id}>
            <LayerRow
              layer={layer}
              isCollapsed={collapsedLayers.has(layer.id)}
              onToggle={handleToggle}
              onNodeClick={handleNodeClick}
              activeNodeId={activeNode?.id ?? null}
            />
            {index < layers.length - 1 ? <Arrow /> : null}
          </Fragment>
        ))}
      </div>

      <p className={styles.footer}>
        gtmstack.ai — Unfiltered AI marketing. Built live.
      </p>

      <DetailPanel node={activeNode} onClose={handleClose} />
    </div>
  );
}

WorkflowMap.displayName = 'WorkflowMap';

export default WorkflowMap;
