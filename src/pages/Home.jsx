import React, { useEffect, useState } from 'react';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'var(--warm-white)',
        overflow: 'hidden',
        padding: 'clamp(5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      {/* Subtle background radials */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(ellipse at 15% 50%, rgba(139,58,42,0.04) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 50%, rgba(200,168,130,0.06) 0%, transparent 50%)
        `,
      }} />

      {/* Thin vertical decorative lines */}
      <div style={{
        position: 'absolute', left: '4%', top: '12%', bottom: '12%',
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(139,58,42,0.15), transparent)',
      }} />
      <div style={{
        position: 'absolute', right: '4%', top: '12%', bottom: '12%',
        width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(139,58,42,0.15), transparent)',
      }} />

      {/* ── Row: image  |  divider  |  text ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(2.5rem, 5vw, 5rem)',
        width: '100%',
        maxWidth: '1100px',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(28px)',
        transition: 'all 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s',
      }}
      className="hero-row"
      >

        {/* Cover image with border */}
        <div style={{
          flex: '0 0 auto',
          width: 'clamp(200px, 26vw, 340px)',
          position: 'relative',
        }}
        className="hero-img-wrap"
        >
          {/* Offset decorative border frame */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '10px',
            bottom: '10px',
            border: '1px solid rgba(139,58,42,0.25)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            border: '1.5px solid rgba(139,58,42,0.35)',
            boxShadow: '0 16px 50px rgba(26,15,10,0.14)',
          }}>
            <img
              src="/coverpage.png"
              alt="Kalika Designs"
              style={{
                width: '100%',
                aspectRatio: '1414/1999',
                objectFit: 'cover',
                objectPosition: 'center 8%',
                display: 'block',
                transition: 'transform 0.8s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{
          flex: '0 0 1px',
          alignSelf: 'stretch',
          minHeight: '260px',
          background: 'linear-gradient(to bottom, transparent, rgba(139,58,42,0.2), transparent)',
        }}
        className="hero-divider"
        />

        {/* Text + logo */}
        <div style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '480px',
        }}>
          {/* Logo */}
          <div style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s',
            marginBottom: '2rem',
          }}>
            <img
              src="/logo (2).jpg"
              alt="Kalika Logo"
              style={{
                width: 'clamp(90px, 10vw, 130px)',
                height: 'clamp(90px, 10vw, 130px)',
                objectFit: 'contain',
                borderRadius: '50%',
                background: 'var(--cream)',
                display: 'block',
              }}
            />
          </div>

          {/* Text */}
          <p style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.58rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '1rem',
          }}>
            Portfolio · Fashion Design
          </p>

          <h1 style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: 'clamp(3.2rem, 6.5vw, 6rem)',
            fontWeight: 300,
            color: 'var(--deep-brown)',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
            marginBottom: '0.4rem',
          }}>
            Kalika
          </h1>

          <h2 style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)',
            fontWeight: 300,
            color: 'var(--terracotta)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            marginBottom: '1.8rem',
          }}>
            Designs
          </h2>

          <div style={{
            width: '32px', height: '1.5px',
            background: 'var(--terracotta)',
            marginBottom: '1.6rem',
            opacity: 0.5,
          }} />

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
            fontStyle: 'italic',
            color: 'var(--muted)',
            lineHeight: 2,
            maxWidth: '360px',
          }}>
            A passionate fashion design student exploring creative storytelling,
            textile craft, and garment development.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        opacity: loaded ? 0.4 : 0,
        transition: 'opacity 1.2s ease 0.9s',
      }}>
        <p style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.5rem',
          letterSpacing: '0.45em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}>Scroll</p>
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, var(--terracotta), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .hero-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            gap: 2.5rem !important;
          }
          .hero-row > div:last-child {
            align-items: center !important;
          }
          .hero-row > div:last-child p:last-child {
            text-align: center;
          }
          .hero-img-wrap {
            width: clamp(160px, 48vw, 260px) !important;
          }
          .hero-divider { display: none !important; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .hero-img-wrap { width: clamp(140px, 55vw, 220px) !important; }
        }
      `}</style>
    </section>
  );
}