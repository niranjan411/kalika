import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--deep-brown)',
        padding: 'clamp(4rem, 7vw, 6rem) clamp(1.5rem, 5vw, 5rem) 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '5%',
          right: '5%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201,168,130,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gap: 'clamp(3rem, 5vw, 5rem)',
            marginBottom: '4rem',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img
                src="/logo (2).jpg"
                alt="Kalika"
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,168,130,0.25)',
                  padding: '4px',
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant SC', serif",
                    fontSize: '1.2rem',
                    color: 'var(--cream)',
                    letterSpacing: '0.15em',
                  }}
                >
                  Kalika
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant SC', serif",
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    color: 'rgba(201,168,130,0.5)',
                    textTransform: 'uppercase',
                  }}
                >
                  Designs
                </p>
              </div>
            </div>
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(201,168,130,0.6)',
                lineHeight: 1.85,
                fontStyle: 'italic',
                maxWidth: '260px',
              }}
            >
              Hand-blocked. Homegrown. Made with heart, not algorithms.
            </p>
            
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.4em',
                color: 'rgba(201,168,130,0.4)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Navigation
            </p>
            {['About', 'Design Skills',  'Process', 'Designs' , 'Other'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const id = item === 'SOT' ? 'sot' : item === 'Process' ? 'process' : item.toLowerCase();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'block',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.1rem',
                  color: 'rgba(201,168,130,0.6)',
                  marginBottom: '0.7rem',
                  transition: 'color 0.3s ease',
                  fontStyle: 'italic',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--cream)')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(201,168,130,0.6)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Craft info */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant SC', serif",
                fontSize: '0.6rem',
                letterSpacing: '0.4em',
                color: 'rgba(201,168,130,0.4)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              The Craft
            </p>
            {[
              'Hand Block Printing',
              'Natural Dye Process',
              'Artisan Collaboration',
              'Slow Fashion',
              'Custom Orders',
            ].map((item) => (
              <p
                key={item}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'rgba(201,168,130,0.5)',
                  marginBottom: '0.6rem',
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(201,168,130,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant SC', serif",
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              color: 'rgba(201,168,130,0.3)',
              textTransform: 'uppercase',
            }}
          >
             Kalika Designs · कलिका
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '0.85rem',
              color: 'rgba(201,168,130,0.3)',
            }}
          >
       Designed & developed by{" "}
  <a
    href="https://wa.me/917385583461?text=Hi%20Niranjan,%20I%20want%20to%20know%20more%20about%20website%20development."
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#613f2bff",
      textDecoration: "underline",
    }}
  >
    niranjanmemane@gmail.com </a>

          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
