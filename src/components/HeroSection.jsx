import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BRAND, PRODUCTS, getActiveVariant } from '../data/products';
import ProductWheel from './ProductWheel';

export default function HeroSection({
  activeIndex,
  setActiveIndex,
  onExploreProduct,
  selectedVariantIndices,
}) {
  const activeProduct = PRODUCTS[activeIndex];
  const activeVariant = getActiveVariant(activeProduct, selectedVariantIndices);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
        backgroundColor: 'var(--color-warm-ivory)',
      }}
    >
      {/* Editorial Background Radial Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '55vw',
          height: '55vw',
          maxHeight: '650px',
          maxWidth: '650px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(232,221,203,0.55) 0%, rgba(245,242,235,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Desktop Editorial Grid: Left Info + Right Wheel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            className="hero-text-col"
          >
            {/* Eyebrow & Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
              }}
            >
              <span className="eyebrow">{BRAND.eyebrow}</span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: 'var(--color-muted-olive)',
                }}
              >
                0{activeIndex + 1} / 0{PRODUCTS.length}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="heading-hero" style={{ marginBottom: '1.25rem' }}>
              {BRAND.heroHeadline}
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                maxWidth: '420px',
                lineHeight: 1.6,
              }}
            >
              {BRAND.heroSubhead}
            </p>

            {/* Active Product Info Card */}
            <div
              style={{
                position: 'relative',
                padding: '1.75rem',
                borderRadius: '12px',
                background: 'rgba(250, 249, 246, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {/* Category & Size */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-muted-olive)',
                      }}
                    >
                      {activeProduct.category}
                    </span>
                    <span
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--color-charcoal)',
                      }}
                    >
                      {activeVariant.size}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.85rem',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                      color: 'var(--color-charcoal)',
                    }}
                  >
                    {activeProduct.name}
                  </h2>

                  {/* Short Description */}
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--color-text-muted)',
                      marginBottom: '1.5rem',
                      lineHeight: 1.55,
                    }}
                  >
                    {activeProduct.description}
                  </p>

                  {/* Price & CTA row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--color-charcoal)',
                      }}
                    >
                      {activeVariant.price}
                    </span>

                    <button
                      className="btn-primary"
                      onClick={() => onExploreProduct(activeProduct)}
                      style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem' }}
                    >
                      <span>{activeProduct.cta}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: 3D Wheel */}
          <div
            style={{
              gridColumn: 'span 7',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="hero-wheel-col"
          >
            <ProductWheel
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onExplore={onExploreProduct}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-text-col {
            grid-column: span 12 !important;
            margin-bottom: 2.5rem;
            text-align: center;
            align-items: center;
          }
          .hero-wheel-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
