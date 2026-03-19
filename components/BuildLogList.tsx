'use client';

import React, { useState, useMemo } from 'react';
import { BuildLogEntry } from '@/lib/buildLogs';
import { BuildLogCard } from '@/components/BuildLogCard';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

export function BuildLogList({ logs }: { logs: BuildLogEntry[] }) {
  const [filter, setFilter] = useState<'All' | 'SnapSense AI'>('All');

  const filteredLogs = useMemo(() => {
    if (filter === 'All') return logs;
    return logs.filter(log => log.project === filter);
  }, [logs, filter]);

  const projects = ['All', 'SnapSense AI'];

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex space-x-2 p-1 bg-surface border border-border rounded-2xl w-fit">
        {projects.map((proj) => (
          <button
            key={proj}
            onClick={() => setFilter(proj as any)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-[0.2em] transition-all",
              filter === proj 
                ? "bg-card text-accent border border-accent/20 shadow-[0_0_20px_rgba(0,245,212,0.1)]" 
                : "text-text-muted hover:text-foreground"
            )}
          >
            {proj}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-4xl pt-10">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((entry) => (
            <BuildLogCard key={entry.slug} entry={entry} />
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-border rounded-3xl">
            <p className="text-text-muted font-mono uppercase tracking-widest text-xs">No entries for this project yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
