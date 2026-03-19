import { Metadata } from 'next';
import { getNowPage } from '@/lib/mdx';
import { MDXRenderer } from '@/components/MDXRenderer';
import { Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What I am focused on right now.',
};

export default async function NowPage() {
  const now = await getNowPage();
  if (!now) notFound();

  return (
    <div className="px-6 sm:px-12 py-16 max-w-3xl mx-auto w-full">
      <header className="mb-16 border-b border-border/10 pb-8">
        <div className="flex items-center space-x-3 text-accent mb-4">
          <Clock className="h-5 w-5" />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">Status</span>
        </div>
        <h1 className="mb-2 tracking-tighter">Now</h1>
        <p className="text-text-muted font-mono text-[10px] uppercase tracking-widest">
          Last updated: {now.data.lastUpdated}
        </p>
      </header>

      <MDXRenderer source={now.content} />

      <footer className="mt-20 pt-10 border-t border-border/10">
        <p className="text-text-muted text-xs font-inter italic">
          Inspired by Derek Sivers&apos; /now page movement.
        </p>
      </footer>
    </div>
  );
}
