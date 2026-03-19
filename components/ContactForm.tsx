'use client';

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          website: honeypot,
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-surface border border-[var(--border-accent)]/20 p-12 rounded-2xl text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-12 w-12 text-accent" />
        </div>
        <h3 className="text-xl font-mono text-foreground">Message Sent!</h3>
        <p className="text-text-muted text-sm font-inter">
          Thanks for reaching out. I&apos;ll get back to you as soon as I can.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-4 text-accent font-mono text-xs uppercase tracking-widest hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: 'none' }}
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full bg-surface border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent/40 transition-colors font-inter"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full bg-surface border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent/40 transition-colors font-inter"
            placeholder="john@doe.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Message</label>
        <textarea
          name="message"
          id="message"
          required
          rows={5}
          className="w-full bg-surface border border-border/50 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent/40 transition-colors font-inter resize-none"
          placeholder="What's on your mind?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center space-x-3 bg-accent text-black py-4 rounded-xl font-mono font-bold uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:scale-100"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Send Message</span>
          </>
        )}
      </button>
      
      {status === 'error' && (
        <p className="text-rose-500 text-xs font-mono text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
