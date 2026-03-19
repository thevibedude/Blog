'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Project } from '@/lib/projects';
import { ProgressBar } from './ProgressBar';
import { cn } from '@/lib/utils';

export function ProjectCard({ project }: { project: Project }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showLoomModal, setShowLoomModal] = useState(false);
  const isComingSoon = project.status === 'coming-soon';

  const nextImg = () => {
    if (project.screenshots) {
      setCurrentImgIndex((prev) => (prev + 1) % project.screenshots!.length);
    }
  };

  const prevImg = () => {
    if (project.screenshots) {
      setCurrentImgIndex((prev) => (prev - 1 + project.screenshots!.length) % project.screenshots!.length);
    }
  };

  const renderPreview = () => {
    if (isComingSoon) return null;

    switch (project.previewType) {
      case 'iframe':
        return (
          <div className="relative aspect-video rounded-t-xl bg-bg-tertiary border-b border-border-accent overflow-hidden group/browser">
            {/* Browser chrome */}
            <div className="absolute top-0 inset-x-0 h-8 bg-bg-secondary border-b border-border-accent flex items-center px-4 space-x-1.5 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5C1A1A] border border-[var(--border-accent)]/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#5C3A1A] border border-[var(--border-accent)]/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#2E5E3E] border border-[var(--border-accent)]/20" />
              <div className="flex-grow flex justify-center">
                <div className="w-1/2 h-5 bg-bg-tertiary border border-border-accent/40 rounded-md px-3 flex items-center">
                  <span className="text-[8px] font-mono text-text-tertiary truncate">{project.liveUrl || 'https://vibedude.sh'}</span>
                </div>
              </div>
            </div>
            <iframe src={project.previewUrl} className="w-full h-full pt-8 pointer-events-none opacity-50 grayscale group-hover/browser:grayscale-0 group-hover/browser:opacity-100 transition-all duration-700" title={project.name} />
            <div className="absolute inset-x-0 bottom-0 top-8 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none z-10 opacity-60 group-hover/browser:opacity-0 transition-opacity" />
          </div>
        );
      case 'video':
        return (
          <div className="relative aspect-video rounded-t-xl bg-bg-tertiary overflow-hidden group/video">
            <video
              src={project.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover grayscale group-hover/video:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-accent/5 pointer-events-none group-hover:bg-transparent transition-colors" />
          </div>
        );
      case 'screenshot':
        return (
          <div className="relative aspect-video rounded-t-xl bg-bg-tertiary overflow-hidden group/carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <Image
                  src={project.screenshots?.[currentImgIndex] || project.previewUrl || ''}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            {project.screenshots && project.screenshots.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20">
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20">
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
                <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-1.5 z-20">
                  {project.screenshots.map((_, i) => (
                    <div key={i} className={cn('w-1.5 h-1.5 rounded-full transition-all', i === currentImgIndex ? 'bg-accent w-4' : 'bg-white/30')} />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      case 'loom':
        return (
          <div className="relative aspect-video rounded-t-xl bg-bg-tertiary overflow-hidden group/loom cursor-pointer" onClick={() => setShowLoomModal(true)}>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-bg-primary shadow-lg transform group-hover/loom:scale-110 transition-transform">
                <Play className="h-6 w-6 fill-current ml-1" />
              </div>
            </div>
            <Image src={project.previewUrl || ''} alt={project.name} fill className="object-cover opacity-60 group-hover/loom:opacity-100 transition-opacity duration-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={cn(
        "bg-bg-secondary border rounded-2xl flex flex-col overflow-hidden transition-all duration-300",
        isComingSoon 
          ? "border-[rgba(216,90,48,0.25)] cursor-default" 
          : "border-border group hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-10px_var(--surface-glow-strong)] hover:border-border-accent"
      )}>
        {renderPreview()}

        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              {isComingSoon ? (
                <span className="status-badge coming-soon">
                  ⬡ building soon
                </span>
              ) : (
                <h3 className="text-2xl font-mono tracking-tighter text-text-primary group-hover:text-accent transition-colors">{project.name}</h3>
              )}
              
              {!isComingSoon && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack.map(t => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {!isComingSoon && (
              <div className="flex space-x-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-tertiary border border-border/50 rounded-lg text-text-secondary hover:text-accent hover:border-accent/30 transition-all">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-tertiary border border-border/50 rounded-lg text-text-secondary hover:text-accent hover:border-accent/30 transition-all">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {isComingSoon ? (
            <div className="flex flex-col flex-grow">
              <h3 className="font-mono font-medium text-[18px] text-text-primary mb-2">{project.name}</h3>
              <p className="font-mono text-[13px] text-text-tertiary italic leading-relaxed mb-8">
                {project.description}
              </p>
            </div>
          ) : (
            <p className="text-text-secondary text-sm font-sans leading-relaxed mb-8 flex-grow">
              {project.description}
            </p>
          )}

          <ProgressBar
            progress={project.completion}
            label={isComingSoon ? "0% — not started" : "Stage"}
            className="mt-auto"
          />

          {isComingSoon && (
            <p className="card-cursor-line">
              <span className="card-cursor">_</span>
            </p>
          )}
        </div>
      </div>



      <AnimatePresence>
        {showLoomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setShowLoomModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-bg-primary rounded-3xl overflow-hidden border border-border-accent/50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLoomModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-bg-secondary/80 border border-border/50 text-text-primary hover:text-accent z-50"
              >
                <X className="h-6 w-6" />
              </button>
              <iframe src={project.previewUrl || ''} className="w-full h-full" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

