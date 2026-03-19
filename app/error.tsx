'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Log to console in dev only
  if (process.env.NODE_ENV === 'development') {
    console.error(error)
  }
  // Never display error.message to users in prod
  return (
    <div className="error-page h-screen flex flex-col items-center justify-center space-y-4 font-mono w-full px-6">
      <p className="text-[10px] uppercase tracking-widest text-[var(--accent)]">// error</p>
      <h2 className="text-2xl text-[var(--text-primary)]">Something broke.</h2>
      <p className="text-[var(--text-tertiary)] text-sm">It has been logged. Try again.</p>
      <button 
        onClick={reset}
        className="mt-6 border border-[var(--border-accent)] px-4 py-2 hover:bg-[var(--bg-tertiary)] transition-colors rounded text-sm text-[var(--text-secondary)] uppercase tracking-widest"
      >
        retry
      </button>
    </div>
  )
}
