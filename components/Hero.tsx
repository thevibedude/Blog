'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════
   HERO LOGO — Inline SVG with boot sequence animation
   ═══════════════════════════════════════════════════════ */
const HeroLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 460 160"
    width="460"
    height="160"
    role="img"
    aria-label="thevibedude logo"
    className="w-full max-w-[420px]"
  >
    <defs>
      <clipPath id="hexClipHero">
        <polygon points="130,0 212.42,47.5 212.42,142.5 130,190 47.58,142.5 47.58,47.5" transform="translate(0,-22)" />
      </clipPath>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          #hero-outer-ring {
            stroke-dasharray: 650;
            stroke-dashoffset: 650;
            animation: tvdDrawRing 1s cubic-bezier(.4,0,.2,1) 0.1s forwards;
          }
          #hero-inner-ring {
            stroke-dasharray: 610;
            stroke-dashoffset: 610;
            animation: tvdDrawRing 1s cubic-bezier(.4,0,.2,1) 0.3s forwards;
          }
          #hero-binary {
            opacity: 0;
            animation: tvdFadeBinary 0.6s ease-out 0.8s forwards;
          }
          #hero-main-slash {
            stroke-dasharray: 230;
            stroke-dashoffset: 230;
            animation: tvdDrawSlash 0.5s cubic-bezier(.4,0,.2,1) 1.0s forwards;
          }
          #hero-glitch-slash {
            stroke-dasharray: 230;
            stroke-dashoffset: 230;
            animation: tvdDrawSlash 0.4s cubic-bezier(.4,0,.2,1) 1.3s forwards;
          }
          #hero-frag1 { opacity:0; animation: tvdFadeIn 0.3s ease-out 1.5s forwards; }
          #hero-frag2 { opacity:0; animation: tvdFadeIn 0.3s ease-out 1.6s forwards; }
          #hero-wordmark {
            opacity:0;
            letter-spacing:20px;
            animation: tvdWordmark 0.7s cubic-bezier(.4,0,.2,1) 1.4s forwards;
          }
          #hero-underline-main {
            transform: scaleX(0);
            transform-origin: left;
            animation: tvdScaleIn 0.5s cubic-bezier(.4,0,.2,1) 2.1s forwards;
          }
          #hero-underline-short {
            transform: scaleX(0);
            transform-origin: left;
            animation: tvdScaleIn 0.4s cubic-bezier(.4,0,.2,1) 2.3s forwards;
          }
          @keyframes tvdDrawRing   { to { stroke-dashoffset: 0; } }
          @keyframes tvdFadeBinary { to { opacity: 0.13; } }
          @keyframes tvdDrawSlash  { to { stroke-dashoffset: 0; } }
          @keyframes tvdFadeIn     { to { opacity: 1; } }
          @keyframes tvdWordmark   { to { opacity: 1; letter-spacing: 6px; } }
          @keyframes tvdScaleIn    { to { transform: scaleX(1); } }
        }
        .tvd-logo-group { cursor: pointer; }
        .tvd-logo-group:hover #hero-outer-ring {
          stroke: #F0997B; stroke-width: 8;
          transition: stroke 0.3s, stroke-width 0.3s;
        }
        .tvd-logo-group:hover #hero-wordmark {
          fill: #E8693A; letter-spacing: 10px;
          transition: fill 0.4s, letter-spacing 0.4s;
        }
        .tvd-logo-group:hover #hero-glitch-slash {
          opacity: 0.8; transform: translate(-3px,3px);
          transition: opacity 0.2s, transform 0.2s;
        }
      `}</style>
    </defs>
    <g className="tvd-logo-group">
      <g transform="translate(130,70)">
        <polygon points="0,-68 58.87,-34 58.87,34 0,68 -58.87,34 -58.87,-34" fill="#12080A" />
        <polygon id="hero-outer-ring" points="0,-68 58.87,-34 58.87,34 0,68 -58.87,34 -58.87,-34" fill="none" stroke="#D85A30" strokeWidth="5.5" strokeLinejoin="round" />
        <polygon id="hero-inner-ring" points="0,-62 53.69,-31 53.69,31 0,62 -53.69,31 -53.69,-31" fill="none" stroke="#F0997B" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
        <g id="hero-binary" opacity="0.13" clipPath="url(#hexClipHero)" transform="translate(-130,-92)">
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="50" y="28">10110010 01101001</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="45" y="40">01001101 10110100</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="55" y="52">11010010 01101100</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="40" y="64">10010110 01011010</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="50" y="76">01101001 10110010</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="48" y="88">11001010 01011001</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="52" y="100">10110100 11010010</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="44" y="112">01001011 10010110</text>
          <text fontFamily="monospace" fontSize="9" fill="#F0997B" x="50" y="124">10110010 01101001</text>
        </g>
        <line id="hero-glitch-slash" x1="-46" y1="46" x2="57" y2="-46" stroke="#F0997B" strokeWidth="6" strokeLinecap="round" opacity="0.45" transform="translate(11,11)" />
        <line id="hero-main-slash" x1="-46" y1="46" x2="57" y2="-46" stroke="#E8693A" strokeWidth="13" strokeLinecap="round" />
        <line id="hero-frag1" x1="-47" y1="33" x2="-32" y2="45" stroke="#F5C4B3" strokeWidth="4.5" strokeLinecap="round" opacity="0.57" />
        <line id="hero-frag2" x1="32" y1="-41" x2="50" y2="-29" stroke="#D85A30" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      </g>
      <g transform="translate(210,70)">
        <text id="hero-wordmark" fontFamily="system-ui, Arial, sans-serif" fontWeight="400" fontSize="26" fill="#F0997B" dominantBaseline="middle" x="0" y="-7" letterSpacing="6">thevibedude</text>
        <rect id="hero-underline-main" x="0" y="7" width="222" height="2.5" fill="#E8693A" />
        <rect id="hero-underline-short" x="0" y="12" width="89" height="1" fill="#F0997B" opacity="0.5" />
      </g>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════════════
   TERMINAL CONTENT — Rendered line model
   
   Each "rendered line" is a row on screen. A rendered
   line can contain multiple colored spans (e.g. prompt
   prefix + command on the same row).
   ═══════════════════════════════════════════════════════ */
interface Span {
  text: string;
  color: string;
}

interface RenderedLine {
  spans: Span[];
}

/*
  The script defines the visual output as "steps".
  Each step either:
    - appends a new rendered line, OR
    - appends text to the current rendered line (same row)
  Steps can be instant or typed char-by-char.
*/
interface Step {
  text: string;
  color: string;
  instant?: boolean;
  newLine: boolean; // true = create a new rendered line, false = append to current
  pauseAfter?: number;
}

const C = {
  primary:   'var(--text-primary)',
  secondary: 'var(--text-secondary)',
  accent:    'var(--accent)',
  tertiary:  'var(--text-tertiary)',
};

const STEPS: Step[] = [
  // Line 1: $ whoami (prompt + command on same line)
  { text: '$ ',        color: C.tertiary,  instant: true,  newLine: true },
  { text: 'whoami',   color: C.secondary, instant: false, newLine: false, pauseAfter: 380 },
  // Line 2: output
  { text: 'thevibedude', color: C.accent, instant: false, newLine: true, pauseAfter: 600 },
  // Blank
  { text: '',          color: C.tertiary,  instant: true,  newLine: true },
  // Line 4: $ cat current_build.log
  { text: '$ ',        color: C.tertiary,  instant: true,  newLine: true },
  { text: 'cat current_build.log', color: C.secondary, instant: false, newLine: false, pauseAfter: 380 },
  // Build output
  { text: '▸ SnapSense AI', color: C.primary, instant: false, newLine: true },
  { text: '  initialising · build starts soon', color: C.tertiary, instant: false, newLine: true, pauseAfter: 400 },
  // Blank
  { text: '',          color: C.tertiary,  instant: true,  newLine: true },
  // Line 8: $ ls challenges/active
  { text: '$ ',        color: C.tertiary,  instant: true,  newLine: true },
  { text: 'ls challenges/active', color: C.secondary, instant: false, newLine: false, pauseAfter: 380 },
  // Output
  { text: 'build-landing-page-3hrs.sh', color: C.accent, instant: false, newLine: true },
  { text: '  issued_by: @follower  · status: IN PROGRESS', color: C.tertiary, instant: false, newLine: true, pauseAfter: 300 },
  // Blank
  { text: '',          color: C.tertiary,  instant: true,  newLine: true },
  // Final prompt
  { text: '$ ',        color: C.tertiary,  instant: true,  newLine: true },
];

/* ═══════════════════════════════════════════════════════
   TYPEWRITER SEQUENCE
   ═══════════════════════════════════════════════════════ */
function TypewriterSequence({ startDelay }: { startDelay: number }) {
  // renderedLines is an array of rendered lines, each with an array of spans
  const [renderedLines, setRenderedLines] = useState<RenderedLine[]>([]);
  const [cursorPos, setCursorPos] = useState<{ line: number } | null>(null);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const stateRef = useRef({ stepIdx: 0, charIdx: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linesRef = useRef<RenderedLine[]>([]);

  // Reduced motion check
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  // Reduced motion: show all instantly
  useEffect(() => {
    if (!reducedMotion) return;
    const allLines: RenderedLine[] = [];
    let currentLine: RenderedLine | null = null;
    for (const step of STEPS) {
      if (step.newLine || !currentLine) {
        currentLine = { spans: [] };
        allLines.push(currentLine);
      }
      if (step.text) {
        currentLine.spans.push({ text: step.text, color: step.color });
      }
    }
    setRenderedLines(allLines);
    setCursorPos({ line: allLines.length - 1 });
    setDone(true);
    setStarted(true);
  }, [reducedMotion]);

  const processStep = useCallback(() => {
    const { stepIdx, charIdx } = stateRef.current;
    if (stepIdx >= STEPS.length) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDone(true);
      return;
    }

    const step = STEPS[stepIdx];

    if (step.instant) {
      // Add instantly
      const lines = [...linesRef.current];
      if (step.newLine) {
        const newLine: RenderedLine = { spans: step.text ? [{ text: step.text, color: step.color }] : [] };
        lines.push(newLine);
      } else {
        const lastLine = lines[lines.length - 1];
        if (lastLine && step.text) {
          lastLine.spans = [...lastLine.spans, { text: step.text, color: step.color }];
        }
      }
      linesRef.current = lines;
      setRenderedLines([...lines]);
      setCursorPos({ line: lines.length - 1 });

      stateRef.current = { stepIdx: stepIdx + 1, charIdx: 0 };

      if (step.pauseAfter) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(processStep, 42);
        }, step.pauseAfter);
      }
      return;
    }

    // Char-by-char typing
    const nextCharIdx = charIdx + 1;
    const typedText = step.text.substring(0, nextCharIdx);

    const lines = [...linesRef.current];
    if (charIdx === 0) {
      // First char of this step
      if (step.newLine) {
        lines.push({ spans: [{ text: typedText, color: step.color }] });
      } else {
        const lastLine = lines[lines.length - 1];
        if (lastLine) {
          lastLine.spans = [...lastLine.spans, { text: typedText, color: step.color }];
        }
      }
    } else {
      // Update the last span on the current line
      const lastLine = lines[lines.length - 1];
      if (lastLine) {
        const spans = [...lastLine.spans];
        const lastSpan = spans[spans.length - 1];
        spans[spans.length - 1] = { ...lastSpan, text: typedText };
        lastLine.spans = spans;
      }
    }
    linesRef.current = lines;
    setRenderedLines([...lines]);
    setCursorPos({ line: lines.length - 1 });

    if (nextCharIdx >= step.text.length) {
      // Step complete
      stateRef.current = { stepIdx: stepIdx + 1, charIdx: 0 };
      if (step.pauseAfter) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(processStep, 42);
        }, step.pauseAfter);
      }
    } else {
      stateRef.current = { stepIdx, charIdx: nextCharIdx };
    }
  }, []);

  // Start after delay
  useEffect(() => {
    if (reducedMotion) return;

    const t = setTimeout(() => {
      setStarted(true);
      intervalRef.current = setInterval(processStep, 42);
    }, startDelay);

    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startDelay, processStep, reducedMotion]);

  if (!started) return null;

  return (
    <div className="font-mono" style={{ fontSize: '13.5px', lineHeight: '1.8' }}>
      {renderedLines.map((line, i) => (
        <div key={i} className="flex min-h-[1.8em]">
          <span>
            {line.spans.map((span, j) => (
              <span key={j} style={{ color: span.color }}>{span.text}</span>
            ))}
          </span>
          {cursorPos && i === cursorPos.line && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.15em',
                backgroundColor: 'var(--accent)',
                marginLeft: '1px',
                alignSelf: 'center',
                animation: 'termCursorBlink 1.06s steps(1) infinite',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TERMINAL WINDOW
   ═══════════════════════════════════════════════════════ */
function TerminalWindow({ startDelay }: { startDelay: number }) {
  return (
    <div
      style={{
        background: '#0D0806',
        border: '1px solid rgba(216,90,48,0.35)',
        borderRadius: '10px',
        boxShadow:
          '0 0 0 1px rgba(232,105,58,0.08), 0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(232,105,58,0.04)',
        overflow: 'hidden',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center relative"
        style={{
          height: '36px',
          background: '#160A07',
          borderBottom: '1px solid rgba(232,105,58,0.15)',
          paddingLeft: '14px',
          paddingRight: '14px',
        }}
      >
        {/* Traffic light dots */}
        <div className="flex items-center" style={{ gap: '7px' }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#3D1F18' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#2E1F0E' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#0E2214' }} />
        </div>

        {/* Center filename */}
        <span
          className="font-mono absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: '11px', color: 'var(--text-tertiary)', opacity: 0.6 }}
        >
          ~/thevibedude/now.sh
        </span>

        {/* REC indicator */}
        <div className="flex items-center ml-auto" style={{ gap: '6px' }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#E8693A',
              animation: 'termRecBlink 1.5s steps(1) infinite',
            }}
          />
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--accent)' }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="relative" style={{ padding: '20px 24px', minHeight: '320px' }}>
        <TypewriterSequence startDelay={startDelay} />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.015) 2px,
              rgba(0,0,0,0.015) 4px
            )`,
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCROLL INDICATOR
   ═══════════════════════════════════════════════════════ */
function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    const handleScroll = () => setHidden(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      style={{
        opacity: visible && !hidden ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: 1, height: 40, background: 'var(--accent)', opacity: 0.4 }}
      >
        <div
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'var(--accent)',
            left: -1.5,
            animation: 'scrollDot 1.4s ease-in infinite',
          }}
        />
      </div>
      <span
        className="font-mono mt-2"
        style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: 3 }}
      >
        scroll
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO — Main export
   ═══════════════════════════════════════════════════════ */
export function Hero() {
  const [terminalVisible, setTerminalVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setTerminalVisible(true);
      return;
    }
    const t = setTimeout(() => setTerminalVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Layer 1 — base */}
      <div className="absolute inset-0 bg-bg-primary" style={{ zIndex: 0 }} />

      {/* Layer 2 — radial glow behind logo column */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(232,105,58,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Layer 3 — binary texture bottom-right only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='80'%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='4' y='14'%3E10110010%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='70' y='14'%3E01101001%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='4' y='30'%3E01001101%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='70' y='30'%3E10110100%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='4' y='46'%3E11010010%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='70' y='46'%3E01101100%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='4' y='62'%3E10010110%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='70' y='62'%3E01011010%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='4' y='78'%3E01101001%3C/text%3E%3Ctext font-family='monospace' font-size='10' fill='%23F0997B' x='70' y='78'%3E10110010%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 80px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, black 100%), linear-gradient(to right, transparent 0%, transparent 40%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, black 100%), linear-gradient(to right, transparent 0%, transparent 40%, black 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in' as any,
        }}
      />

      {/* Content — two columns */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16">
        {/* Left — Logo */}
        <div className="flex flex-col items-center lg:items-start lg:w-[45%] shrink-0">
          <HeroLogo />
          <p
            className="font-mono mt-6"
            style={{ fontSize: 13, color: 'var(--text-tertiary)', letterSpacing: 2 }}
          >
            building in public. one commit at a time.
          </p>
        </div>

        {/* Right — Terminal */}
        <div
          className="w-full lg:w-[55%]"
          style={{
            opacity: terminalVisible ? 1 : 0,
            transform: terminalVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <TerminalWindow startDelay={2500} />
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-accent to-transparent opacity-20" />

      {/* Keyframes */}
      <style>{`
        @keyframes termCursorBlink {
          0%, 49.9% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes termRecBlink {
          0%, 69.9% { opacity: 1; }
          70%, 100% { opacity: 0; }
        }
        @keyframes scrollDot {
          0%   { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
      `}</style>
    </section>
  );
}
