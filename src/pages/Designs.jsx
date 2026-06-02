import React, { useRef, useState, useEffect } from 'react';
import { designs } from '../data/designs';
import DesignDetail from '../components/DesignDetail';

const brandImages = [
  '/img01.jpeg',
  '/img02.jpeg',
  '/img03.jpeg',
  '/img04.jpeg',
  '/img05.jpeg',
  '/img06.jpeg',
  '/img07.jpeg',
  '/img08.jpeg',
  '/img09.png',
  '/img10.jpeg',
  '/img11.jpeg',
  '/img12.jpeg',
  '/img13.jpeg',
  '/img14.jpeg',
];

function BrandGallery({ visible }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      {/* ── Section label ── */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease 0.12s',
        marginBottom: '1.5rem',
      }}>
        <p style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.58rem',
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '0.5rem',
        }}>
          Brand Images
        </p>
        <div style={{
          width: '36px', height: '1.5px',
          background: 'var(--terracotta)',
          opacity: 0.5,
        }} />
      </div>

      {/* ── Masonry-style grid ── */}
      <div
        className="brand-gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6px',
          marginBottom: 'clamp(4rem, 7vw, 6rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease 0.18s, transform 0.9s ease 0.18s',
        }}
      >
        {brandImages.map((src, i) => (
          <BrandImageTile key={i} src={src} index={i} onClick={() => setLightbox(i)} />
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26,15,10,0.92)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox(p => (p - 1 + brandImages.length) % brandImages.length); }}
            style={{
              position: 'absolute', left: 'clamp(0.5rem, 3vw, 2rem)', top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1px solid rgba(201,168,130,0.3)',
              color: 'rgba(201,168,130,0.7)',
              width: '42px', height: '42px',
              cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'serif',
            }}
          >←</button>

          <img
            src={brandImages[lightbox]}
            alt={`Brand image ${lightbox + 1}`}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '88vw',
              maxHeight: '88vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox(p => (p + 1) % brandImages.length); }}
            style={{
              position: 'absolute', right: 'clamp(0.5rem, 3vw, 2rem)', top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1px solid rgba(201,168,130,0.3)',
              color: 'rgba(201,168,130,0.7)',
              width: '42px', height: '42px',
              cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'serif',
            }}
          >→</button>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              background: 'transparent',
              border: '1px solid rgba(201,168,130,0.25)',
              color: 'rgba(201,168,130,0.6)',
              width: '36px', height: '36px',
              cursor: 'pointer', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>

          {/* Counter */}
          <p style={{
            position: 'absolute', bottom: '1.2rem',
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            color: 'rgba(201,168,130,0.4)',
          }}>
            {lightbox + 1} / {brandImages.length}
          </p>
        </div>
      )}
    </>
  );
}

function BrandImageTile({ src, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Make some tiles span 2 cols or 2 rows for visual variety
  const spans = [
    { gridColumn: 'span 2' },   // img01 — wide
    {},                          // img02
    {},                          // img03
    {},                          // img04
    {},                          // img05
    { gridColumn: 'span 2' },   // img06 — wide
    {},                          // img07
    {},                          // img08
    {},                          // img09
    { gridColumn: 'span 2' },   // img10 — wide
    {},                          // img11
    {},                          // img12
    {},                          // img13
    { gridColumn: 'span 2' },   // img14 — wide
  ];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...(spans[index] || {}),
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        background: 'var(--parchment)',
        lineHeight: 0,
      }}
    >
      <img
        src={src}
        alt={`Brand ${index + 1}`}
        style={{
          width: '100%',
          aspectRatio: spans[index]?.gridColumn === 'span 2' ? '16/9' : '4/5',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          filter: hovered ? 'brightness(0.75)' : 'brightness(1)',
        }}
      />
      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.5rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--cream)',
          border: '1px solid rgba(245,240,232,0.45)',
          padding: '0.4rem 0.9rem',
          background: 'rgba(26,15,10,0.22)',
        }}>
          View
        </span>
      </div>
    </div>
  );
}

function DesignCard({ design, index, onClick, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(design)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.06}s, transform 0.7s ease ${index * 0.06}s`,
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        aspectRatio: '3/4',
        overflow: 'hidden',
        background: 'var(--parchment)',
        position: 'relative',
        flexShrink: 0,
      }}>
        <img
          src={design.coverImage}
          alt={design.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transition: 'transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: hovered ? 'brightness(0.72)' : 'brightness(1)',
          }}
        />

        {/* Image count badge */}
        {design.images.length > 1 && (
          <div style={{
            position: 'absolute',
            top: '0.8rem',
            right: '0.8rem',
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.5rem',
            letterSpacing: '0.18em',
            color: 'var(--cream)',
            background: 'rgba(26,15,10,0.52)',
            backdropFilter: 'blur(4px)',
            padding: '0.22rem 0.5rem',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}>
            {design.images.length} images
          </div>
        )}

        {/* Hover CTA */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.58rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--cream)',
            border: '1px solid rgba(245,240,232,0.55)',
            padding: '0.5rem 1.1rem',
            background: 'rgba(26,15,10,0.25)',
            backdropFilter: 'blur(6px)',
          }}>
            View Design
          </span>
        </div>
      </div>

      {/* Info bar below image */}
      <div style={{
        padding: '0.9rem 0 1.1rem',
        borderBottom: '1px solid rgba(139,58,42,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
        flexGrow: 1,
      }}>
        <h3 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
          fontWeight: 400,
          color: 'var(--deep-brown)',
          lineHeight: 1.25,
          letterSpacing: '0.04em',
          minWidth: 0,
        }}>
          {design.title}
        </h3>
        <span style={{
          color: 'var(--terracotta)',
          fontSize: '0.75rem',
          opacity: hovered ? 1 : 0.2,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
          flexShrink: 0,
        }}>
          →
        </span>
      </div>
    </div>
  );
}

export default function Designs() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.04 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="designs"
        ref={ref}
        style={{
          padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
          background: 'var(--warm-white)',
        }}
      >
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

          {/* ── Section label ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(25px)',
            transition: 'all 0.8s ease',
            marginBottom: '2.5rem',
          }}>
            <p className="section-label">
              Clothing Brand
            </p>
          </div>

          {/* ── "Kalika Edit" heading ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(25px)',
            transition: 'all 0.8s ease 0.05s',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}>
            <h2 style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              color: 'var(--deep-brown)',
              lineHeight: 1.0,
              marginBottom: '0',
            }}>
              Kalika Edit
            </h2>
          </div>

          {/* ── Logo + tagline block ── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
            marginBottom: 'clamp(3rem, 5vw, 4rem)',
            background: 'var(--cream)',
            position: 'relative',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.9s ease 0.1s',
          }}>
            {/* Decorative corner marks */}
            {[
              { top: '16px', left: '16px', borderTop: '1px solid', borderLeft: '1px solid' },
              { top: '16px', right: '16px', borderTop: '1px solid', borderRight: '1px solid' },
              { bottom: '16px', left: '16px', borderBottom: '1px solid', borderLeft: '1px solid' },
              { bottom: '16px', right: '16px', borderBottom: '1px solid', borderRight: '1px solid' },
            ].map((s, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '20px', height: '20px',
                borderColor: 'rgba(139,58,42,0.2)',
                borderStyle: 'solid',
                borderWidth: 0,
                ...s,
              }} />
            ))}

            {/* Logo */}
            <div style={{
              opacity: logoLoaded ? 1 : 0,
              transform: logoLoaded ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
              transition: 'all 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
              marginBottom: 'clamp(1.8rem, 3vw, 2.5rem)',
            }}>
              <img
                src="/logo2.2.png"
                alt="Kalika"
                onLoad={() => setLogoLoaded(true)}
                style={{
                  width: 'clamp(160px, 22vw, 260px)',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Divider */}
            <div style={{
              width: '36px', height: '1px',
              background: 'var(--terracotta)',
              opacity: 0.4,
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            }} />

            {/* Tagline */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
              color: 'var(--mid-brown)',
              lineHeight: 2,
              maxWidth: '520px',
              margin: '0 auto',
            }}>
              From a blooming bud to blossoming bonds.
              <br />
              Kalika is here — hand block–printed love made for you and yours.
              <br />
              <span style={{
                fontFamily: "'Cormorant SC', serif",
                fontStyle: 'normal',
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                color: 'var(--terracotta)',
                textTransform: 'uppercase',
                opacity: 0.8,
              }}>
                Made in India, stitched with emotion.
              </span>
            </p>
          </div>

          {/* ── Brand Images Gallery ── */}
          <BrandGallery visible={visible} />

          {/* ── Divider before collections ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(139,58,42,0.12)' }} />
            <p style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.58rem',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              whiteSpace: 'nowrap',
            }}>
              The Collections
            </p>
            <div style={{ flex: 1, height: '1px', background: 'rgba(139,58,42,0.12)' }} />
          </div>

          {/* ── Designs grid ── */}
          <div
            className="designs-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'clamp(2.5rem, 4vw, 3.5rem) clamp(1rem, 2.5vw, 2rem)',
            }}
          >
            {designs.map((design, i) => (
              <DesignCard
                key={design.id}
                design={design}
                index={i}
                onClick={setSelectedDesign}
                visible={visible}
              />
            ))}
          </div>

        </div>
      </section>

      {selectedDesign && (
        <DesignDetail
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}

      <style>{`
        /* Tablet */
        @media (max-width: 768px) {
          .designs-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important;
            gap: 2rem 1rem !important;
          }
          .brand-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .designs-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.8rem 0.75rem !important;
          }
          .brand-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Very small */
        @media (max-width: 320px) {
          .designs-grid {
            grid-template-columns: 1fr !important;
          }
          .brand-gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}