import React, { useState, useEffect } from 'react';

export default function DesignDetail({ design, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imageCount = design.images.length;

  useEffect(() => {
    setLoaded(false);
    setCurrentImage(0);
    const t = setTimeout(() => setLoaded(true), 60);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [design]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentImage(p => (p + 1) % imageCount);
      if (e.key === 'ArrowLeft')  setCurrentImage(p => (p - 1 + imageCount) % imageCount);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, imageCount]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'var(--warm-white)',
      overflow: 'auto',
      opacity: loaded ? 1 : 0,
      transform: loaded ? 'translateY(0)' : 'translateY(18px)',
      transition: 'all 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
    }}>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '1.2rem',
          right: '1.5rem',
          zIndex: 2100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          padding: '0.55rem 0.9rem',
          border: '1px solid rgba(139,58,42,0.2)',
          background: 'rgba(250,247,242,0.92)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--terracotta)';
          e.currentTarget.style.color = 'var(--cream)';
          e.currentTarget.style.borderColor = 'var(--terracotta)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(250,247,242,0.92)';
          e.currentTarget.style.color = 'var(--muted)';
          e.currentTarget.style.borderColor = 'rgba(139,58,42,0.2)';
        }}
      >
        ← Back
      </button>

      {/* Breadcrumb */}
      <div style={{
        padding: 'clamp(4.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 0',
      }}>
        <p style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.58rem',
          letterSpacing: '0.38em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}>
          Kalika Designs &nbsp;/&nbsp; {design.tag}
        </p>
      </div>

      {/* Main layout */}
      <div
        className="detail-grid"
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 5vw, 4rem) 5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: 'clamp(2.5rem, 5vw, 5rem)',
          alignItems: 'start',
        }}
      >
        {/* ── Left: images ── */}
        <div>
          {/* Main image */}
          <div style={{
            width: '100%',
            overflow: 'hidden',
            background: 'var(--parchment)',
            aspectRatio: imageCount === 1 ? '3/4' : '4/5',
            position: 'relative',
          }}>
            <img
              src={design.images[currentImage]}
              alt={design.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transition: 'opacity 0.4s ease',
              }}
            />

            {/* Prev / Next arrows */}
            {imageCount > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(p => (p - 1 + imageCount) % imageCount)}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '38px', height: '38px',
                    background: 'rgba(250,247,242,0.85)',
                    border: '1px solid rgba(139,58,42,0.2)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                    color: 'var(--mid-brown)',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--terracotta)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(250,247,242,0.85)'; e.currentTarget.style.color = 'var(--mid-brown)'; }}
                >←</button>
                <button
                  onClick={() => setCurrentImage(p => (p + 1) % imageCount)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '38px', height: '38px',
                    background: 'rgba(250,247,242,0.85)',
                    border: '1px solid rgba(139,58,42,0.2)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                    color: 'var(--mid-brown)',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--terracotta)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(250,247,242,0.85)'; e.currentTarget.style.color = 'var(--mid-brown)'; }}
                >→</button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {imageCount > 1 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(imageCount, 6)}, 1fr)`,
              gap: '2px',
              marginTop: '2px',
            }}>
              {design.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  style={{
                    aspectRatio: '1',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    outline: i === currentImage
                      ? '2px solid var(--terracotta)'
                      : '2px solid transparent',
                    outlineOffset: '-2px',
                    transition: 'outline 0.2s ease',
                  }}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      filter: i === currentImage ? 'brightness(1)' : 'brightness(0.6)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Full grid of all images */}
          {imageCount > 2 && (
            <div style={{ marginTop: '2.5rem' }}>
              <p style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.58rem',
                letterSpacing: '0.32em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
              }}>
                Full Collection
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: imageCount >= 4 ? '1fr 1fr' : '1fr 1fr 1fr',
                gap: '2px',
              }}>
                {design.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    style={{
                      aspectRatio: '3/4',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      outline: i === currentImage
                        ? '2px solid var(--terracotta)'
                        : '2px solid transparent',
                      outlineOffset: '-2px',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${design.title} ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: info panel ── */}
        <div style={{ position: 'sticky', top: '4.5rem' }}>

          {/* Tag pill */}
          <div style={{
            display: 'inline-block',
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.58rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--terracotta)',
            border: '1px solid rgba(139,58,42,0.25)',
            padding: '0.3rem 0.75rem',
            marginBottom: '1.3rem',
          }}>
            {design.tag}
          </div>

          <h1 style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: 'var(--deep-brown)',
            lineHeight: 1.05,
            marginBottom: '0.4rem',
          }}>
            {design.title}
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--muted)',
            marginBottom: '1.3rem',
          }}>
            {design.subtitle}
          </p>

          <div style={{
            width: '28px', height: '1px',
            background: 'var(--terracotta)',
            marginBottom: '1.3rem',
            opacity: 0.5,
          }} />

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--mid-brown)',
            lineHeight: 1.9,
            fontStyle: 'italic',
            marginBottom: '1.6rem',
          }}>
            {design.description}
          </p>

          {/* Style details */}
          <div style={{ marginBottom: '1.6rem' }}>
            <p style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.58rem',
              letterSpacing: '0.28em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}>
              Style Details
            </p>
            {design.details.map((d, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                padding: '0.55rem 0',
                borderBottom: '1px solid rgba(139,58,42,0.1)',
              }}>
                <span style={{
                  color: 'var(--terracotta)',
                  fontSize: '0.7rem',
                  marginTop: '3px',
                  flexShrink: 0,
                }}>✦</span>
                <span style={{
                  fontSize: '0.98rem',
                  color: 'var(--mid-brown)',
                  lineHeight: 1.55,
                }}>
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Process note */}
          <div style={{
            background: 'var(--cream)',
            padding: '1.3rem 1.5rem',
            borderLeft: '3px solid var(--terracotta)',
            marginBottom: '1.8rem',
          }}>
            <p style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.55rem',
              letterSpacing: '0.28em',
              color: 'var(--terracotta)',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
              opacity: 0.7,
            }}>
              The Craft
            </p>
            <p style={{
              fontSize: '0.98rem',
              color: 'var(--muted)',
              lineHeight: 1.85,
              fontStyle: 'italic',
            }}>
              {design.process}
            </p>
          </div>

          {/* Dot counter */}
          {imageCount > 1 && (
            <div style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              marginBottom: '1.3rem',
            }}>
              {design.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  style={{
                    width: i === currentImage ? '22px' : '7px',
                    height: '2px',
                    background: i === currentImage
                      ? 'var(--terracotta)'
                      : 'rgba(139,58,42,0.22)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
              <span style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                color: 'var(--muted)',
                marginLeft: '0.4rem',
              }}>
                {currentImage + 1} / {imageCount}
              </span>
            </div>
          )}

          <button
            onClick={onClose}
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--cream)',
              background: 'var(--terracotta)',
              padding: '0.9rem 2rem',
              width: '100%',
              border: '1px solid var(--terracotta)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--brick)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--terracotta)'}
          >
            ← Back to All Designs
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
          .detail-grid > div:last-child {
            position: static !important;
          }
        }
        @media (max-width: 480px) {
          .detail-grid {
            padding: 1rem 1.2rem 4rem !important;
          }
        }
      `}</style>
    </div>
  );
}