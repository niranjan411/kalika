import React, { useEffect, useRef, useState } from 'react';

export default function About() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 8rem)',
        alignItems: 'center',
      }}
    >
      {/* Left: Image collage */}
      <div
        style={{
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Main image */}
        <div
          style={{
            width: '80%',
            aspectRatio: '3/4',
            overflow: 'hidden',
            background: 'var(--parchment)',
            boxShadow: '0 20px 60px rgba(26,15,10,0.18)',
          }}
        >
          <img
            src="/design81.jpeg"
            alt="Kalika Designs"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.7s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </div>
        {/* Inset image */}
        <div
          style={{
            position: 'absolute',
            bottom: '-8%',
            right: '0',
            width: '42%',
            aspectRatio: '1',
            overflow: 'hidden',
            border: '6px solid var(--warm-white)',
            boxShadow: '0 12px 40px rgba(26,15,10,0.2)',
          }}
        >
          <img
            src="/design31.jpeg"
            alt="Kalika craft"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {/* Decorative border frame */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '-15px',
            width: '60%',
            height: '60%',
            border: '1px solid rgba(139,58,42,0.25)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Right: Text */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
        }}
      >
        <p className="section-label" style={{ marginBottom: '1.2rem' }}>
          About Me
        </p>

        <h2
          style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            color: 'var(--deep-brown)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}
        >
          Made with heart,
          <br />
          <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>
            not algorithms.
          </em>
        </h2>

        <div
          style={{
            width: '40px',
            height: '1.5px',
            background: 'var(--terracotta)',
            marginBottom: '1.8rem',
            opacity: 0.6,
          }}
        />

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--mid-brown)',
            lineHeight: 1.9,
            marginBottom: '1.2rem',
            fontStyle: 'italic',
          }}
        >
          Hi, I'm the founder of Kalika Designs — a small, thoughtful clothing
          label rooted in the craft traditions of Rajasthan and the belief that
          clothes should carry meaning.
        </p>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--muted)',
            lineHeight: 1.9,
            marginBottom: '2rem',
          }}
        >
          Every piece is block-printed, naturally dyed, and sewn by skilled
          artisans who have spent decades perfecting their craft. We're not
          trying to scale fast — we're trying to make things that last. Things
          you'll reach for again and again, years from now.
        </p>

        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--muted)',
            lineHeight: 1.9,
          }}
        >
          Kalika started as a personal obsession with block-printed fabric and
          became a quiet rebellion against everything disposable. Welcome to the
          slow side of fashion.
        </p>

        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(139,58,42,0.15)',
            display: 'flex',
            gap: '3rem',
          }}
        >
          {[
            { num: '200+', label: 'Designs' },
            { num: '11', label: 'Artisans' },
            { num: '100%', label: 'Handmade' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '2rem',
                  color: 'var(--terracotta)',
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
