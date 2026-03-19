'use client';

import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, Filter, X } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { BlogCard } from './BlogCard';
import { cn } from '@/lib/utils';

interface BlogListProps {
  posts: BlogPost[];
}

const TAGS = ['Thoughts', 'Dev Logs', 'Product', 'AI', 'Life'];

export function BlogList({ posts }: BlogListProps) {
  const [fuse, setFuse] = useState<Fuse<BlogPost> | null>(null);
  const [query, setQuery] = useState('');
  const [ready, setReady] = useState(false);
  const [searchResults, setSearchResults] = useState<BlogPost[] | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  React.useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json())
      .then((data: BlogPost[]) => {
        setFuse(new Fuse(data, {
          keys: [
            { name: 'title', weight: 0.6 },
            { name: 'excerpt', weight: 0.3 },
            { name: 'tags', weight: 0.1 },
          ],
          threshold: 0.35,
          includeScore: true,
        }));
        setReady(true);
      })
      .catch((err) => {
        console.error('Failed to load search index', err);
        setReady(false);
      });
  }, []);

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      setQuery(q);

      if (!fuse || q.trim() === '') {
        setSearchResults(null);
        return;
      }

      const results = fuse
        .search(q)
        .map(r => r.item);

      setSearchResults(results);
    },
    [fuse]
  );

  const displayedPosts = React.useMemo(() => {
    let result = searchResults !== null ? searchResults : posts;

    if (selectedTag) {
      result = result.filter(post => 
        post.tags?.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()))
      );
    }

    return result;
  }, [posts, searchResults, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Search and Filter bar */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-surface border border-border p-6 rounded-2xl">
        <div className="search-container relative w-full md:max-w-md group bg-transparent border-none p-0 m-0">
          <span className="search-prompt hidden">$</span>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-[var(--accent)] transition-colors" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder={ready ? 'Search posts...' : 'Loading index...'}
            disabled={!ready}
            spellCheck={false}
            className="w-full bg-card border border-border/50 rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-[var(--accent)]/40 transition-all font-inter"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSearchResults(null);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-[var(--accent)] text-lg"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all",
                selectedTag === tag 
                  ? "bg-accent text-black border-accent" 
                  : "bg-card border-border/50 text-text-muted hover:border-accent/40 hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {displayedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-border rounded-3xl">
          <p className="text-text-muted font-mono">No posts found matching your criteria.</p>
          <button 
            onClick={() => {setQuery(''); setSearchResults(null); setSelectedTag(null);}}
            className="mt-4 text-accent hover:underline font-mono text-xs uppercase tracking-widest"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
