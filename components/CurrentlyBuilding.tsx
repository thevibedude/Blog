'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/lib/projects';

export function CurrentlyBuilding() {
  const displayProjects = projects.slice(0, 1);

  return (
    <section className="home-section px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col mb-16">
        <p className="section-label">// projects</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-grow">
            <h2 className="text-foreground tracking-tighter text-xl sm:text-2xl font-mono">Projects</h2>
            <div className="h-px bg-border flex-grow mt-2 opacity-30" />
          </div>
          <Link href="/projects" className="group flex items-center space-x-2 text-text-muted hover:text-accent font-mono text-sm transition-colors ml-4">
            <span>view projects</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 480px))',
        justifyContent: 'start'
      }}>
        {displayProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
