import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Info, AlertTriangle, Lightbulb, Copy } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from './CodeBlock';
import { BlogImage } from './BlogImage';

const Callout = ({ type, children }: { type: 'note' | 'warning' | 'tip'; children: React.ReactNode }) => {
  const styles = {
    note:    { bg: 'bg-[var(--bg-tertiary)]', border: 'border-[var(--border-accent)]/20', text: 'text-[var(--text-accent)]', icon: Info },
    warning: { bg: 'bg-accent/5', border: 'border-accent/20', text: 'text-accent', icon: AlertTriangle },
    tip:     { bg: 'bg-[var(--bg-tertiary)]', border: 'border-[var(--border-accent)]/20', text: 'text-[var(--text-accent)]', icon: Lightbulb },
  };

  const { bg, border, text, icon: Icon } = styles[type];

  return (
    <div className={`my-8 flex items-start p-6 rounded-2xl border ${bg} ${border}`}>
      <div className={`p-2 rounded-lg mr-4 bg-bg-tertiary border ${border}`}>
        <Icon className={`h-5 w-5 ${text}`} />
      </div>
      <div className="flex-grow prose prose-invert max-w-none prose-p:my-0">
        {children}
      </div>
    </div>
  );
};

const components = {
  h1: (props: any) => <h1 className="text-4xl font-mono tracking-tighter mt-12 mb-6 text-text-primary" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-mono tracking-tighter mt-10 mb-4 border-b border-border/50 pb-2 text-text-primary" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-mono tracking-tighter mt-8 mb-4 text-text-primary" {...props} />,
  p:  (props: any) => <p className="font-serif text-lg leading-relaxed text-text-secondary mb-6" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside space-y-2 mb-6 font-serif text-text-secondary" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside space-y-2 mb-6 font-serif text-text-secondary" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-[3px] border-accent pl-6 py-2 my-8 italic font-serif text-xl text-text-primary/80 bg-bg-secondary rounded-r-xl"
      {...props}
    />
  ),
  a: (props: any) => (
    <Link
      href={props.href}
      className="text-text-accent underline decoration-accent/20 underline-offset-4 hover:decoration-accent hover:text-accent transition-all"
      {...props}
    />
  ),
  BlogImage,
  img: (props: any) => (
    <BlogImage src={props.src} alt={props.alt || ''} />
  ),
  pre: (props: any) => (
    <div className="relative my-6 rounded-xl overflow-hidden" style={{ background: '#1C0F0C', borderLeft: '3px solid var(--accent)' }}>
      <CodeBlock {...props} />
    </div>
  ),
  Callout,
};

export function MDXRenderer({ source, options }: { source: string; options?: any }) {
  // Pre-process GitHub alerts
  let processedSource = source || '';

  const rules = [
    { type: 'note',    regex: /(?:^|\n)> \[!NOTE\]\s*\n((?:>.*\n?)*)/gi },
    { type: 'warning', regex: /(?:^|\n)> \[!WARNING\]\s*\n((?:>.*\n?)*)/gi },
    { type: 'tip',     regex: /(?:^|\n)> \[!TIP\]\s*\n((?:>.*\n?)*)/gi },
  ];

  rules.forEach(({ type, regex }) => {
    processedSource = processedSource.replace(regex, (match, content) => {
      const cleanContent = content.replace(/^>\s?/gm, '');
      return `\n<Callout type="${type}">\n\n${cleanContent}\n\n</Callout>\n`;
    });
  });

  return (
    <div className="mdx-content text-text-primary">
      <MDXRemote source={processedSource} components={components} options={options} />
    </div>
  );
}
