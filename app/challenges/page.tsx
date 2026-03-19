import { Metadata } from 'next';
import { ChallengeDashboard } from '@/components/ChallengeDashboard';
import { Target } from 'lucide-react';
import { getChallenges } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Challenges',
  description: 'Gamified build goals issued by myself and the community.',
};

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <div className="px-6 sm:px-12 py-16 max-w-7xl mx-auto w-full">
      <header className="mb-20">
        <div className="flex items-center space-x-3 text-amber-accent mb-4">
          <Target className="h-5 w-5" />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">Missions</span>
        </div>
        <h1 className="mb-4 tracking-tighter">Challenges</h1>
        <p className="text-text-muted font-inter max-w-2xl text-lg">
          I thrive on constraints. These are challenges I&apos;ve taken on to push my limits, issued by myself or you.
        </p>
      </header>

      <ChallengeDashboard challenges={challenges} />
    </div>
  );
}
