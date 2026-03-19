'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, AlertTriangle, Zap, CheckCircle, XCircle } from 'lucide-react';
import { Challenge, ChallengeStatus, Difficulty, challenges } from '@/lib/challenges';
import { cn } from '@/lib/utils';

const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
  if (difficulty === 'Unhinged') {
    return (
      <span
        className={cn('tag-pill animate-pulse')}
        style={{ background: '#3D1A5C', color: '#C4B5FD', borderColor: '#7C3AED40' }}
      >
        {difficulty}
      </span>
    );
  }

  return (
    <span className="tag-pill">
      {difficulty}
    </span>
  );
};

const StatusBadge = ({ status }: { status: ChallengeStatus }) => {
  const icons = {
    active:    <Zap className="h-3 w-3 mr-1" />,
    completed: <CheckCircle className="h-3 w-3 mr-1" />,
    failed:    <XCircle className="h-3 w-3 mr-1" />,
  };

  // Brand-specified badge styles
  const badgeStyle: Record<ChallengeStatus, React.CSSProperties> = {
    active:    { background: '#E8693A', color: '#12080A' },
    completed: { background: '#2E5E3E', color: '#86EFAC' },
    failed:    { background: '#5C1A1A', color: '#FCA5A5' },
  };

  return (
    <span
      className="inline-flex items-center text-[10px] font-mono uppercase tracking-widest border py-1 px-2.5 rounded-md border-transparent"
      style={badgeStyle[status]}
    >
      {icons[status]}
      {status}
    </span>
  );
};

export function ChallengeCard({ challenge, featured = false }: { challenge: Challenge; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        'group relative flex flex-col p-8 rounded-2xl border transition-all duration-300',
        featured
          ? 'bg-bg-secondary border-border-accent/40 hover:border-border-accent overflow-hidden'
          : 'bg-bg-secondary border-border hover:border-border-accent'
      )}
    >
      {/* Decorative coral glow for featured card */}
      {featured && (
        <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] -z-10 group-hover:opacity-60 transition-opacity"
          style={{ background: 'rgba(232,105,58,0.12)' }}
        />
      )}

      <div className="flex justify-between items-start mb-6">
        <StatusBadge status={challenge.status} />
        <DifficultyBadge difficulty={challenge.difficulty} />
      </div>

      <h3
        className={cn(
          'font-mono tracking-tighter mb-3 transition-colors',
          featured
            ? 'text-2xl sm:text-3xl text-text-primary group-hover:text-accent'
            : 'text-xl text-text-primary group-hover:text-accent'
        )}
      >
        {challenge.title}
      </h3>

      <p className="text-text-secondary text-sm font-sans mb-8 line-clamp-3">
        {challenge.description || (challenge as any).content}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-border/20">
        <div className="flex items-center text-[11px] font-mono text-text-tertiary">
          <User className="h-3.5 w-3.5 mr-2 text-accent/60" />
          <span className="truncate">{challenge.issued_by}</span>
        </div>
        {challenge.time_limit && (
          <div className="flex items-center text-[11px] font-mono text-text-tertiary">
            <Clock className="h-3.5 w-3.5 mr-2 text-accent/60" />
            <span>{challenge.time_limit}</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        <div className="text-accent font-mono text-xs flex items-center">
          view log <span className="ml-2">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export function ActiveChallengeBanner() {
  const activeChallenge = challenges.find(c => c.status === 'active');

  if (!activeChallenge) return null;

  return (
    <section className="home-section px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col mb-10">
        <p className="section-label">// active challenge</p>
        <div className="flex items-center space-x-4">
          <AlertTriangle className="h-5 w-5 text-accent" />
          <h2 className="text-text-primary tracking-tighter text-xl sm:text-2xl">Active Challenge</h2>
          <div className="h-px bg-border-accent flex-grow mt-1 opacity-20" />
        </div>
      </div>

      <ChallengeCard challenge={activeChallenge} featured={true} />
    </section>
  );
}
