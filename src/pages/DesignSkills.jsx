import React, { useRef, useState, useEffect } from 'react';

const concepts = [
  {
    id: 1,
    image: '/dolce_&_gabbana.png',
    title: 'Dolce & Gabbana',
    caption: 'Brand Concept',
    description:
      'A celebration of Italian luxury, bold maximalism, and timeless craftsmanship. Draws inspiration from heritage, romance, and cultural storytelling — rich in detail, unapologetically expressive.',
  },
  {
    id: 2,
    image: '/suta.png',
    title: 'Suta',
    caption: 'Brand Concept',
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
  { id: 4, image: '/Illustration14.png',  title: 'Illustration IV' },
  { id: 5, image: '/Illustration15.png',  title: 'Illustration V' },
  { id: 6, image: '/Illustration16.png',  title: 'Illustration VI' },
];

const sotImages = [
  { id: 1, image: '/sot1.png' },
  { id: 2, image: '/sot2.png' },
  { id: 3, image: '/sot3.png' },
  { id: 4, image: '/sot4.png' },
  { id: 5, image: '/sot5.png' },
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

/* ── Desktop grid placement (unchanged) ── */
const gridStyles = [
  { gridColumn: 'span 3 / span 3', gridRowStart: '1' },
  { gridRowStart: '2' },
  { gridRowStart: '2' },
  { gridRowStart: '2' },
  { gridColumn: 'span 3 / span 3', gridRowStart: '3' },
];

function ConceptCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);
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
        background: 'var(--parchment)',
        boxShadow: hovered ? '0 24px 60px rgba(26,15,10,0.35)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="concept-card"
    >
      {/* ── Image ── */}
      <div
        className="concept-img-wrap"
        style={{
          width: '100%',
          aspectRatio: isFullWidth ? '21/8' : '4/5',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
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
            filter: hovered ? 'brightness(0.5)' : 'brightness(0.82)',
          }}
        />

        {/* Gradient overlay — desktop only */}
        <div
          className="concept-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(26,15,10,0.88) 0%, rgba(26,15,10,0.2) 45%, transparent 68%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: isFullWidth
              ? 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)'
              : 'clamp(1.2rem, 3vw, 2rem)',
          }}
        >
          <p style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: '0.52rem',
            letterSpacing: '0.38em',
            color: 'rgba(201,168,130,0.75)',
            textTransform: 'uppercase',
            marginBottom: '0.35rem',
          }}>
            {item.caption}
          </p>

          <h3 style={{
            fontFamily: "'Cormorant SC', serif",
            fontSize: isFullWidth
              ? 'clamp(1.8rem, 3.5vw, 3rem)'
              : 'clamp(1.1rem, 2vw, 1.6rem)',
            fontWeight: 300,
            color: 'var(--cream)',
            lineHeight: 1.05,
            marginBottom: hovered ? '0.8rem' : '0',
            transition: 'margin 0.4s ease',
          }}>
            {item.title}
          </h3>

          <div style={{
            maxHeight: hovered ? '140px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: isFullWidth ? '1.05rem' : '0.92rem',
              color: 'rgba(245,240,232,0.85)',
              lineHeight: 1.8,
              maxWidth: isFullWidth ? '600px' : 'none',
            }}>
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Below-image text — always visible, shown/hidden via CSS ── */}
      <div
        className="concept-below-text"
        style={{
          padding: '1rem 1.2rem 1.4rem',
          borderTop: '1px solid rgba(139,58,42,0.12)',
          background: 'var(--parchment)',
        }}
      >
        <p style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '0.52rem',
          letterSpacing: '0.35em',
          color: 'var(--terracotta)',
          textTransform: 'uppercase',
          marginBottom: '0.3rem',
          opacity: 0.75,
        }}>
          {item.caption}
        </p>
        <h3 style={{
          fontFamily: "'Cormorant SC', serif",
          fontSize: '1.2rem',
          fontWeight: 400,
          color: 'var(--deep-brown)',
          lineHeight: 1.15,
          marginBottom: '0.5rem',
        }}>
          {item.title}
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '0.92rem',
          color: 'var(--muted)',
          lineHeight: 1.85,
        }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function DesignSkills() {
  const [conceptRef, conceptVisible] = useVisible(0.05);
  const [illusRef,   illusVisible]   = useVisible(0.08);
  const [sotRef,     sotVisible]     = useVisible(0.08);

  return (
    <section id="design-skills">

      {/* ── Brand Creation ── */}
      <div style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
        background: 'var(--deep-brown)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 70% 30%, rgba(139,58,42,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div ref={conceptRef} style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>

          {/* Header */}
          <div style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: conceptVisible ? 1 : 0,
            transform: conceptVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <p style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.6rem',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,130,0.5)',
              marginBottom: '0.8rem',
            }}>
              Design Skills
            </p>
            <h2 style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.1,
            }}>
              Brand
              <br />
              <em style={{ color: 'var(--sand)', fontStyle: 'italic' }}>Creation</em>
            </h2>
            <div style={{
              width: '40px', height: '1px',
              background: 'var(--terracotta)',
              marginTop: '1.5rem', opacity: 0.6,
            }} />
          </div>

          {/* ── Desktop grid (3-col layout per spec) ── */}
          <div
            className="concept-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, auto)',
              gap: '8px',
            }}
          >
            {concepts.map((item, i) => (
              <ConceptCard key={item.id} item={item} index={i} visible={conceptVisible} />
            ))}
          </div>

          {/* Quote */}
          <div style={{
            textAlign: 'center',
            marginTop: '5rem',
            opacity: conceptVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.6s',
          }}>
            <p style={{
              fontFamily: "'IM Fell English', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              color: 'rgba(201,168,130,0.6)',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.85,
            }}>
              "Every collection is a conversation between tradition and the present."
            </p>
          </div>
        </div>
      </div>

      {/* ── Freehand Illustration ── */}
      <div ref={illusRef} style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
        background: 'var(--cream)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: illusVisible ? 1 : 0,
            transform: illusVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}>
            <p className="section-label" style={{ marginBottom: '0.8rem' }}>
              Design Skills
            </p>
            <h2 style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 300,
              color: 'var(--deep-brown)',
              lineHeight: 1.1,
            }}>
              Freehand
              <br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Illustration</em>
            </h2>
            <div style={{
              width: '40px', height: '1.5px',
              background: 'var(--terracotta)',
              marginTop: '1.5rem', opacity: 0.6,
            }} />
          </div>

          <div
            className="illus-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {illustrations.map((item, i) => (
              <div
                key={item.id}
                className="illus-card"
                style={{
                  opacity: illusVisible ? 1 : 0,
                  transform: illusVisible ? 'translateY(0)' : 'translateY(35px)',
                  transition: `all 0.7s ease ${i * 0.1}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <div style={{
                  width: '100%',
                  overflow: 'hidden',
                  background: 'var(--parchment)',
                  boxShadow: '0 6px 24px rgba(26,15,10,0.1)',
                  position: 'relative',
                  lineHeight: 0,
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <div className="illus-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(139,58,42,0)',
                    transition: 'background 0.4s ease',
                  }} />
                </div>
                <p style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1,
                  paddingBottom: '0.4rem',
                }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SOT Images ── */}
      <div ref={sotRef} style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        background: 'var(--warm-white)',
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            opacity: sotVisible ? 1 : 0,
            transform: sotVisible ? 'translateY(0)' : 'translateY(25px)',
            transition: 'all 0.8s ease',
          }}>
            <p className="section-label" style={{ marginBottom: '0.8rem' }}>
              Design Skills
            </p>
            <h2 style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--deep-brown)',
              lineHeight: 1.1,
            }}>
              Statement of
              <br />
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>Thought</em>
            </h2>
            <div style={{
              width: '36px', height: '1.5px',
              background: 'var(--terracotta)',
              margin: '1.4rem auto 0', opacity: 0.6,
            }} />
          </div>

          <div
            className="sot-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
            }}
          >
            {sotImages.map((item, i) => (
              <div
                key={item.id}
                className="sot-img-wrap"
                style={{
                  gridColumn: i === 4 ? 'span 2' : 'span 1',
                  overflow: 'hidden',
                  background: 'var(--parchment)',
                  opacity: sotVisible ? 1 : 0,
                  transform: sotVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.7s ease ${i * 0.1}s`,
                  lineHeight: 0,
                }}
              >
                <img
                  src={item.image}
                  alt={`SOT ${i + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    aspectRatio: '2000/1414',
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`

        /* ════════════════════
           DESKTOP
        ════════════════════ */

        /* On desktop: hide the below-text block, use overlay instead */
        .concept-below-text { display: none; }
        .concept-overlay    { display: flex; }

        .concept-card { transition: box-shadow 0.4s ease; }
        .illus-card:hover img { transform: scale(1.03); }
        .illus-card:hover .illus-overlay { background: rgba(139,58,42,0.06) !important; }
        .sot-img-wrap:hover img { transform: scale(1.03); }


        /* ════════════════════
           TABLET  ≤ 900px
        ════════════════════ */
        @media (max-width: 900px) {
          .concept-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto !important;
          }
          .concept-grid > *:nth-child(1),
          .concept-grid > *:nth-child(5) {
            grid-column: span 2 !important;
          }
          .concept-grid > * {
            grid-row-start: auto !important;
          }
          .concept-img-wrap {
            aspect-ratio: 4/3 !important;
          }
          .concept-grid > *:nth-child(1) .concept-img-wrap,
          .concept-grid > *:nth-child(5) .concept-img-wrap {
            aspect-ratio: 21/8 !important;
          }
        }


        /* ════════════════════
           MOBILE  ≤ 580px
        ════════════════════ */
        @media (max-width: 580px) {

          /* Single column, full width with side margin */
          .concept-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
            gap: 20px !important;
          }
          .concept-grid > * {
            grid-column: span 1 !important;
            grid-row-start: auto !important;
            /* card fills width minus the section padding already applied */
            width: 100%;
          }

          /* Image fills full card width, natural portrait ratio */
          .concept-img-wrap {
            aspect-ratio: 3/4 !important;
            width: 100% !important;
          }

          /* Hide on-image overlay on mobile */
          .concept-overlay { display: none !important; }

          /* Show below-image text block */
          .concept-below-text { display: block !important; }

          /* Illustrations: 2 col → 1 col for very small */
          .illus-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }

          /* SOT: single column */
          .sot-grid { grid-template-columns: 1fr !important; }
          .sot-grid > * { grid-column: span 1 !important; }
          .sot-img-wrap img { aspect-ratio: 4/3 !important; }
        }


        /* ════════════════════
           VERY SMALL  ≤ 380px
        ════════════════════ */
        @media (max-width: 380px) {
          .illus-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}