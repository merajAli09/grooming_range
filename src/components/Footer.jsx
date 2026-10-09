import React from 'react';
import { BRAND } from '../data/products';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-warm-ivory)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '5rem',
        paddingBottom: '3rem',
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1rem' }}>
              <span 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                }}
              >
                {BRAND.name}
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  color: 'var(--color-muted-olive)',
                }}
              >
                {BRAND.descriptor}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '300px', lineHeight: 1.6 }}>
              {BRAND.tagline} Everyday essentials engineered for clarity and purpose.
            </p>
          </div>

          {/* Product Nav Column */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem', color: 'var(--color-charcoal)' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => scrollToSection('hero')} style={{ color: 'var(--color-text-muted)' }}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} style={{ color: 'var(--color-text-muted)' }}>
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ritual')} style={{ color: 'var(--color-text-muted)' }}>
                  The Ritual
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('philosophy')} style={{ color: 'var(--color-text-muted)' }}>
                  Our Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem', color: 'var(--color-charcoal)' }}>
              Concierge
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              <li>{BRAND.contactEmail}</li>
              <li>Instagram: {BRAND.instagram}</li>
              <li>Mon — Fri 09:00 — 18:00 EST</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span>© {currentYear} {BRAND.name} {BRAND.descriptor}. All rights reserved.</span>
          <span>Temporary Brand Prototype</span>
        </div>
      </div>
    </footer>
  );
}
