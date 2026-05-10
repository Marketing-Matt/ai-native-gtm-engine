'use client';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './WorkflowMap.module.css';
import { layers } from './WorkflowMap.data';
import type {
  FilterId,
  WorkflowNode,
} from './WorkflowMap.types';
import { LayerRow } from './nodes/LayerRow';
import type { FocusedNode } from './nodes/DetailPanel';
import { PreviewAudio } from '../PreviewAudio';

const DetailPanel = dynamic(
  () => import('./nodes/DetailPanel').then((mod) => mod.DetailPanel),
  { ssr: false },
);

interface WorkflowMapProps {
  className?: string;
}

const THEME_KEY = 'gtmstack-theme';

const ALL_NODES = layers.flatMap((l) => l.nodes);

const FILTERS: ReadonlyArray<{ id: FilterId; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'planned', label: 'Planned' },
];

interface FilterChipsProps {
  filter: FilterId;
  setFilter: (id: FilterId) => void;
  counts: Record<FilterId, number>;
}

function FilterChips({ filter, setFilter, counts }: FilterChipsProps) {
  return (
    <div className={styles.chips} role="tablist" aria-label="Filter by status">
      {FILTERS.map((opt) => {
        const isActive = filter === opt.id;
        const className = `${styles.chip} ${
          isActive ? styles.chipActive : ''
        }`;
        return (
          <button
            key={opt.id}
            type="button"
            className={className}
            onClick={() => setFilter(opt.id)}
            aria-pressed={isActive}
            role="tab"
          >
            {opt.label}
            <span className={styles.chipCount}>{counts[opt.id]}</span>
          </button>
        );
      })}
    </div>
  );
}

function Arrow() {
  return (
    <div className={styles.arrow} aria-hidden>
      <span className={styles.arrowLine} />
      <span className={styles.arrowHead} />
    </div>
  );
}

export function WorkflowMap({ className }: WorkflowMapProps) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [focused, setFocused] = useState<FocusedNode | null>(null);
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

  const counts = useMemo<Record<FilterId, number>>(() => {
    const initial: Record<FilterId, number> = {
      all: ALL_NODES.length,
      live: 0,
      'in-progress': 0,
      planned: 0,
    };
    for (const node of ALL_NODES) {
      initial[node.status] += 1;
    }
    return initial;
  }, []);

  const handleSelect = useCallback(
    (node: WorkflowNode, layerId: string, layerName: string) => {
      setFocused((current) =>
        current?.id === node.id && current?.layerId === layerId
          ? null
          : { ...node, layerId, layerName },
      );
    },
    [],
  );

  const handleClose = useCallback(() => setFocused(null), []);

  const focusedKey = focused ? `${focused.layerId}/${focused.id}` : null;
  const rootClass = className
    ? `${styles.root} ${styles.page} ${className}`
    : `${styles.root} ${styles.page}`;

  return (
    <div className={rootClass}>
      <PreviewAudio
        src="/audio/session-001-build-summary.mp3"
        label=">_ build log #001 / audio summary"
        title="Listen — how the session system was built, in 2 minutes"
        note="narration: matt browning · synthesised via elevenlabs"
      />
      <header className={styles.topbar} style={{ marginTop: 32 }}>
        <div className={styles.topbarLeft}>
          <span className={styles.tLabel}>
            &gt;_ gtmstack.ai / system map / v0.2
          </span>
          <h1 className={styles.heading}>
            <span className={styles.headingPrefix}>#</span> session pipeline
            <span className={styles.cursor} aria-hidden />
          </h1>
        </div>
        <div className={styles.topbarRight}>
          <FilterChips
            filter={filter}
            setFilter={setFilter}
            counts={counts}
          />
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsDark((value) => !value)}
            aria-pressed={!isDark}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            [ {isDark ? 'light' : 'dark'} mode ]
          </button>
        </div>
      </header>

      <p className={styles.intro}>
        How a stack session actually runs. The voice trigger fires{' '}
        <code className={styles.introCode}>session-starter</code>, which
        silently fetches gtmstack.ai + 6 repo sources, cross-references your
        Google Calendar 1-2-1s, replays open actions and parked items,
        surfaces ADR conflicts and 7-day gaps, then categorises every input
        by persona — Marketing / Technical / Business — by priority and by
        repo impact. Output is a session log, generated diagrams, and an email
        of the decisions.
      </p>

      <div className={styles.meta}>
        <span>
          <span className={styles.metaPrompt}>&gt;_</span>{' '}
          <b>{ALL_NODES.length}</b> nodes
        </span>
        <span>
          <span className={styles.metaDotLive}>●</span>{' '}
          <b>{counts.live}</b> live
        </span>
        <span>
          <span className={styles.metaDotProgress}>●</span>{' '}
          <b>{counts['in-progress']}</b> in progress
        </span>
        <span>
          <span className={styles.metaDotPlanned}>●</span>{' '}
          <b>{counts.planned}</b> planned
        </span>
        <span className={styles.metaVersion}>v0.2 — built live</span>
      </div>

      {layers.map((layer, index) => (
        <Fragment key={layer.id}>
          <LayerRow
            layer={layer}
            filter={filter}
            focusedKey={focusedKey}
            onSelect={handleSelect}
          />
          {index < layers.length - 1 ? <Arrow /> : null}
        </Fragment>
      ))}

      <div className={styles.legend}>
        <div>
          <h4># status</h4>
          <ul>
            <li>
              <span className={`${styles.swatch} ${styles.swatchLime}`} /> live
              — solid border
            </li>
            <li>
              <span
                className={`${styles.swatch} ${styles.swatchDashed}`}
              />{' '}
              planned — dashed
            </li>
            <li>
              <span className={styles.swatch} /> in progress — solid grey
            </li>
          </ul>
        </div>
        <div>
          <h4># layer tints</h4>
          <ul>
            <li>
              <span
                className={`${styles.swatch} ${styles.swatchTintViolet}`}
              />{' '}
              02 / skill activation
            </li>
            <li>
              <span
                className={`${styles.swatch} ${styles.swatchTintAmber}`}
              />{' '}
              03 / processing
            </li>
            <li>
              <span
                className={`${styles.swatch} ${styles.swatchTintGreen}`}
              />{' '}
              04 / output
            </li>
          </ul>
        </div>
        <div>
          <h4># interactions</h4>
          <ul>
            <li>click node → details</li>
            <li>filter chips → dim others</li>
            <li>esc → close panel</li>
          </ul>
        </div>
      </div>

      <div className={styles.foot}>
        <em>
          *<span className={styles.footLime}>&gt;_</span> gtmstack.ai —
          Unfiltered AI marketing. Built live.*
        </em>
      </div>

      <DetailPanel node={focused} onClose={handleClose} />
    </div>
  );
}

WorkflowMap.displayName = 'WorkflowMap';

export default WorkflowMap;
