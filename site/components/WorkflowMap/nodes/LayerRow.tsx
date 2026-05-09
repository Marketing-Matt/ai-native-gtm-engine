'use client';

import styles from '../WorkflowMap.module.css';
import type {
  FilterId,
  LayerCols,
  LayerTint,
  WorkflowLayer,
  WorkflowNode,
} from '../WorkflowMap.types';
import { NodeCard } from './NodeCard';

interface Props {
  layer: WorkflowLayer;
  filter: FilterId;
  focusedKey: string | null;
  onSelect: (node: WorkflowNode, layerId: string, layerName: string) => void;
}

const colsClass: Record<LayerCols, string> = {
  1: styles.cols1 ?? '',
  3: styles.cols3 ?? '',
  4: styles.cols4 ?? '',
  'last-2x': styles.colsLast2x ?? '',
};

const tintClass: Record<LayerTint, string> = {
  violet: styles.tintViolet ?? '',
  amber: styles.tintAmber ?? '',
  green: styles.tintGreen ?? '',
};

export function LayerRow({ layer, filter, focusedKey, onSelect }: Props) {
  const liveCount = layer.nodes.filter((n) => n.status === 'live').length;
  const total = layer.nodes.length;

  const grid = (
    <div className={`${styles.nodes} ${colsClass[layer.cols]}`}>
      {layer.nodes.map((node) => {
        const dimmed = filter !== 'all' && node.status !== filter;
        const key = `${layer.id}/${node.id}`;
        return (
          <NodeCard
            key={node.id}
            node={node}
            layerId={layer.id}
            layerName={layer.name}
            dimmed={dimmed}
            focused={focusedKey === key}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );

  const bodyClassName = [
    styles.layerBody,
    layer.tint ? tintClass[layer.tint] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={styles.layer}
      aria-labelledby={`layer-${layer.id}-label`}
    >
      <div className={styles.layerHead}>
        <span
          id={`layer-${layer.id}-label`}
          className={`${styles.tLabel} ${styles.layerLabel}`}
        >
          &gt;_ {layer.id} / {layer.name}
        </span>
        <span className={styles.layerMeta}>
          {liveCount}/{total} live
        </span>
      </div>
      <div className={styles.layerRule} aria-hidden />
      <div className={bodyClassName}>
        {layer.container ? (
          <div className={styles.container}>
            {layer.containerHref ? (
              <a
                className={styles.containerLabel}
                href={layer.containerHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {layer.container} ↗
              </a>
            ) : (
              <span className={styles.containerLabel}>{layer.container}</span>
            )}
            {grid}
          </div>
        ) : (
          grid
        )}
      </div>
    </section>
  );
}

LayerRow.displayName = 'LayerRow';
