import React, { useRef, useState, useEffect, useCallback } from 'react';

const themes = [
  {
    id: 1,
    name: 'Athle-chic Charm',
    subtitle: 'Theme 01',
    images: [
      '/theme1.01.png', '/theme1.02.png', '/theme1.03.png', '/theme1.04.png',
      '/theme1.05.png', '/theme1.06.png', '/theme1.07.png', '/theme1.08.png',
      '/theme1.09.png', '/theme1.10.png', '/theme1.11.png',
    ],
    accent: 'var(--terracotta)',
    bg: 'var(--warm-white)',
    textColor: 'var(--deep-brown)',
  },
  {
    id: 2,
    name: 'Noorani Bagh',
    subtitle: 'Theme 02',
    images: [
      '/theme2.01.png', '/theme2.02.png', '/theme2.03.png', '/theme2.04.png',
      '/theme2.05.png', '/theme2.06.png', '/theme2.07.png', '/theme2.08.png',
      '/theme2.09.png', '/theme2.10.png',
    ],
    accent: 'var(--sand)',
    bg: 'var(--deep-brown)',
    textColor: 'var(--cream)',
  },
];

// How many cards visible at once
const VISIBLE_DESKTOP = 4;
const VISIBLE_MOBILE  = 1;

function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function ThemeCarousel({ theme, autoDelay = 2800 }) {
  const isMobile        = useIsMobile();
  const visible_count   = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;
  const [current, setCurrent] = useState(0);
  const timerRef        = useRef(null);
  const total           = theme.images.length;
  const maxIndex        = total - visible_count;

  const next = useCallback(() => {
    setCurrent(p => (p >= maxIndex ? 0 : p + 1));
  }, [maxIndex]);

  const prev = () => {
    setCurrent(p => (p <= 0 ? maxIndex : p - 1));
  };

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(next, autoDelay);
    return () => clearInterval(timerRef.current);
  }, [next, autoDelay]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, autoDelay);
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };

  const translateX = -(current * (100 / visible_count));

  return (
    <div style={{
      background: theme.bg,
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow for dark theme */}
      {theme.id === 2 && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(139,58,42,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        {/* Header row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div>
            <p style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.6rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: theme.id === 2 ? 'rgba(201,168,130,0.5)' : 'var(--muted)',
              marginBottom: '0.7rem',
            }}>
              {theme.subtitle}
            </p>
            <h2 style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 300,
              color: theme.textColor,
              lineHeight: 1.05,
            }}>
              {theme.name}
            </h2>
          </div>

          {/* Prev / Next controls */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '6px', marginRight: '0.5rem' }}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); resetTimer(); }}
                  style={{
                    width: i === current ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === current ? theme.accent : (theme.id === 2 ? 'rgba(201,168,130,0.25)' : 'rgba(139,58,42,0.2)'),
                    transition: 'all 0.35s ease',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={handlePrev}
              style={{
                width: '42px', height: '42px',
                border: `1px solid ${theme.id === 2 ? 'rgba(201,168,130,0.25)' : 'rgba(139,58,42,0.2)'}`,
                background: 'transparent',
                color: theme.id === 2 ? 'rgba(201,168,130,0.7)' : 'var(--muted)',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontFamily: 'serif',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--terracotta)';
                e.currentTarget.style.color = 'var(--cream)';
                e.currentTarget.style.borderColor = 'var(--terracotta)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = theme.id === 2 ? 'rgba(201,168,130,0.7)' : 'var(--muted)';
                e.currentTarget.style.borderColor = theme.id === 2 ? 'rgba(201,168,130,0.25)' : 'rgba(139,58,42,0.2)';
              }}
            >
              ←
            </button>
            <button
              onClick={handleNext}
              style={{
                width: '42px', height: '42px',
                border: `1px solid ${theme.id === 2 ? 'rgba(201,168,130,0.25)' : 'rgba(139,58,42,0.2)'}`,
                background: 'transparent',
                color: theme.id === 2 ? 'rgba(201,168,130,0.7)' : 'var(--muted)',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontFamily: 'serif',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--terracotta)';
                e.currentTarget.style.color = 'var(--cream)';
                e.currentTarget.style.borderColor = 'var(--terracotta)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = theme.id === 2 ? 'rgba(201,168,130,0.7)' : 'var(--muted)';
                e.currentTarget.style.borderColor = theme.id === 2 ? 'rgba(201,168,130,0.25)' : 'rgba(139,58,42,0.2)';
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              transform: `translateX(calc(${translateX}% - ${current * 8 / visible_count}px))`,
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          >
            {theme.images.map((img, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 calc(${100 / visible_count}% - ${8 * (visible_count - 1) / visible_count}px)`,
                  minWidth: 0,
                  overflow: 'hidden',
                  background: 'var(--parchment)',
                  lineHeight: 0,
                }}
                className="carousel-card"
              >
                <img
                  src={img}
                  alt={`${theme.name} ${i + 1}`}
                  style={{
                    width: '100%',
                    aspectRatio: '1414/2000',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div style={{
          width: '40px', height: '1px',
          background: theme.accent,
          marginTop: '2.5rem',
          opacity: 0.5,
        }} />
      </div>

      <style>{`
        .carousel-card:hover img { transform: scale(1.04); }
        @media (max-width: 640px) {
          .carousel-card img { aspect-ratio: 3/4 !important; }
        }
      `}</style>
    </div>
  );
}

export default function DesignProcess() {
  const [ref, visible] = useVisible(0.05);

  return (
    <section id="process" ref={ref}>
      {/* Section intro */}
      <div style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem) 0',
        maxWidth: '1400px',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}>
        <p className="section-label" style={{ marginBottom: '0.8rem' }}>
          Design Process
        </p>
        <h2 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 300,
          color: 'var(--deep-brown)',
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          Theme
          <br />
          <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Collections</em>
        </h2>
        <div style={{
          width: '40px', height: '1.5px',
          background: 'var(--terracotta)',
          opacity: 0.6,
        }} />
      </div>

      {/* Carousel 1 — light bg */}
      <ThemeCarousel theme={themes[0]} autoDelay={3000} />

      {/* Carousel 2 — dark bg */}
      <ThemeCarousel theme={themes[1]} autoDelay={3400} />
    </section>
  );
}