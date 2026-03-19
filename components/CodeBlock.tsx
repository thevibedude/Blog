'use client';

import React, { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent || '';
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-8 rounded-xl overflow-hidden border border-border/50 bg-[#0d1117] shadow-xl">
      <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-2 bg-surface/80 hover:bg-surface border border-border/50 rounded-lg text-text-muted hover:text-foreground backdrop-blur-sm transition-all shadow-sm"
          aria-label="Copy code"
        >
          {isCopied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <pre ref={preRef} className={cn("p-6 overflow-x-auto text-[13px] leading-relaxed font-mono", props.className)} {...props}>
        {children}
      </pre>
    </div>
  );
}
