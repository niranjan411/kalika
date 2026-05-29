import React, { useRef, useState, useEffect } from 'react';

const steps = [
  {
    num: '01',
    title: 'Concept & Sketch',
    description:
      'Every design begins as a rough sketch — often inspired by traditional motifs, nature, or a fabric feel. The sketch is refined until the pattern repeats cleanly.',
    icon: '✦',
  },
  {
    num: '02',
    title: 'Block Carving',
    description:
      'Skilled karigars carve the pattern into seasoned teak wood. Each block is hand-filed for clean edges. A complex motif can take 3–4 days to carve.',
    icon: '◈',
  },
  {
    num: '03',
    title: 'Fabric Preparation',
    description:
      'Cloth is washed, starched lightly, and stretched on printing tables. Alignment markers are set so the block register repeats accurately across the length.',
    icon: '◻',
  },
  {
    num: '04',
    title: 'Dye Mixing',
    description:
      'Natural dyes — indigo, madder, pomegranate, iron — are prepared fresh. Ratios are adjusted for the season, fabric weight, and desired depth of color.',
    icon: '◉',
  },
  {
    num: '05',
    title: 'Block Printing',
    description:
      'The block is pressed firmly, evenly, then lifted cleanly. This is the heartbeat of the process — one impression at a time, across metres of fabric.',
    icon: '▣',
  },
  {
    num: '06',
    title: 'Drying & Fixing',
    description:
      'Printed cloth is sun-dried, then heat-fixed. Natural dyes are further fixed with alum mordants. The color deepens, settles, becomes permanent.',
    icon: '☀',
  },
  {
    num: '07',
    title: 'Cutting & Stitching',
    description:
      'Fabric is cut with attention to print placement — motifs must fall correctly at hems, centers, and cuffs. Stitched by skilled tailors with French seams.',
    icon: '✂',
  },
  {
    num: '08',
    title: 'Quality & Dispatch',
    description:
      'Each piece is inspected, steamed, and folded. Packed in recycled kraft with a handwritten note. Sent with love — and zero plastic.',
    icon: '♡',
  },
];

export default function DesignProcess() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
        background: 'var(--warm-white)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3.5rem, 7vw, 6rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p className="section-label" style={{ marginBottom: '1rem' }}>
            Design Process
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
            From Block to Body
          </h2>
          <div
            style={{
              width: '40px',
              height: '1.5px',
              background: 'var(--terracotta)',
              margin: '1.5rem auto 0',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Process steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0',
            position: 'relative',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                padding: 'clamp(1.8rem, 3vw, 2.5rem)',
                borderRight: i % 4 !== 3 ? '1px solid rgba(139,58,42,0.12)' : 'none',
                borderBottom: i < 4 ? '1px solid rgba(139,58,42,0.12)' : 'none',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(25px)',
                transition: `all 0.6s ease ${i * 0.07}s`,
                position: 'relative',
              }}
              className="process-step"
            >
              {/* Step number */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1.2rem',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant SC', serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                    color: 'var(--terracotta)',
                    opacity: 0.6,
                    paddingTop: '4px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.num}
                </span>
                <span
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--terracotta)',
                    opacity: 0.5,
                  }}
                >
                  {step.icon}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant SC', serif",
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  color: 'var(--deep-brown)',
                  marginBottom: '0.8rem',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--muted)',
                  lineHeight: 1.8,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom image strip */}
        <div
          style={{
            marginTop: 'clamp(4rem, 7vw, 6rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5px',
            height: 'clamp(200px, 30vw, 320px)',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.5s',
          }}
        >
          {['/design51.jpeg', '/design61.jpeg', '/design21.jpeg'].map((img, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img
                src={img}
                alt="Process"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease',
                  filter: i === 1 ? 'none' : 'brightness(0.85)',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process-step:hover {
          background: rgba(139,58,42,0.025);
          transition: background 0.3s ease !important;
        }
        @media (max-width: 768px) {
          .process-step {
            border-right: none !important;
            border-bottom: 1px solid rgba(139,58,42,0.12) !important;
          }
        }
      `}</style>
    </section>
  );
}
