import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS, getActiveVariant } from '../data/products';

export default function ProductDetails({
  activeProduct,
  selectedVariantIndices,
  onSelectVariant,
  onAddToCart,
}) {
  // Which product tab is showing in the details section
  const [selectedProductId, setSelectedProductId] = useState(
    activeProduct ? activeProduct.id : PRODUCTS[0].id
  );
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');

  // Keep the details tab in sync when the hero wheel changes the active product
  useEffect(() => {
    if (activeProduct) setSelectedProductId(activeProduct.id);
  }, [activeProduct?.id]);

  const currentProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const activeVariantIdx =
    selectedVariantIndices?.[currentProduct.id] ?? currentProduct.defaultVariantIndex;
  const activeVariant = currentProduct.variants[activeVariantIdx];

  const handleAdd = () => {
    onAddToCart(currentProduct, activeVariantIdx);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <section
      id="details"
      style={{
        paddingTop: '6rem',
        paddingBottom: '7rem',
        backgroundColor: 'var(--color-off-white)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container">
        {/* Product Tab Switcher */}
        <div
          className="details-tab-switcher"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProductId(p.id)}
              className="tab-switcher-btn"
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '30px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                backgroundColor:
                  p.id === currentProduct.id
                    ? 'var(--color-charcoal)'
                    : 'var(--color-warm-ivory)',
                color:
                  p.id === currentProduct.id
                    ? 'var(--color-warm-ivory)'
                    : 'var(--color-charcoal)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Main Detail Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            alignItems: 'center',
            backgroundColor: 'var(--color-warm-ivory)',
            padding: '3rem',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            width: '100%',
            boxSizing: 'border-box',
          }}
          className="details-grid"
        >
          {/* Left: Product Image */}
          <div
            style={{
              gridColumn: 'span 6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '420px',
              backgroundColor: 'var(--color-off-white)',
              borderRadius: '16px',
              padding: '2.5rem',
              border: '1px solid var(--color-border-subtle)',
              width: '100%',
              boxSizing: 'border-box',
            }}
            className="details-img-col"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentProduct.id}
                src={currentProduct.image}
                alt={currentProduct.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="details-img"
                style={{
                  width: '100%',
                  maxHeight: '380px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(32, 32, 30, 0.12))',
                }}
              />
            </AnimatePresence>
          </div>

          {/* Right: Info & Actions */}
          <div
            style={{
              gridColumn: 'span 6',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxSizing: 'border-box',
            }}
            className="details-info-col"
          >
            {/* Category */}
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-muted-olive)',
                marginBottom: '0.5rem',
              }}
            >
              {currentProduct.category}
            </span>

            {/* Product Name */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.4rem',
                fontWeight: 500,
                color: 'var(--color-charcoal)',
                marginBottom: '1.25rem',
                lineHeight: 1.15,
                wordBreak: 'break-word',
              }}
            >
              {currentProduct.name}
            </h2>

            {/* ── Size Selector ── */}
            <div style={{ marginBottom: '1.25rem', width: '100%' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: '0.6rem',
                }}
              >
                SIZE
              </span>
              <div 
                className="details-size-row"
                style={{ display: 'flex', gap: '0.6rem', width: '100%' }}
              >
                {currentProduct.variants.map((variant, vi) => {
                  const isSelected = vi === activeVariantIdx;
                  return (
                    <button
                      key={variant.size}
                      onClick={() => onSelectVariant(currentProduct.id, vi)}
                      aria-label={`Select ${variant.size} — ${variant.price}`}
                      aria-pressed={isSelected}
                      className="details-size-btn"
                      style={{
                        padding: '0.5rem 1.1rem',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
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
                          : '1px solid rgba(32,32,30,0.25)',
                        outline: 'none',
                      }}
                    >
                      {variant.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price (updates with selected variant) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeVariant.price}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--color-charcoal)',
                  }}
                >
                  {activeVariant.price}
                </motion.span>
              </AnimatePresence>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Taxes included. Free shipping.
              </span>
            </div>

            {/* Long Description */}
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.65,
                marginBottom: '2rem',
                maxWidth: '100%',
              }}
            >
              {currentProduct.longDescription}
            </p>

            {/* Ingredients / Directions Tabs */}
            <div
              style={{
                marginBottom: '2.25rem',
                borderTop: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  paddingTop: '1rem',
                  paddingBottom: '0.75rem',
                }}
              >
                {['ingredients', 'directions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color:
                        activeTab === tab
                          ? 'var(--color-charcoal)'
                          : 'var(--color-text-muted)',
                      borderBottom:
                        activeTab === tab
                          ? '2px solid var(--color-charcoal)'
                          : '2px solid transparent',
                      paddingBottom: '0.5rem',
                      background: 'none',
                      border: 'none',
                      borderBottomStyle: 'solid',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {tab === 'ingredients' ? 'Key Ingredients' : 'Directions'}
                  </button>
                ))}
              </div>

              <div style={{ padding: '1rem 0', minHeight: '90px', width: '100%' }}>
                {activeTab === 'ingredients' ? (
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      width: '100%',
                    }}
                  >
                    {currentProduct.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-muted-olive)',
                            flexShrink: 0,
                          }}
                        />
                        {ing}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                      maxWidth: '100%',
                    }}
                  >
                    {currentProduct.ritualInstruction}
                  </p>
                )}
              </div>
            </div>

            {/* Add to Bag CTA */}
            <button
              onClick={handleAdd}
              className="btn-primary details-add-to-bag-btn"
              style={{ 
                width: '100%', 
                padding: '1.1rem', 
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                boxSizing: 'border-box',
              }}
            >
              {addedSuccess ? (
                <>
                  <Check size={18} />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>
                    ADD TO BAG — {activeVariant.price} / {activeVariant.size}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #details {
            padding-top: 4.5rem !important;
            padding-bottom: 5rem !important;
          }
          .details-tab-switcher {
            gap: 0.5rem !important;
            margin-bottom: 2rem !important;
          }
          .tab-switcher-btn {
            padding: 0.55rem 1.1rem !important;
            font-size: 0.72rem !important;
            letter-spacing: 0.1em !important;
          }
          .details-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
            padding: 1.5rem 1.25rem !important;
            border-radius: 16px !important;
          }
          .details-img-col {
            min-height: auto !important;
            padding: 1.5rem 1rem !important;
            width: 100% !important;
          }
          .details-img {
            max-height: 260px !important;
          }
          .details-info-col {
            width: 100% !important;
          }
          .details-size-row {
            gap: 0.4rem !important;
          }
          .details-size-btn {
            flex: 1 1 0 !important;
            min-width: 0 !important;
            padding: 0.5rem 0.25rem !important;
            font-size: 0.75rem !important;
            text-align: center !important;
            white-space: nowrap !important;
          }
          .details-add-to-bag-btn {
            padding: 1rem 0.75rem !important;
            font-size: 0.78rem !important;
          }
        }

        @media (max-width: 360px) {
          .tab-switcher-btn {
            padding: 0.45rem 0.75rem !important;
            font-size: 0.68rem !important;
          }
          .details-add-to-bag-btn {
            font-size: 0.74rem !important;
            padding: 0.9rem 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
