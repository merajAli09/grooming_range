import React from 'react';
import { BRAND } from '../data/products';

export default function BrandPhilosophy() {
  return (
    <section 
      id="philosophy" 
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        backgroundColor: 'var(--color-charcoal)',
        color: 'var(--color-warm-ivory)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Editorial Background Accent Lines */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          border: '1px solid rgba(245, 242, 235, 0.05)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div 
          style={{
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          <span 
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-soft-taupe)',
              display: 'block',
              marginBottom: '1.5rem',
            }}
          >
            OUR PHILOSOPHY
          </span>

          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 5.5vw, 4.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '1.75rem',
              color: 'var(--color-warm-ivory)',
              wordBreak: 'break-word',
            }}
          >
            {BRAND.philosophyHeadline}
          </h2>

          <p 
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
              color: 'var(--color-soft-taupe)',
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '3.5rem',
            }}
          >
            {BRAND.philosophySubhead}
          </p>

          {/* Three Core Brand Pillars */}
          <div 
            className="philosophy-pillars-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2.5rem',
              textAlign: 'left',
              borderTop: '1px solid rgba(245, 242, 235, 0.12)',
              paddingTop: '3rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-soft-taupe)', letterSpacing: '0.15em' }}>01</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginTop: '0.3rem', marginBottom: '0.5rem' }}>Purity of Intent</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-soft-taupe)', opacity: 0.8, lineHeight: 1.55 }}>
                No unnecessary complexity. Each formula contains only essential, high-performance ingredients.
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-soft-taupe)', letterSpacing: '0.15em' }}>02</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginTop: '0.3rem', marginBottom: '0.5rem' }}>Considered Craft</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-soft-taupe)', opacity: 0.8, lineHeight: 1.55 }}>
                Engineered for optimal absorption, pleasant tactile feel, and invisible daily wear.
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-soft-taupe)', letterSpacing: '0.15em' }}>03</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginTop: '0.3rem', marginBottom: '0.5rem' }}>Effortless Habit</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-soft-taupe)', opacity: 0.8, lineHeight: 1.55 }}>
                Designed to integrate seamlessly into your morning and night routine in under two minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #philosophy {
            padding-top: 5rem !important;
            padding-bottom: 5rem !important;
          }
          .philosophy-pillars-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
            padding-top: 2.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
