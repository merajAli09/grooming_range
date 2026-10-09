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

      <div className="container" style={{ position: 'relative', zIndex: 10, boxSizing: 'border-box', width: '100%' }}>
        {/* Editorial Layout: Left Info + Right Wheel */}
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Left Column */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              boxSizing: 'border-box',
            }}
            className="hero-text-col"
          >
            {/* Eyebrow & Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                width: '100%',
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
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                maxWidth: '440px',
                lineHeight: 1.6,
              }}
            >
              {BRAND.heroSubhead}
            </p>

            {/* Active Product Info Card */}
            <div
              className="hero-info-card"
              style={{
                position: 'relative',
                padding: '1.75rem',
                borderRadius: '12px',
                background: 'rgba(250, 249, 246, 0.88)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ width: '100%' }}
                >
                  {/* Category & Size */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      width: '100%',
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
                      fontSize: '1.75rem',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                      color: 'var(--color-charcoal)',
                      lineHeight: 1.2,
                    }}
                  >
                    {activeProduct.name}
                  </h2>

                  {/* Short Description */}
                  <p
                    style={{
                      fontSize: '0.9rem',
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
                      gap: '1rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--color-charcoal)',
                      }}
                    >
                      {activeVariant.price}
                    </span>

                    <button
                      className="btn-primary"
                      onClick={() => onExploreProduct(activeProduct)}
                      style={{ 
                        padding: '0.75rem 1.4rem', 
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                      }}
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
              width: '100%',
              boxSizing: 'border-box',
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
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2.5rem !important;
            width: 100% !important;
          }
          .hero-text-col {
            width: 100% !important;
            max-width: 580px !important;
            margin: 0 auto !important;
            text-align: center !important;
            align-items: center !important;
          }
          .hero-wheel-col {
            width: 100% !important;
            max-width: 100% !important;
          }
        }

        @media (max-width: 768px) {
          #hero {
            padding-top: 5rem !important;
            padding-bottom: 2.5rem !important;
            min-height: auto !important;
          }
          .hero-info-card {
            padding: 1.25rem !important;
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
