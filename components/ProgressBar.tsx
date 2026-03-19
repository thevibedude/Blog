'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ progress, label, className, size = 'md' }: ProgressBarProps) {
  const barsCount = 10;
  const filledBars = Math.floor((progress / 100) * barsCount);

  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {label && (
        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-text-tertiary">
          <span>{label}</span>
          <span className="text-accent">{progress}%</span>
        </div>
      )}
      <div className="flex items-center space-x-1 font-mono text-xl sm:text-2xl tracking-tighter sm:tracking-normal overflow-hidden h-6">
        <span className="text-text-tertiary opacity-50 select-none">[</span>
        <div className="flex space-x-0.5">
          {Array.from({ length: barsCount }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                'w-[8px] sm:w-[12px] h-[16px] sm:h-[20px] rounded-sm transition-all duration-500',
                i < filledBars
                  ? 'bg-accent shadow-[0_0_10px_rgba(232,105,58,0.4)]'
                  : 'bg-bg-tertiary'
              )}
            />
          ))}
        </div>
        <span className="text-text-tertiary opacity-50 select-none">]</span>
      </div>
    </div>
  );
}
