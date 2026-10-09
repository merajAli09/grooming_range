import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';

export default function RitualSection({ onSelectStep }) {
  return (
    <section 
      id="ritual" 
      style={{
        paddingTop: '7rem',
        paddingBottom: '7rem',
        backgroundColor: 'var(--color-warm-ivory)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section Title */}
        <div 
          style={{
            textAlign: 'center',
            marginBottom: '5rem',
            maxWidth: '650px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'block' }}>
            THE DAILY ROUTINE
          </span>
          <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
            THREE STEPS. YOUR RITUAL.
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            A streamlined three-step sequence designed for effortless morning and evening application.
          </p>
        </div>

        {/* 3 Step Sequence Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            position: 'relative',
          }}
        >
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                borderRadius: '16px',
                backgroundColor: 'var(--color-off-white)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Step Number Badge */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-20px',
                  backgroundColor: 'var(--color-charcoal)',
                  color: 'var(--color-warm-ivory)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {product.ritualStep}
              </div>

              {/* Product Visual Anchor */}
              <div 
                style={{
                  width: '180px',
                  height: '220px',
                  marginTop: '1rem',
                  marginBottom: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 15px rgba(32, 32, 30, 0.08))',
                  }}
                />
              </div>

              {/* Action Name */}
              <span 
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted-olive)',
                  marginBottom: '0.35rem',
                }}
              >
                Step {product.ritualStep} — {product.ritualAction}
              </span>

              <h3 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  marginBottom: '0.75rem',
                }}
              >
                {product.name}
              </h3>

              <p 
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {product.ritualInstruction}
              </p>

              {/* Optional Step trigger */}
              <button
                onClick={() => onSelectStep(index, product)}
                className="btn-secondary"
                style={{
                  marginTop: 'auto',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.7rem',
                }}
              >
                Explore Step {product.ritualStep}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
