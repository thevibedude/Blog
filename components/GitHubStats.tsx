'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { Github, Star, GitFork, Book, Code2, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

function Counter({ value, label, icon: Icon }: { value: number, label: string, icon: any }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const animation = animate(0, value, {
      duration: 2,
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => animation.stop();
  }, [value]);

  return (
    <div className="flex flex-col items-center p-6 bg-card border border-border rounded-xl group hover:border-accent transition-colors">
      <div className="p-3 bg-surface rounded-lg mb-4 text-text-muted group-hover:text-accent group-hover:bg-accent/5 transition-all">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-3xl font-mono font-bold text-foreground mb-1">{count}</span>
      <span className="text-[10px] uppercase tracking-widest text-text-muted">{label}</span>
    </div>
  );
}

function StatsContent({ statsPromise }: { statsPromise: Promise<any> }) {
  const stats = React.use(statsPromise);

  const statsList = [
    { label: 'Repos', value: stats.publicRepos, icon: Book },
    { label: 'Followers', value: stats.followers, icon: Star },
    { label: 'Top Langs', value: stats.topLanguages.length, icon: Code2 },
    { label: 'Commits (W)', value: stats.commitsThisWeek, icon: Activity },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {statsList.map((stat) => (
        <Counter key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-card border border-border rounded-xl" />
      ))}
    </div>
  );
}

export function GitHubStats({ statsPromise }: { statsPromise: Promise<any> }) {
  return (
    <section className="home-section px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col mb-14">
        <p className="section-label">// activity</p>
        <div className="flex items-center space-x-4">
          <Github className="h-5 w-5 text-accent" />
          <h2 className="text-foreground tracking-tighter text-xl sm:text-2xl">GitHub Stats</h2>
          <div className="h-px bg-border flex-grow mt-1 opacity-20" />
        </div>
      </div>

      <Suspense fallback={<Skeleton />}>
        <StatsContent statsPromise={statsPromise} />
      </Suspense>

      {/* Language Tags */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {['TypeScript', 'Rust', 'Go', 'Python', 'Next.js'].map(lang => (
          <span key={lang} className="tag-pill hover:bg-accent/5 hover:text-accent transition-colors">
            {lang}
          </span>
        ))}
      </div>
    </section>
  );
}
