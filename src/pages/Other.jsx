import React, { useRef, useState, useEffect, useCallback } from 'react';

const GAP = 0; // No gap — prevents the half-image bleed issue

const internshipCarousels = [
  {
    id: 1,
    label: '1st Internship',
    images: [
      '/int1.0.png', '/int1.1.png', '/int1.2.png',
      '/int1.3.png', '/int1.4.png', '/int1.5.png',
    ],
    delay: 3000,
  },
  {
    id: 2,
    label: '2nd Internship',
    images: [
      '/int2.0.png', '/int2.1.png', '/int2.2.png',
      '/int2.3.png', '/int2.4.png', '/int2.5.png',
    ],
    delay: 3600,
  },
];

const productStylingCarousel = {
  id: 3,
  label: 'Product Styling',
  images: [
    '/ps1.png', '/ps2.png', '/ps3.png',
    '/ps4.png', '/ps5.png',
  ],
  delay: 3200,
};

function useVisible(threshold = 0.08) {
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

function InternshipCarousel({ data }) {
  const isMobile = useIsMobile();
  const [ref, visible] = useVisible(0.08);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const visCount = isMobile ? 1 : 2;
  const total = data.images.length;
  const maxIndex = total - visCount;

  const next = useCallback(() => {
    setCurrent(p => (p >= maxIndex ? 0 : p + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent(p => (p <= 0 ? maxIndex : p - 1));
  }, [maxIndex]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, data.delay);
  }, [next, data.delay]);

  useEffect(() => {
    timerRef.current = setInterval(next, data.delay);
    return () => clearInterval(timerRef.current);
  }, [next, data.delay]);

  useEffect(() => {
    setCurrent(p => Math.min(p, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };

  // Each slide is exactly (100 / visCount)% of the container width.
  // Shifting by current * (100 / visCount)% moves exactly one slide at a time — no gap bleed.
  const slideWidthPct = 100 / visCount;
  const translatePct = current * slideWidthPct;

  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}>
          <h3 style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 300,
            color: 'var(--deep-brown)',
            margin: 0,
          }}>
            {data.label}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); resetTimer(); }}
                  style={{
                    width: i === current ? '18px' : '6px',
                    height: '5px',
                    borderRadius: '3px',
                    background: i === current
                      ? 'var(--terracotta)'
                      : 'rgba(139,58,42,0.2)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            {[{ label: '←', fn: handlePrev }, { label: '→', fn: handleNext }].map(btn => (
              <button
                key={btn.label}
                onClick={btn.fn}
                style={{
                  width: '38px', height: '38px',
                  border: '1px solid rgba(139,58,42,0.2)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'serif',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--terracotta)';
                  e.currentTarget.style.color = 'var(--cream)';
                  e.currentTarget.style.borderColor = 'var(--terracotta)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--muted)';
                  e.currentTarget.style.borderColor = 'rgba(139,58,42,0.2)';
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel track */}
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: `translateX(-${translatePct}%)`,
              willChange: 'transform',
            }}
          >
            {data.images.map((img, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 ${slideWidthPct}%`,
                  width: `${slideWidthPct}%`,
                  minWidth: 0,
                  overflow: 'hidden',
                  background: 'var(--parchment)',
                  lineHeight: 0,
                  boxSizing: 'border-box',
                  padding: '0 4px',
                }}
              >
                <img
                  src={img}
                  alt={`${data.label} ${i + 1}`}
                  style={{
                    width: '100%',
                    aspectRatio: '2000/1410',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          marginTop: '1rem',
          height: '1px',
          background: 'rgba(139,58,42,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${((current + 1) / (maxIndex + 1)) * 100}%`,
            background: 'var(--terracotta)',
            opacity: 0.55,
            transition: 'width 0.5s ease',
          }} />
        </div>

      </div>
    </div>
  );
}

export default function Other() {
  const [headerRef, headerVisible] = useVisible(0.1);
  const [psHeaderRef, psHeaderVisible] = useVisible(0.1);

  return (
    <section id="other">

      {/* ── Internships heading ── */}
      <div
        ref={headerRef}
        style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem) 0',
          maxWidth: '1300px',
          margin: '0 auto',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}
      >
        <p style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.6rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '0.8rem',
        }}>
          Other
        </p>
        <h2 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 300,
          color: 'var(--deep-brown)',
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          Internships
        </h2>
        <div style={{
          width: '40px', height: '1.5px',
          background: 'var(--terracotta)',
          opacity: 0.55,
          marginBottom: 'clamp(3rem, 5vw, 4rem)',
        }} />
      </div>

      {/* ── Internship carousels ── */}
      {internshipCarousels.map(data => (
        <InternshipCarousel key={data.id} data={data} />
      ))}

      {/* ── Section divider ── */}
      <div style={{
        padding: '0 clamp(1.5rem, 5vw, 5rem)',
        maxWidth: '1300px',
        margin: '0 auto',
      }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(139,58,42,0.18), transparent)',
          margin: 'clamp(1rem, 3vw, 2rem) 0',
        }} />
      </div>

      {/* ── Product Styling heading ── 
      <div
        ref={psHeaderRef}
        style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem) 0',
          maxWidth: '1300px',
          margin: '0 auto',
          opacity: psHeaderVisible ? 1 : 0,
          transform: psHeaderVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}
      >
        <p style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.6rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '0.8rem',
        }}>
          Other
        </p>
        <h2 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 300,
          color: 'var(--deep-brown)',
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          Product Styling
        </h2>
        <div style={{
          width: '40px', height: '1.5px',
          background: 'var(--terracotta)',
          opacity: 0.55,
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }} />
      </div> */}

      {/* ── Product Styling carousel ── */}
      <InternshipCarousel data={productStylingCarousel} />

    </section>
  );
}