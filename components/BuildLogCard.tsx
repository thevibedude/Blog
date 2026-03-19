import React from 'react';
import { Calendar, Hammer, Rocket, Trophy, ArrowRight } from 'lucide-react';
import { BuildLogEntry } from '@/lib/buildLogs';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function BuildLogCard({ entry }: { entry: BuildLogEntry }) {
  const statusConfig = {
    'in-progress': { icon: Hammer, color: "text-[var(--text-accent)]", bg: "bg-[var(--bg-tertiary)]" },
    'shipped': { icon: Rocket, color: "text-[var(--text-accent)]", bg: "bg-[var(--bg-tertiary)]" },
    'milestone': { icon: Trophy, color: "text-[var(--text-accent)]", bg: "bg-[var(--bg-tertiary)]" },
  };

  const { icon: StatusIcon, color, bg } = statusConfig[entry.status];

  return (
    <div className="relative group border-l-2 border-border pl-8 pb-12 last:pb-0">
      {/* Timeline Dot */}
      <div className={cn(
        "absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-background z-10 transition-colors duration-300 group-hover:bg-accent",
        entry.status === 'shipped' ? "bg-[var(--bg-tertiary)]" : "bg-[var(--bg-tertiary)]"
      )} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-text-muted bg-surface py-1 px-3 rounded-md border border-border/50">
            {formatDate(entry.date)}
          </span>
          <span className={cn(
            "text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-widest border border-border/30",
            entry.project === 'SnapSense AI' ? "bg-accent text-bg-primary" : cn(bg, color)
          )}>
            {entry.project}
          </span>
        </div>
        <div className="text-2xl" role="img" aria-label="mood">
          {entry.mood}
        </div>
      </div>

      <div className="bg-card border border-border p-6 rounded-2xl group-hover:border-accent/40 transition-colors">
        <div className="flex items-start space-x-4">
          <div className={cn("p-2 rounded-lg mt-1", bg)}>
            <StatusIcon className={cn("h-5 w-5", color)} />
          </div>
          <div className="flex flex-col space-y-4 flex-grow">
            <p className="text-foreground/90 font-inter text-sm leading-relaxed">
              {entry.content}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/10">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-accent)] font-mono flex items-center">
                  <Rocket className="h-3 w-3 mr-2" /> What Shipped
                </span>
                <p className="text-text-muted text-xs leading-relaxed">{entry.whatShipped}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-accent)] font-mono flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> What&apos;s Next
                </span>
                <p className="text-text-muted text-xs leading-relaxed">{entry.whatsNext}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
