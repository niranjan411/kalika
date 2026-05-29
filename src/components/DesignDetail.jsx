import React, { useState, useEffect } from 'react';

export default function DesignDetail({ design, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imageCount = design.images.length;

  useEffect(() => {
    setLoaded(false);
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
      if (e.key === 'ArrowRight') setCurrentImage((p) => (p + 1) % imageCount);
      if (e.key === 'ArrowLeft') setCurrentImage((p) => (p - 1 + imageCount) % imageCount);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, imageCount]);

  const layoutSingle = imageCount === 1;
  const layoutDouble = imageCount === 2;
  const layoutTriple = imageCount === 3;
  const layoutQuad = imageCount === 4;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'var(--warm-white)',
        overflow: 'auto',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '2rem',
          zIndex: 2100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          padding: '0.6rem 1rem',
          border: '1px solid rgba(139,58,42,0.2)',
          background: 'rgba(250,247,242,0.9)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--terracotta)';
          e.currentTarget.style.color = 'var(--cream)';
          e.currentTarget.style.borderColor = 'var(--terracotta)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(250,247,242,0.9)';
          e.currentTarget.style.color = 'var(--muted)';
          e.currentTarget.style.borderColor = 'rgba(139,58,42,0.2)';
        }}
      >
        ← Back to Designs
      </button>

      {/* Breadcrumb */}
      <div
        style={{
          padding: '2rem clamp(1.5rem, 5vw, 4rem) 0',
          paddingTop: '5rem',
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
          Kalika Designs &nbsp;/&nbsp; {design.tag}
        </p>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem) 5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: 'clamp(3rem, 5vw, 6rem)',
          alignItems: 'start',
        }}
        className="detail-grid"
      >
        {/* Images section */}
        <div>
          {/* Main featured image */}
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              background: 'var(--parchment)',
              marginBottom: '1px',
              aspectRatio: layoutSingle ? '4/5' : '16/9',
            }}
          >
            <img
              src={design.images[currentImage]}
              alt={design.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'all 0.5s ease',
              }}
            />
          </div>

          {/* Thumbnail strip for multi-image */}
          {imageCount > 1 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${imageCount}, 1fr)`,
                gap: '1px',
                marginTop: '1px',
              }}
            >
              {design.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  style={{
                    aspectRatio: '1',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    outline: i === currentImage ? '2px solid var(--terracotta)' : '2px solid transparent',
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
                      filter: i === currentImage ? 'brightness(1)' : 'brightness(0.65)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Multi-image layout showcase */}
          {(layoutTriple || layoutQuad) && (
            <div
              style={{
                marginTop: '3rem',
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.35em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Full Collection
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: layoutQuad ? '1fr 1fr' : '1fr 1fr 1fr',
                  gap: '2px',
                }}
              >
                {design.images.map((img, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '3/4',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={() => setCurrentImage(i)}
                  >
                    <img
                      src={img}
                      alt={`${design.title} ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div style={{ position: 'sticky', top: '5rem' }}>
          {/* Tag */}
          <div
            style={{
              display: 'inline-block',
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--terracotta)',
              border: '1px solid rgba(139,58,42,0.25)',
              padding: '0.35rem 0.8rem',
              marginBottom: '1.5rem',
            }}
          >
            {design.tag}
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'var(--deep-brown)',
              lineHeight: 1.05,
              marginBottom: '0.5rem',
            }}
          >
            {design.title}
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--muted)',
              marginBottom: '1.5rem',
            }}
          >
            {design.subtitle}
          </p>

          <div
            style={{
              width: '30px',
              height: '1px',
              background: 'var(--terracotta)',
              marginBottom: '1.5rem',
              opacity: 0.5,
            }}
          />

          <p
            style={{
              fontSize: '1.08rem',
              color: 'var(--mid-brown)',
              lineHeight: 1.9,
              fontStyle: 'italic',
              marginBottom: '1.8rem',
            }}
          >
            {design.description}
          </p>

          {/* Details list */}
          <div style={{ marginBottom: '2rem' }}>
            <p
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Details
            </p>
            {design.details.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.8rem',
                  alignItems: 'flex-start',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid rgba(139,58,42,0.1)',
                }}
              >
                <span style={{ color: 'var(--terracotta)', fontSize: '0.8rem', marginTop: '2px' }}>
                  ✓
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--mid-brown)', lineHeight: 1.5 }}>
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Process note */}
          <div
            style={{
              background: 'var(--cream)',
              padding: '1.5rem',
              borderLeft: '3px solid var(--terracotta)',
              marginBottom: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: 'var(--terracotta)',
                textTransform: 'uppercase',
                marginBottom: '0.8rem',
                opacity: 0.7,
              }}
            >
              The Making
            </p>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
                fontStyle: 'italic',
              }}
            >
              {design.process}
            </p>
          </div>

          {/* Image counter */}
          {imageCount > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              {design.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  style={{
                    width: i === currentImage ? '24px' : '8px',
                    height: '1.5px',
                    background: i === currentImage ? 'var(--terracotta)' : 'rgba(139,58,42,0.25)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--muted)',
                  marginLeft: '0.5rem',
                }}
              >
                {currentImage + 1} / {imageCount}
              </span>
            </div>
          )}

          <button
            onClick={onClose}
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--cream)',
              background: 'var(--terracotta)',
              padding: '1rem 2.5rem',
              width: '100%',
              transition: 'all 0.3s ease',
              border: '1px solid var(--terracotta)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--brick)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--terracotta)';
            }}
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
        }
      `}</style>
    </div>
  );
}
