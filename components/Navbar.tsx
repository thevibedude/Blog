'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const NavLogo = () => (
  <Link href="/" className="group flex items-center space-x-4" aria-label="thevibedude home">
    <Image
      src="/logo-icon.svg"
      alt="thevibedude"
      width={44}
      height={44}
      priority
      className="pulse transition-opacity duration-300 group-hover:opacity-90"
      style={{ height: '44px', width: 'auto' }}
    />
    <div className="hidden sm:block">
      <span className="font-mono font-normal tracking-widest text-[var(--accent-light)] text-[15px]">
        thevibedude<span className="navbar-cursor">_</span>
      </span>
    </div>
  </Link>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-[100] transition-all duration-300 px-6 sm:px-12 h-20 flex items-center justify-between',
        scrolled
          ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-accent/30 h-16'
          : 'bg-transparent'
      )}
    >
      <NavLogo />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {siteConfig.navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'font-mono text-sm font-medium transition-colors duration-200 hover:text-text-accent',
              pathname === item.href
                ? 'text-accent border-b-2 border-accent pb-0.5'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {item.name}
          </Link>
        ))}
        <ThemeToggle />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden items-center space-x-4">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(true)}
          className="text-text-primary p-1 hover:text-accent transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[300px] bg-bg-secondary z-[120] border-l border-border-accent/30 p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <NavLogo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-accent transition-colors text-text-secondary"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-6">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-2xl font-mono transition-colors hover:text-text-accent',
                      pathname === item.href ? 'text-accent' : 'text-text-secondary'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
