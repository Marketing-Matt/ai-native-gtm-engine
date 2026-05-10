import type { WorkflowLayer } from './WorkflowMap.types';

const REPO_BASE = 'https://github.com/Marketing-Matt/gtmstack';

export const layers: WorkflowLayer[] = [
  {
    id: '01',
    name: 'input',
    cols: 3,
    nodes: [
      {
        id: 'voice',
        title: 'Voice',
        sub: 'trigger session — say "stack" in Claude',
        status: 'live',
      },
      {
        id: 'written',
        title: 'Written',
        sub: '[TYPE][LINKS][CONTEXT]',
        status: 'live',
      },
      {
        id: 'vercel',
        title: 'Vercel UI',
        sub: 'form / voice submission',
        status: 'in-progress',
      },
    ],
  },
  {
    id: '02',
    name: 'skill activation',
    cols: 3,
    tint: 'violet',
    nodes: [
      {
        id: 'ssvoice',
        title: 'session-starter-voice.md',
        sub: 'trigger "stack" · prompters → cleanup',
        status: 'live',
        path: 'skills/meta/session-starter-voice.md',
        github: `${REPO_BASE}/blob/main/skills/meta/session-starter-voice.md`,
      },
      {
        id: 'ss',
        title: 'session-starter.md',
        sub: 'read → categorise → map',
        status: 'live',
        path: 'skills/meta/session-starter.md',
        github: `${REPO_BASE}/blob/main/skills/meta/session-starter.md`,
      },
      {
        id: 'claude',
        title: '~/.claude/CLAUDE.md',
        sub: 'local skill loader',
        status: 'live',
      },
    ],
  },
  {
    id: '03',
    name: 'processing',
    cols: 4,
    tint: 'amber',
    nodes: [
      {
        id: 'fetch',
        title: 'Pre-session fetch',
        sub: 'gtmstack.ai + 6 repo sources · silent',
        status: 'live',
      },
      {
        id: 'calendar',
        title: 'Google Calendar',
        sub: 'scheduled 1-2-1s · attendee · agenda\nsession mode auto-detect',
        status: 'planned',
      },
      {
        id: 'tracker',
        title: '1-2-1 tracker lookup',
        sub: 'open actions · parked items\nlast summary · ADR conflicts',
        status: 'planned',
      },
      {
        id: 'personas',
        title: '3 personas',
        sub: '🟢 Marketing · 🔵 Technical · ⚫ Business',
        status: 'live',
      },
    ],
  },
  {
    id: '04',
    name: 'output',
    cols: 1,
    tint: 'green',
    nodes: [
      {
        id: 'categorised',
        title: 'Categorised output',
        sub: '[Category] | [Persona] | [Priority]\n→ repo impact\nReview · Create Task · FYI\nFix · Decision · Parked',
        status: 'live',
      },
    ],
  },
  {
    id: '05',
    name: 'session close',
    cols: 3,
    nodes: [
      {
        id: 'session-md',
        title: 'session-NNN.md',
        sub: 'engine/sessions/ · commit block',
        status: 'live',
        path: 'engine/sessions/',
        github: `${REPO_BASE}/tree/main/engine/sessions`,
      },
      {
        id: 'assets',
        title: 'Asset generation',
        sub: 'diagram · mind map\npersonas recommend',
        status: 'live',
      },
      {
        id: 'email',
        title: 'Email delivery',
        sub: 'decisions · actions · assets\nmatt@gtmstack.ai',
        status: 'live',
      },
    ],
  },
  {
    id: '06',
    name: 'airtable data layer',
    cols: 4,
    container: 'gtmstack — source of truth',
    nodes: [
      {
        id: 'sessions',
        title: 'Sessions',
        sub: 'transcript · summary · date · mode',
        status: 'planned',
      },
      {
        id: 'actions',
        title: 'Actions',
        sub: 'task · priority · status · owner',
        status: 'planned',
      },
      {
        id: 'frequency',
        title: 'Frequency',
        sub: 'cadence · nudges · 7-day gap alert',
        status: 'planned',
      },
      {
        id: 'upvotes',
        title: 'Upvotes',
        sub: 'ideas · priorities',
        status: 'planned',
      },
    ],
  },
  {
    id: '07',
    name: 'github',
    cols: 4,
    container: 'Marketing-Matt/gtmstack',
    containerHref: REPO_BASE,
    nodes: [
      {
        id: 'engine-sessions',
        title: 'engine/sessions/',
        sub: 'commit logs',
        status: 'live',
        path: 'engine/sessions/',
        github: `${REPO_BASE}/tree/main/engine/sessions`,
      },
      {
        id: 'build-log',
        title: 'content/build-log/',
        sub: 'build log entries',
        status: 'live',
        path: 'content/build-log/',
        github: `${REPO_BASE}/tree/main/content/build-log`,
      },
      {
        id: 'skills-meta',
        title: 'skills/meta/',
        sub: 'skill files',
        status: 'live',
        path: 'skills/meta/',
        github: `${REPO_BASE}/tree/main/skills/meta`,
      },
      {
        id: 'brand-assets',
        title: 'brand/assets/',
        sub: 'diagrams · visuals',
        status: 'live',
        path: 'brand/assets/',
        github: `${REPO_BASE}/tree/main/brand/assets`,
      },
    ],
  },
  {
    id: '08',
    name: 'content engine + gtmstack.ai',
    cols: 'last-2x',
    nodes: [
      {
        id: 'linkedin',
        title: 'LinkedIn',
        sub: 'posts',
        status: 'planned',
      },
      {
        id: 'beehiiv',
        title: 'Beehiiv',
        sub: 'newsletter',
        status: 'in-progress',
      },
      {
        id: 'elevenlabs',
        title: 'ElevenLabs',
        sub: 'audio content',
        status: 'live',
      },
      {
        id: 'gtmstack',
        title: 'gtmstack.ai',
        sub: 'skill cards · build log\nupvoting · dashboard',
        status: 'live',
        feature: true,
        note: 'primary destination + feedback loop',
        github: 'https://gtmstack.ai',
      },
    ],
  },
];
