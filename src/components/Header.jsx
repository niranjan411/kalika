import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Illustrations', href: '#illustrations' },
  { label: 'SOT', href: '#sot' },
  { label: 'Process', href: '#process' },
  { label: 'Designs', href: '#designs' },
];

export default function Header({ onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onNavClick) onNavClick(id);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          background: scrolled ? 'rgba(250, 247, 242, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(139, 58, 42, 0.15)' : '1px solid transparent',
          padding: scrolled ? '0.75rem 2.5rem' : '1.25rem 2.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleLink(e, '#hero')}
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: scrolled ? '1.5rem' : '1.1rem',
              fontWeight: 600,
              color: 'var(--terracotta)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              transition: 'all 0.4s ease',
              opacity: scrolled ? 1 : 0,
              pointerEvents: scrolled ? 'auto' : 'none',
            }}
          >
            Kalika
          </a>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '0.75rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--mid-brown)',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--terracotta)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--mid-brown)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              zIndex: 1100,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1.5px',
                  background: 'var(--terracotta)',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(4.5px, 4.5px)'
                        : i === 1
                        ? 'scaleX(0)'
                        : 'rotate(-45deg) translate(4.5px, -4.5px)'
                      : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'var(--warm-white)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Kalika Designs
        </p>
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLink(e, link.href)}
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '2rem',
              color: 'var(--deep-brown)',
              letterSpacing: '0.15em',
              fontWeight: 300,
              transition: 'color 0.3s ease',
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {link.label}
          </a>
        ))}
        <div
          style={{
            marginTop: '2rem',
            width: '40px',
            height: '1px',
            background: 'var(--terracotta)',
            opacity: 0.5,
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
