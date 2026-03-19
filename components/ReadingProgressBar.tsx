'use client';

import React, { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(3)) * 100
        );
      }
    };

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(updateScrollCompletion);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[200]" style={{ height: '2.5px', background: 'rgba(232,105,58,0.15)' }}>
      <div
        className="h-full reading-progress-fill transition-all duration-75 ease-out"
        style={{
          width: `${completion}%`,
          background: 'linear-gradient(90deg, #D85A30, #E8693A, #F0997B)',
          boxShadow: '0 0 10px rgba(232,105,58,0.6)',
        }}
      />
    </div>
  );
}
