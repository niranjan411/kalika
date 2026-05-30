import React, { useRef, useState, useEffect } from 'react';

const concepts = [
  {
    id: 1,
    image: '/dolce_&_gabbana.png',
    title: 'Dolce & Gabbana',
    caption: 'Fashion Concept Development',
    description:
      'A celebration of Italian luxury, bold maximalism, and timeless craftsmanship. Draws inspiration from heritage, romance, and cultural storytelling — rich in detail, unapologetically expressive.',
  },
  {
    id: 2,
    image: '/suta.png',
    title: 'Suta',
    caption: 'Fashion Concept Development',
    description:
      'An ode to simplicity, comfort, and the beauty of everyday Indian textiles. Reimagines traditional sarees through thoughtful craftsmanship and contemporary storytelling.',
  },
  {
    id: 3,
    image: '/tranquil.png',
    title: 'Tranquil',
    caption: 'A Beachwear Edition',
    description:
      "Inspired by the quiet poetry of flowing drapes and nature's calm embrace. Soft whites, airy silhouettes, and delicate mint undertones — effortless, serene, coastal.",
  },
  {
    id: 4,
    image: '/kesar.png',
    title: 'Kesar',
    caption: 'A Celebration of Light',
    description:
      'Rooted in the warmth of the kesar bloom and the vibrancy of Indian festivities. Radiant orange hues meet fluid drapes — confidence, femininity, and festive glow.',
  },
  {
    id: 5,
    image: '/haveli.png',
    title: 'Haveli',
    caption: 'A Tale of Two Cultures',
    description:
      'Inspired by the architectural grandeur of Rajasthan and the timeless grace of Maharashtra. Rich textiles and regal palettes weave a narrative of cultural harmony.',
  },
];

const illustrations = [
  { id: 1, image: '/Illustration11.jpeg', title: 'Illustration I' },
  { id: 2, image: '/Illustration12.jpeg', title: 'Illustration II' },
  { id: 3, image: '/Illustration13.png',  title: 'Illustration III' },
];

function useVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function ConceptCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);

  // Grid placement per your spec
  const gridStyles = [
    { gridColumn: 'span 3 / span 3', gridRowStart: '1' },  // div1 — Dolce
    { gridRowStart: '2' },                                   // div2 — Suta
    { gridRowStart: '2' },                                   // div3 — Tranquil
    { gridRowStart: '2' },                                   // div4 — Kesar
    { gridColumn: 'span 3 / span 3', gridRowStart: '3' },  // div5 — Haveli
  ];

  const isFullWidth = index === 0 || index === 4;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...gridStyles[index],
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, box-shadow 0.4s ease`,
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--parchment)',
        cursor: 'default',
        boxShadow: hovered ? '0 24px 60px rgba(26,15,10,0.35)' : 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: isFullWidth ? '21/8' : '4/5',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            filter: hovered ? 'brightness(0.5)' : 'brightness(0.75)',
          }}
        />

        {/* Bottom gradient + text overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(26,15,10,0.82) 0%, rgba(26,15,10,0.15) 40%, transparent 65%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: isFullWidth
              ? 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)'
              : 'clamp(1.2rem, 3vw, 2rem)',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.55rem',
              letterSpacing: '0.38em',
              color: 'rgba(201,168,130,0.7)',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            {item.caption}
          </p>

          <h3
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: isFullWidth
                ? 'clamp(1.8rem, 3.5vw, 3rem)'
                : 'clamp(1.2rem, 2vw, 1.7rem)',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.05,
              marginBottom: hovered ? '0.9rem' : '0',
              transition: 'margin 0.4s ease',
            }}
          >
            {item.title}
          </h3>

          {/* Description slides up on hover */}
          <div
            style={{
              maxHeight: hovered ? '140px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: isFullWidth ? '1.05rem' : '0.92rem',
                color: 'rgba(245,240,232,0.82)',
                lineHeight: 1.8,
                maxWidth: isFullWidth ? '600px' : 'none',
              }}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesignSkills() {
  const [conceptRef, conceptVisible] = useVisible(0.05);
  const [illusRef, illusVisible]     = useVisible(0.1);

  return (
    <section id="design-skills">

      {/* ── 2.1 Fashion Concept Development ── */}
      <div
        style={{
          padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
          background: 'var(--deep-brown)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial bg glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(ellipse at 70% 30%, rgba(139,58,42,0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div
          ref={conceptRef}
          style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}
        >
          {/* Section header */}
          <div
            style={{
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
              opacity: conceptVisible ? 1 : 0,
              transform: conceptVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,130,0.5)',
                marginBottom: '0.8rem',
              }}
            >
              Design Skills · 2.1
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 300,
                color: 'var(--cream)',
                lineHeight: 1.1,
              }}
            >
              Fashion Concept
              <br />
              <em style={{ color: 'var(--sand)', fontStyle: 'italic' }}>
                Development
              </em>
            </h2>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'var(--terracotta)',
                marginTop: '1.5rem',
                opacity: 0.6,
              }}
            />
          </div>

          {/* ── Concept grid matching your CSS spec exactly ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, auto)',
              gap: '8px',
            }}
            className="concept-grid"
          >
            {concepts.map((item, i) => (
              <ConceptCard
                key={item.id}
                item={item}
                index={i}
                visible={conceptVisible}
              />
            ))}
          </div>

          {/* Bottom quote */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '5rem',
              opacity: conceptVisible ? 1 : 0,
              transition: 'opacity 1s ease 0.6s',
            }}
          >
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                color: 'rgba(201,168,130,0.6)',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: 1.85,
              }}
            >
              "Every collection is a conversation between tradition and the present."
            </p>
          </div>
        </div>
      </div>

      {/* ── 2.2 Freehand Illustration ── */}
      <div
        ref={illusRef}
        style={{
          padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
          background: 'var(--cream)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Section header */}
          <div
            style={{
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
              opacity: illusVisible ? 1 : 0,
              transform: illusVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease',
            }}
          >
            <p className="section-label" style={{ marginBottom: '0.8rem' }}>
              Design Skills · 2.2
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 300,
                color: 'var(--deep-brown)',
                lineHeight: 1.1,
              }}
            >
              Freehand
              <br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>
                Illustration
              </em>
            </h2>
            <div
              style={{
                width: '40px',
                height: '1.5px',
                background: 'var(--terracotta)',
                marginTop: '1.5rem',
                opacity: 0.6,
              }}
            />
          </div>

          {/* ── Illustration grid: 3 equal columns, images natural height ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(1, 1fr)',
              gap: '8px',
            }}
            className="illus-grid"
          >
            {illustrations.map((item, i) => (
              <div
                key={item.id}
                style={{
                  opacity: illusVisible ? 1 : 0,
                  transform: illusVisible ? 'translateY(0)' : 'translateY(35px)',
                  transition: `all 0.7s ease ${i * 0.12}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
                className="illus-card"
              >
                <div
                  style={{
                    width: '100%',
                    overflow: 'hidden',
                    background: 'var(--parchment)',
                    boxShadow: '0 8px 30px rgba(26,15,10,0.1)',
                    position: 'relative',
                    lineHeight: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <div
                    className="illus-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(139,58,42,0)',
                      transition: 'background 0.4s ease',
                    }}
                  />
                </div>

                <p
                  style={{
                    fontFamily: "'Cormorant SC', serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.28em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1,
                  }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Collapse grid to 2-col on tablet */
        @media (max-width: 900px) {
          .concept-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .concept-grid > *:nth-child(1),
          .concept-grid > *:nth-child(5) {
            grid-column: span 2 !important;
          }
          .concept-grid > *:nth-child(2),
          .concept-grid > *:nth-child(3),
          .concept-grid > *:nth-child(4) {
            grid-row-start: auto !important;
          }
        }

        /* Single column on mobile */
        @media (max-width: 600px) {
          .concept-grid,
          .illus-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .concept-grid > * {
            grid-column: span 1 !important;
            grid-row-start: auto !important;
          }
        }

        .illus-card:hover img { transform: scale(1.03); }
        .illus-card:hover .illus-overlay { background: rgba(139,58,42,0.06) !important; }
      `}</style>
    </section>
  );
}