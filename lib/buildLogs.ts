export interface BuildLogEntry {
  slug: string;
  date: string;
  project: string;
  status: 'in-progress' | 'shipped' | 'milestone';
  mood: string;
  content: string; // The MDX content will be here later
  whatShipped: string;
  whatsNext: string;
}

export const buildLogs: BuildLogEntry[] = [
  {
    slug: 'snapsense-ai-initial-concept',
    date: '2026-03-19',
    project: 'SnapSense AI',
    status: 'in-progress',
    mood: '🧠',
    content: 'Brainstorming the core interaction model for SnapSense.',
    whatShipped: 'Initial architectural diagrams.',
    whatsNext: 'Defining the tech stack and setting up the monorepo.',
  },
];
