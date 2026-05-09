'use client';

import styles from '../WorkflowMap.module.css';
import type { WorkflowLayer, WorkflowNode } from '../WorkflowMap.types';
import { NodeCard } from './NodeCard';

interface Props {
  layer: WorkflowLayer;
  isCollapsed: boolean;
  onToggle: (layerId: string) => void;
  onNodeClick: (node: WorkflowNode) => void;
  activeNodeId: string | null;
}

export function LayerRow({
  layer,
  isCollapsed,
  onToggle,
  onNodeClick,
  activeNodeId,
}: Props) {
  const tintStyle = layer.tint ? { color: layer.tint } : undefined;

  const grid = (
    <div className={styles.grid}>
      {layer.nodes.map((node) => (
        <NodeCard
          key={node.id}
          node={node}
          isActive={activeNodeId === node.id}
          onClick={onNodeClick}
        />
      ))}
    </div>
  );

  return (
    <section className={styles.layer} aria-labelledby={`layer-${layer.id}`}>
      <button
        type="button"
        id={`layer-${layer.id}`}
        className={styles.layerHeader}
        aria-expanded={!isCollapsed}
        aria-controls={`layer-body-${layer.id}`}
        onClick={() => onToggle(layer.id)}
      >
        <span className={styles.layerPrefix}>&gt;_</span>
        {layer.tint ? (
          <span className={styles.layerTint} style={tintStyle} aria-hidden />
        ) : null}
        <span className={styles.layerLabel}>{layer.label}</span>
        {isCollapsed ? (
          <span className={styles.layerCount}>
            [{layer.nodes.length} nodes]
          </span>
        ) : null}
        <span className={styles.layerToggle} aria-hidden>
          {isCollapsed ? '▸' : '▾'}
        </span>
      </button>

      {!isCollapsed ? (
        <div id={`layer-body-${layer.id}`} className={styles.layerBody}>
          {layer.isContainer ? (
            <div className={styles.containerWrap}>
              {layer.containerLabel ? (
                <p className={styles.containerLabel}>{layer.containerLabel}</p>
              ) : null}
              {grid}
            </div>
          ) : (
            grid
          )}
        </div>
      ) : null}
    </section>
  );
}

LayerRow.displayName = 'LayerRow';
