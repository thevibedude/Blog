import { Metadata } from 'next';
import { BuildLogList } from '@/components/BuildLogList';
import { getBuildLogs } from '@/lib/mdx';
import { Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Build Log',
  description: 'A reverse-chronological timeline of what I am shipping, one commit at a time.',
};

export default async function BuildLogPage() {
  const logs = await getBuildLogs();

  return (
    <div className="px-6 sm:px-12 py-16 max-w-7xl mx-auto w-full">
      <header className="mb-16">
        <div className="flex items-center space-x-3 text-accent mb-4">
          <Activity className="h-5 w-5" />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">Live Feed</span>
        </div>
        <h1 className="mb-4 tracking-tighter">Build Log</h1>
        <p className="text-text-muted font-inter max-w-2xl">
          Raw updates from the trenches. Tracking progress, shipping features, and documenting the grind.
        </p>
      </header>
      
      <BuildLogList logs={logs} />
    </div>
  );
}
