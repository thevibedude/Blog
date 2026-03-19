'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group flex flex-col bg-bg-secondary border border-border rounded-2xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300 hover:shadow-[0_10px_30px_-5px_var(--surface-glow-strong)] hover:border-border-accent"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Post Image */}
        <div className="relative aspect-video bg-bg-tertiary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-mono text-sm inline-flex items-center">
              read post <ArrowRight className="h-4 w-4 ml-2" />
            </span>
          </div>
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {/* Mini icon on card placeholder */}
              <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="opacity-30 group-hover:opacity-60 transition-opacity">
                <g transform="translate(32,32)">
                  <polygon points="0,-28 24.25,-14 24.25,14 0,28 -24.25,14 -24.25,-14" fill="#12080A" />
                  <polygon points="0,-28 24.25,-14 24.25,14 0,28 -24.25,14 -24.25,-14" fill="none" stroke="#D85A30" strokeWidth="2.5" strokeLinejoin="round" />
                  <line x1="-20" y1="20" x2="22" y2="-20" stroke="#E8693A" strokeWidth="5.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          )}
          {/* Tags on image */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="tag-pill backdrop-blur-md shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center space-x-4 text-[11px] font-mono text-text-secondary mb-4">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1.5 text-accent/60" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1.5 text-accent/60" />
              {post.readTime}
            </div>
          </div>

          <h3 className="text-xl font-mono tracking-tighter text-text-primary mb-3 group-hover:text-accent transition-colors">
            {post.title}
          </h3>

          <p className="text-sm font-sans text-text-secondary line-clamp-2 mb-6">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center text-accent text-xs font-mono uppercase tracking-widest transition-all duration-300 group-hover:gap-2">
            Details <span>→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
