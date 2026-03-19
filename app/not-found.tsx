import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-8xl font-mono font-bold tracking-tighter text-accent mb-6 animate-pulse">404</h1>
      <h2 className="text-3xl font-mono mb-4 text-foreground tracking-tighter">Page Not Found</h2>
      <p className="text-text-muted mb-8 max-w-md font-inter">
        The link you followed might be broken, or the page may have been removed. Let's get you back on track.
      </p>
      <Link 
        href="/" 
        className="px-8 py-3 bg-surface border border-border/50 hover:border-accent/40 rounded-xl font-mono text-sm uppercase tracking-widest transition-all hover:bg-card"
      >
        Return Home
      </Link>
    </div>
  );
}
