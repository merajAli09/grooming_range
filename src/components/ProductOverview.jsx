import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS, getActiveVariant } from '../data/products';

export default function ProductOverview({
  activeIndex,
  setActiveIndex,
  onSelectProduct,
  selectedVariantIndices,
  onSelectVariant,
}) {
  return (
    <section
      id="products"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: 'var(--color-off-white)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>
            THE ESSENTIAL RANGE
          </span>
          <h2 className="heading-section">Considered Formulations</h2>
          <p
            style={{
              marginTop: '0.75rem',
              color: 'var(--color-text-muted)',
              fontSize: '1rem',
              maxWidth: '540px',
            }}
          >
            Every product engineered for purpose, simplicity, and performance.
          </p>
        </div>

        {/* 3-Product Grid */}
        <div
          className="product-overview-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.5rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {PRODUCTS.map((product, idx) => {
            const activeVariantIdx =
              selectedVariantIndices?.[product.id] ?? product.defaultVariantIndex;
            const activeVariant = product.variants[activeVariantIdx];

            return (
              <motion.div
                key={product.id}
                className="product-overview-card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--color-warm-ivory)',
                  borderRadius: '12px',
                  border:
                    idx === activeIndex
                      ? '1px solid var(--color-charcoal)'
                      : '1px solid var(--color-border)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Category */}
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-muted-olive)',
                    marginBottom: '1.25rem',
                    display: 'block',
                  }}
                >
                  {product.category}
                </span>

                {/* Product Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '260px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    background: 'rgba(250, 249, 246, 0.6)',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Product Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    fontWeight: 500,
                    marginBottom: '0.45rem',
                    color: 'var(--color-charcoal)',
                  }}
                >
                  {product.name}
                </h3>

                {/* Short Description */}
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.55,
                    marginBottom: '1.25rem',
                    flexGrow: 1,
                  }}
                >
                  {product.description}
                </p>

                {/* ── Size Selector ── */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {product.variants.map((variant, vi) => {
                    const isSelected = vi === activeVariantIdx;
                    return (
                      <button
                        key={variant.size}
                        onClick={() => onSelectVariant(product.id, vi)}
                        aria-label={`Select ${variant.size} — ${variant.price}`}
                        aria-pressed={isSelected}
                        style={{
                          padding: '0.35rem 0.8rem',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          cursor: 'pointer',
                          transition: 'all 0.22s ease',
                          backgroundColor: isSelected
                            ? 'var(--color-charcoal)'
                            : 'transparent',
                          color: isSelected
                            ? 'var(--color-warm-ivory)'
                            : 'var(--color-charcoal)',
                          border: isSelected
                            ? '1px solid var(--color-charcoal)'
                            : '1px solid var(--color-border)',
                        }}
                      >
                        {variant.size}
                      </button>
                    );
                  })}
                </div>

                {/* Card Footer: Price + View Detail */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--color-charcoal)',
                    }}
                  >
                    {activeVariant.price}
                  </span>

                  <button
                    onClick={() => {
                      setActiveIndex(idx);
                      onSelectProduct(product);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-charcoal)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--color-muted-olive)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--color-charcoal)')
                    }
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .product-overview-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 767px) {
          #products {
            padding-top: 4.5rem !important;
            padding-bottom: 4.5rem !important;
          }
          .product-overview-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.75rem !important;
          }
          .product-overview-card {
            padding: 1.5rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
