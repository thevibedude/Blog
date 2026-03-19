'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.replace('H', '')),
      }));
    setItems(headings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -80% 0%' }
    );

    document.querySelectorAll('h2, h3').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="flex flex-col space-y-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted mb-2">
        Table of Contents
      </span>
      <ul className="space-y-3">
        {items.map((item) => (
          <li 
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "text-xs font-inter transition-all hover:text-accent",
                activeId === item.id ? "text-accent border-l-2 border-accent pl-2" : "text-text-muted"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
