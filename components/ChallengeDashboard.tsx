'use client';

import React, { useState, useMemo } from 'react';
import { ChallengeCard } from '@/components/ChallengeCard';
import { cn } from '@/lib/utils';
import { Plus, Target, Users } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export function ChallengeDashboard({ challenges }: { challenges: any[] }) {
  const [activeTab, setActiveTab] = useState<'my' | 'follower'>('my');

  const filteredChallenges = useMemo(() => {
    if (activeTab === 'my') {
      return challenges.filter(c => c.issued_by === 'Self');
    }
    return challenges.filter(c => c.issued_by !== 'Self');
  }, [activeTab]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex space-x-2 p-1 bg-surface border border-border rounded-2xl">
          <button
            onClick={() => setActiveTab('my')}
            className={cn(
              "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition-all",
              activeTab === 'my' 
                ? "bg-card text-accent border border-accent/20" 
                : "text-text-muted hover:text-foreground"
            )}
          >
            <Target className="h-3.5 w-3.5" />
            <span>My Challenges</span>
          </button>
          <button
            onClick={() => setActiveTab('follower')}
            className={cn(
              "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition-all",
              activeTab === 'follower' 
                ? "bg-card text-accent border border-accent/20" 
                : "text-text-muted hover:text-foreground"
            )}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Follower Challenges</span>
          </button>
        </div>

        <a
          href={siteConfig.challengeFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-6 py-3 bg-accent text-black rounded-xl text-xs font-mono font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Submit a Challenge</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.slug} challenge={challenge} />
          ))
        ) : (
          <div className="col-span-full py-32 text-center border border-dashed border-border rounded-3xl">
            <p className="text-text-muted font-mono uppercase tracking-[0.2em] text-xs">No challenges found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
