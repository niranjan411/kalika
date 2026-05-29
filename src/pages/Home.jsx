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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'var(--warm-white)',
        overflow: 'hidden',
        padding: '6rem 2rem 4rem',
      }}
    >
      {/* Decorative background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(139, 58, 42, 0.04) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(200, 168, 130, 0.08) 0%, transparent 50%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Thin vertical lines decoration */}
      <div
        style={{
          position: 'absolute',
          left: '5%',
          top: '15%',
          bottom: '15%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(139,58,42,0.2), transparent)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '5%',
          top: '15%',
          bottom: '15%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(139,58,42,0.2), transparent)',
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          marginBottom: '2rem',
        }}
      >
        <img
          src="/logo (2).jpg"
          alt="Kalika Logo"
          style={{
            width: '90px',
            height: '90px',
            objectFit: 'contain',
            borderRadius: '50%',
            border: '1.5px solid rgba(139,58,42,0.25)',
            padding: '6px',
            background: 'var(--cream)',
          }}
        />
      </div>

      {/* Main title */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '700px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.65rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '1.5rem',
          }}
        >
          कलिका · Handcrafted with heart
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
            fontWeight: 300,
            color: 'var(--deep-brown)',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
            marginBottom: '0.5rem',
          }}
        >
          Kalika
        </h1>

        <h2
          style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 300,
            color: 'var(--terracotta)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          Designs
        </h2>

        <div
          style={{
            width: '40px',
            height: '1.5px',
            background: 'var(--terracotta)',
            margin: '0 auto 2rem',
            opacity: 0.6,
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: 'var(--muted)',
            lineHeight: 1.9,
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          Made with heart, not algorithms.
          <br />
          Hand-blocked. Homegrown.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: loaded ? 0.5 : 0,
          transition: 'opacity 1.2s ease 0.8s',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            color: 'var(--muted)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </p>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--terracotta), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
