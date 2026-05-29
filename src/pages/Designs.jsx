import React, { useRef, useState, useEffect } from 'react';
import { designs } from '../data/designs';
import DesignDetail from '../components/DesignDetail';

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
        transition: `all 0.7s ease ${index * 0.07}s`,
        position: 'relative',
        background: 'var(--cream)',
      }}
    >
      {/* Image */}
      <div
        style={{
          aspectRatio: index % 5 === 0 ? '3/4' : index % 3 === 0 ? '1/1' : '4/5',
          overflow: 'hidden',
          background: 'var(--parchment)',
          position: 'relative',
        }}
      >
        <img
          src={design.coverImage}
          alt={design.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            filter: hovered ? 'brightness(0.8)' : 'brightness(1)',
          }}
        />

        {/* Image count badge */}
        {design.images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              color: 'var(--cream)',
              background: 'rgba(26,15,10,0.5)',
              backdropFilter: 'blur(4px)',
              padding: '0.3rem 0.6rem',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            {design.images.length} images
          </div>
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--cream)',
              border: '1px solid rgba(245,240,232,0.6)',
              padding: '0.6rem 1.2rem',
              background: 'rgba(26,15,10,0.3)',
              backdropFilter: 'blur(4px)',
            }}
          >
            View Design
          </div>
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          padding: '1.2rem 0 1.5rem',
          borderBottom: '1px solid rgba(139,58,42,0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: 'var(--terracotta)',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
                opacity: 0.7,
              }}
            >
              {design.tag}
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '1.15rem',
                fontWeight: 400,
                color: 'var(--deep-brown)',
                lineHeight: 1.2,
              }}
            >
              {design.title}
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'var(--muted)',
                marginTop: '0.2rem',
              }}
            >
              {design.subtitle}
            </p>
          </div>
          <div
            style={{
              color: 'var(--terracotta)',
              fontSize: '0.75rem',
              opacity: hovered ? 1 : 0.3,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              marginTop: '4px',
            }}
          >
            →
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Designs() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
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
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
              flexWrap: 'wrap',
              gap: '1.5rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease',
            }}
          >
            <div>
              <p className="section-label" style={{ marginBottom: '1rem' }}>
                Kalika Designs
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  fontWeight: 300,
                  color: 'var(--deep-brown)',
                  lineHeight: 1.1,
                }}
              >
                The Collection
              </h2>
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: 'var(--muted)',
                maxWidth: '320px',
                textAlign: 'right',
                lineHeight: 1.7,
              }}
            >
              Click any piece to explore the full story behind each design.
            </p>
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)',
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

          {/* Bottom note */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 'clamp(4rem, 7vw, 6rem)',
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.6s',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'var(--terracotta)',
                margin: '0 auto 1.5rem',
                opacity: 0.4,
              }}
            />
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--muted)',
              }}
            >
              New drops every season · DM on Instagram for custom orders
            </p>
          </div>
        </div>
      </section>

      {/* Design Detail Overlay */}
      {selectedDesign && (
        <DesignDetail
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}
    </>
  );
}
