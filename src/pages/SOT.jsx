import React, { useRef, useState, useEffect } from 'react';

const statements = [
  {
    num: '01',
    title: 'Slow is Sacred',
    body:
      'We refuse to rush. Each garment takes days — sometimes weeks — from block-carving to final stitch. That time is not wasted. It is embedded in the cloth.',
  },
  {
    num: '02',
    title: 'The Hand Matters',
    body:
      'No two hand-blocked pieces are identical. What looks like inconsistency is actually integrity — proof that a human made this, not a machine.',
  },
  {
    num: '03',
    title: 'Craft is Community',
    body:
      'Behind every Kalika piece are artisan families who have practiced these crafts for generations. Buying slow fashion is investing in those lineages.',
  },
  {
    num: '04',
    title: 'Judge Away',
    body:
      "Kalika's covers don't disappoint. We make clothes for people who don't need trends to tell them what to wear. Wear what makes you feel like yourself.",
  },
];

export default function SOT() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sot"
      ref={ref}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
        background: 'var(--cream)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="section-label" style={{ marginBottom: '1rem' }}>
            Statement of Truth
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 300,
              color: 'var(--deep-brown)',
              lineHeight: 1.1,
              maxWidth: '500px',
            }}
          >
            What Kalika
            <br />
            <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>
              Stands For
            </em>
          </h2>
        </div>

        {/* Statements grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'rgba(139,58,42,0.12)',
          }}
        >
          {statements.map((s, i) => (
            <div
              key={s.num}
              style={{
                background: 'var(--cream)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.7s ease ${i * 0.12}s`,
                cursor: 'default',
              }}
              className="sot-card"
            >
              <p
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: 'var(--terracotta)',
                  marginBottom: '1.2rem',
                  opacity: 0.7,
                }}
              >
                {s.num}
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '1.4rem',
                  fontWeight: 500,
                  color: 'var(--deep-brown)',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--muted)',
                  lineHeight: 1.85,
                  fontStyle: 'italic',
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Center quote */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 'clamp(4rem, 7vw, 7rem)',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderTop: '1px solid rgba(139,58,42,0.15)',
            borderBottom: '1px solid rgba(139,58,42,0.15)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.4s',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '3rem',
              color: 'var(--terracotta)',
              opacity: 0.3,
              lineHeight: 1,
            }}
          >
            ☽
          </span>
          <p
            style={{
              fontFamily: "'IM Fell English', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.3rem, 3vw, 2rem)',
              color: 'var(--deep-brown)',
              maxWidth: '700px',
              margin: '1.5rem auto',
              lineHeight: 1.7,
            }}
          >
            "Made with heart, not algorithms. Peace out — says owner."
          </p>
          <p
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}
          >
            Kalika Manifesto
          </p>
        </div>
      </div>

      <style>{`
        .sot-card:hover {
          background: var(--warm-white) !important;
          transition: background 0.3s ease !important;
        }
      `}</style>
    </section>
  );
}
