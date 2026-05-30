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
      {/* Left: Image */}
      <div
        style={{
          position: 'relative',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          style={{
            width: '85%',
            aspectRatio: '3/4',
            overflow: 'hidden',
            background: 'var(--parchment)',
            boxShadow: '0 20px 60px rgba(26,15,10,0.18)',
          }}
        >
          <img
            src="/about_me.png"
            alt="About Me"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              transition: 'transform 0.7s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </div>

        {/* Decorative corner frame */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '-15px',
            width: '55%',
            height: '55%',
            border: '1px solid rgba(139,58,42,0.25)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10px',
            right: '12%',
            width: '35%',
            height: '35%',
            border: '1px solid rgba(139,58,42,0.15)',
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
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            color: 'var(--deep-brown)',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
          }}
        >
          Passion for craft,
          <br />
          <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>
            rooted in heritage.
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
            fontSize: '1.1rem',
            color: 'var(--mid-brown)',
            lineHeight: 1.95,
            marginBottom: '1.4rem',
            fontStyle: 'italic',
          }}
        >
          I am a passionate fashion design student with a strong interest in
          creative storytelling, textile exploration, and garment development.
        </p>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--muted)',
            lineHeight: 1.95,
            marginBottom: '1.4rem',
          }}
        >
          My work blends traditional influences with contemporary aesthetics,
          drawing inspiration from culture, heritage, nature, and everyday life.
        </p>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--muted)',
            lineHeight: 1.95,
          }}
        >
          Through concept development, illustration, and design research, I
          strive to create collections that are visually engaging, meaningful,
          and connected to the people who wear them.
        </p>

        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(139,58,42,0.15)',
            display: 'flex',
            gap: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '5+', label: 'Collections' },
            { num: '3+', label: 'Brands' },
            { num: '100%', label: 'Handcrafted' },
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
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginTop: '5px',
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
          #about { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}