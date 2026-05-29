import React, { useRef, useState, useEffect } from 'react';

const illustrations = [
  {
    id: 1,
    image: '/design71.jpeg',
    title: 'The Moon Block',
    caption: 'Carved teak, natural pigment',
  },
  {
    id: 2,
    image: '/design41.png',
    title: 'Dabu Resist',
    caption: 'Clay resist on indigo ground',
  },
  {
    id: 3,
    image: '/design91.png',
    title: 'Festival Bloom',
    caption: 'Six-block floral registration',
  },
  {
    id: 4,
    image: '/design111.jpeg',
    title: 'Scarf Stories',
    caption: 'Double-face block printing',
  },
];

export default function Illustrations() {
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
      id="illustrations"
      ref={ref}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)',
        background: 'var(--deep-brown)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 70% 30%, rgba(139,58,42,0.15) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.65rem',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,130,0.6)',
              marginBottom: '1rem',
            }}
          >
            Illustrations
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.1,
            }}
          >
            Craft in Detail
          </h2>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--terracotta)',
              margin: '1.5rem auto 0',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5px',
          }}
        >
          {illustrations.map((item, i) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                aspectRatio: i % 2 === 0 ? '3/4' : '4/3',
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s ease ${i * 0.12}s`,
                cursor: 'pointer',
              }}
              className="illus-card"
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease',
                  filter: 'brightness(0.75)',
                }}
              />
              {/* Hover overlay */}
              <div
                className="illus-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(26,15,10,0)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  transition: 'background 0.4s ease',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant SC', serif",
                    fontSize: '1.1rem',
                    color: 'var(--cream)',
                    letterSpacing: '0.08em',
                    marginBottom: '0.3rem',
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: 'rgba(201,168,130,0.8)',
                  }}
                >
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '5rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.5s',
          }}
        >
          <p
            style={{
              fontFamily: "'IM Fell English', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: 'rgba(201,168,130,0.7)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            "Every block impression is a breath held — then released in color."
          </p>
        </div>
      </div>

      <style>{`
        .illus-card:hover img { transform: scale(1.06); filter: brightness(0.6) !important; }
        .illus-card:hover .illus-overlay { background: rgba(26,15,10,0.3) !important; }
      `}</style>
    </section>
  );
}
