import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { BRAND } from '../data/products';

// ─── Header beige colour ─────────────────────────────────────────────────────
const HEADER_BG   = '#E8DDCB';
const HEADER_TEXT = '#25231F';
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        backgroundColor: HEADER_BG,
        borderBottom: scrolled
          ? '1px solid rgba(37, 35, 31, 0.14)'
          : '1px solid rgba(37, 35, 31, 0.08)',
        boxShadow: scrolled
          ? '0 6px 24px rgba(37, 35, 31, 0.07)'
          : '0 2px 8px rgba(37, 35, 31, 0.04)',
        transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '68px' : '82px',
          transition: 'height 0.35s ease',
        }}
      >
        {/* ── Brand Wordmark ── */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.45rem',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: HEADER_TEXT,
            }}
          >
            {BRAND.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.64rem',
              fontWeight: 700,
              letterSpacing: '0.26em',
              color: '#737764',
              textTransform: 'uppercase',
            }}
          >
            {BRAND.descriptor}
          </span>
        </a>

        {/* ── Desktop nav links ── */}
        <nav
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
        >
          {['products', 'ritual', 'philosophy'].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="nav-link-beige"
            >
              {id === 'products' ? 'Products' : id === 'ritual' ? 'The Ritual' : 'Our Philosophy'}
            </button>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              color: HEADER_TEXT,
              transition: 'transform 0.2s ease',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: HEADER_TEXT,
                  color: HEADER_BG,
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              padding: '0.5rem',
              color: HEADER_TEXT,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile overlay menu ── */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: scrolled ? '68px' : '82px',
            left: 0,
            width: '100%',
            height: `calc(100vh - ${scrolled ? '68px' : '82px'})`,
            backgroundColor: HEADER_BG,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.25rem',
            zIndex: 90,
            borderTop: '1px solid rgba(37, 35, 31, 0.1)',
          }}
        >
          {[
            { id: 'products',   label: 'Products' },
            { id: 'ritual',     label: 'The Ritual' },
            { id: 'philosophy', label: 'Our Philosophy' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              style={{
                fontSize: '1.3rem',
                fontFamily: 'var(--font-serif)',
                letterSpacing: '0.08em',
                color: HEADER_TEXT,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .nav-link-beige {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${HEADER_TEXT};
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          padding: 0.25rem 0;
          transition: color 0.25s ease;
        }
        .nav-link-beige::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background-color: ${HEADER_TEXT};
          transition: width 0.3s ease;
        }
        .nav-link-beige:hover::after { width: 100%; }

        @media (max-width: 768px) {
          .desktop-nav   { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
