import type { WorkflowLayer } from './WorkflowMap.types';

export const layers: WorkflowLayer[] = [
  {
    id: 'input',
    label: '01 / input',
    nodes: [
      {
        id: 'voice',
        title: 'Voice',
        subtitle: 'say "stack"',
        status: 'live',
        description:
          'Trigger the voice session skill. Claude fetches context silently and presents the agenda.',
      },
      {
        id: 'written',
        title: 'Written',
        subtitle: '[TYPE][LINKS][CONTEXT]',
        status: 'live',
        description:
          'Structured written input. Use [TYPE] QUESTIONS/FEEDBACK/IDEAS/ACTIONS/PARKED format.',
      },
      {
        id: 'vercel-ui',
        title: 'Vercel UI',
        subtitle: 'form / voice submission',
        status: 'planned',
        isDashed: true,
        repoPath: '— coming soon',
        description:
          'Private form-based UI on Vercel. Submit text or voice notes without opening Claude directly.',
      },
    ],
  },
  {
    id: 'skills',
    label: '02 / skill activation',
    tint: '#7C3AED',
    nodes: [
      {
        id: 'voice-skill',
        title: 'session-starter-voice.md',
        subtitle: 'trigger "stack" · prompters → cleanup',
        status: 'live',
        repoPath: 'skills/meta/session-starter-voice.md',
        description:
          'Voice session skill. Activates on the word "stack". Runs spoken prompters one at a time, cleans transcript, produces categorised output.',
      },
      {
        id: 'written-skill',
        title: 'session-starter.md',
        subtitle: 'read → categorise → map',
        status: 'live',
        repoPath: 'skills/meta/session-starter.md',
        description:
          'Written session skill. Fetches 6 repo sources silently, presents agenda, asks one question at a time.',
      },
      {
        id: 'claude-md',
        title: '~/.claude/CLAUDE.md',
        subtitle: 'local skill loader',
        status: 'live',
        description:
          'Local Claude configuration. Maps the "stack" trigger to the voice skill. Runs on Claude Code CLI.',
      },
    ],
  },
  {
    id: 'processing',
    label: '03 / processing',
    tint: '#F59E0B',
    nodes: [
      {
        id: 'fetch',
        title: 'Pre-session fetch',
        subtitle: 'gtmstack.ai + 6 repo sources',
        status: 'live',
        description:
          'Silent fetch at session open. Reads live site, README, ADR, build log, voice.md, and last session file.',
      },
      {
        id: 'tracker',
        title: '1-2-1 tracker lookup',
        subtitle: 'open actions · parked · ADRs',
        status: 'planned',
        isDashed: true,
        repoPath: '— Airtable (coming soon)',
        description:
          'Queries Airtable for open actions, parked items, ADR conflicts, and last session summary.',
      },
      {
        id: 'personas',
        title: '3 personas',
        subtitle: '🟢 Marketing · 🔵 Technical · ⚫ Business',
        status: 'live',
        description:
          'Every output block is reviewed through three lenses: CMO Series C, senior full-stack / DevOps / AI, and tech CEO.',
      },
    ],
  },
  {
    id: 'output',
    label: '04 / output',
    tint: '#22C55E',
    nodes: [
      {
        id: 'categorised',
        title: 'Categorised output',
        subtitle: '[Category] | [Persona] | [Priority] → repo impact',
        status: 'live',
        isWide: true,
        description:
          'Every session decision captured as a structured block. Categories: Review, Create Task, FYI, Fix, Decision, Parked. Max 30 words per block.',
      },
    ],
  },
  {
    id: 'session-close',
    label: '05 / session close',
    nodes: [
      {
        id: 'commit-file',
        title: 'session-NNN.md',
        subtitle: 'engine/sessions/ · commit block',
        status: 'live',
        repoPath: 'engine/sessions/',
        description:
          'Commit-ready session file. Topics, decisions, repo impacts, tasks, parked items, assets generated.',
      },
      {
        id: 'assets',
        title: 'Asset generation',
        subtitle: 'diagram · mind map · personas recommend',
        status: 'live',
        description:
          'At session close, all three personas recommend one asset each. Matt approves which to generate.',
      },
      {
        id: 'email',
        title: 'Email delivery',
        subtitle: 'decisions · actions · matt@gtmstack.ai',
        status: 'live',
        description:
          'Session summary emailed via Gmail MCP. Includes decisions, actions, assets, and GitHub link.',
      },
    ],
  },
  {
    id: 'airtable',
    label: '06 / airtable data layer',
    isContainer: true,
    containerLabel: 'gtmstack — source of truth',
    nodes: [
      {
        id: 'at-sessions',
        title: 'Sessions',
        subtitle: 'transcript · summary · date',
        status: 'planned',
        isDashed: true,
        description:
          'All session transcripts and summaries. Feeds ElevenLabs and content engine.',
      },
      {
        id: 'at-actions',
        title: 'Actions',
        subtitle: 'task · priority · status',
        status: 'planned',
        isDashed: true,
        description:
          'All tasks with priority and owner. Pre-session fetch queries this for open items.',
      },
      {
        id: 'at-frequency',
        title: 'Frequency',
        subtitle: 'cadence · nudges · 7-day alert',
        status: 'planned',
        isDashed: true,
        description:
          'Session cadence monitoring. Auto-nudge fires after 7-day gap via Gmail MCP.',
      },
      {
        id: 'at-upvotes',
        title: 'Upvotes',
        subtitle: 'ideas · priorities',
        status: 'planned',
        isDashed: true,
        description:
          'Community upvoting for ideas and priorities. Served on gtmstack.ai.',
      },
    ],
  },
  {
    id: 'github',
    label: '07 / github',
    isContainer: true,
    containerLabel: 'Marketing-Matt/gtmstack',
    nodes: [
      {
        id: 'gh-sessions',
        title: 'engine/sessions/',
        subtitle: 'commit logs',
        status: 'live',
        repoPath: 'engine/sessions/',
        description:
          'All session commit files. Source of truth for session history.',
      },
      {
        id: 'gh-buildlog',
        title: 'content/build-log/',
        subtitle: 'build log entries',
        status: 'live',
        repoPath: 'content/build-log/',
        description:
          'Chronological build log. Every session produces an entry.',
      },
      {
        id: 'gh-skills',
        title: 'skills/meta/',
        subtitle: 'skill files',
        status: 'live',
        repoPath: 'skills/meta/',
        description:
          'All session skill .md files. Loaded locally and in Claude Projects.',
      },
      {
        id: 'gh-brand',
        title: 'brand/assets/',
        subtitle: 'diagrams · visuals',
        status: 'live',
        repoPath: 'brand/assets/',
        description:
          'Brand assets including this diagram. Version-controlled.',
      },
    ],
  },
  {
    id: 'content-engine',
    label: '08 / content engine + gtmstack.ai',
    nodes: [
      {
        id: 'linkedin',
        title: 'LinkedIn',
        subtitle: 'posts',
        status: 'planned',
        isDashed: true,
        description:
          'Session decisions extracted as LinkedIn posts via content skill.',
      },
      {
        id: 'beehiiv',
        title: 'Beehiiv',
        subtitle: 'newsletter',
        status: 'in-progress',
        description:
          'Weekly newsletter generated from session build log entries.',
      },
      {
        id: 'elevenlabs',
        title: 'ElevenLabs',
        subtitle: 'audio content',
        status: 'planned',
        isDashed: true,
        description:
          'Session transcripts from Airtable converted to audio via ElevenLabs API.',
      },
      {
        id: 'gtmstackai',
        title: 'gtmstack.ai',
        subtitle: 'skill cards · build log · upvoting · dashboard',
        status: 'live',
        isWide: true,
        description:
          'Primary destination for all session output. Skill cards, build log, upvoting, and session frequency dashboard.',
      },
    ],
  },
];
