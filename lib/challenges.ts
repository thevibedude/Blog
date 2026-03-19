export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Unhinged';
export type ChallengeStatus = 'active' | 'completed' | 'failed';

export interface Challenge {
  slug: string;
  title: string;
  description: string;
  issued_by: string;
  difficulty: Difficulty;
  status: ChallengeStatus;
  started_date: string;
  completed_date?: string;
  time_limit?: string;
  outcome?: string;
  linked_blog_slug?: string;
  linked_build_log_slugs?: string[];
}

export const challenges: Challenge[] = [
  {
    slug: 'build-landing-page-3h',
    title: 'Build a landing page in 3 hours',
    description: 'Complete designing and coding a high-quality landing page from scratch for a new concept.',
    issued_by: 'Self',
    difficulty: 'Hard',
    status: 'active',
    started_date: '2026-03-12',
    time_limit: '3 hours',
  },
];
