import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductWheel({ activeIndex, setActiveIndex, onExplore }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine orbital dimensions based on screen width
  const getRadius = () => {
    if (windowWidth < 480) return { rx: 110, rz: 45, translateY: -10, cardHeight: 260 };
    if (windowWidth < 768) return { rx: 170, rz: 65, translateY: -15, cardHeight: 310 };
    if (windowWidth < 1100) return { rx: 240, rz: 90, translateY: -20, cardHeight: 380 };
    return { rx: 310, rz: 110, translateY: -20, cardHeight: 440 };
  };

  const { rx, rz, translateY, cardHeight } = getRadius();

  // Helper to handle Prev/Next
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="product-wheel-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: `${cardHeight + 100}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        userSelect: 'none',
      }}
    >
      {/* Subtle Orbital Background Platform Ring */}
      <div 
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          width: `${rx * 2 + 80}px`,
          height: `${rz * 2 + 40}px`,
          transform: 'translate(-50%, -50%) rotateX(72deg)',
          borderRadius: '50%',
          border: '1px solid rgba(32, 32, 30, 0.08)',
          boxShadow: 'inset 0 0 40px rgba(200, 191, 178, 0.25), 0 20px 50px rgba(32, 32, 30, 0.04)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      
      {/* Soft Ambient Spotlight Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          width: '280px',
          height: '280px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(235, 230, 221, 0.8) 0%, rgba(245, 242, 235, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 3D Circular Orbit Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '850px',
          height: `${cardHeight}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          zIndex: 5,
        }}
      >
        {PRODUCTS.map((product, index) => {
          // Calculate relative position around the 3-item circle
          // index 0, 1, 2
          let relIndex = (index - activeIndex + PRODUCTS.length) % PRODUCTS.length;
          
          // Map relIndex: 0 = Front (0 deg), 1 = Back-Right (120 deg), 2 = Back-Left (240 deg)
          let angleDeg = 0;
          if (relIndex === 1) angleDeg = 120;
          if (relIndex === 2) angleDeg = -120; // 240 deg is -120 deg
          
          const angleRad = (angleDeg * Math.PI) / 180;
          
          const x = rx * Math.sin(angleRad);
          const z = rz * (Math.cos(angleRad) - 1); // Z ranges from 0 (front) to -2*rz (back)
          
          // Depth factor d in [0, 1]: 1 is front, 0 is furthest back
          const depthFactor = (Math.cos(angleRad) + 1) / 2;
          
          const isFront = relIndex === 0;
          
          const scale = 0.65 + depthFactor * 0.42; // Front ~1.07, Back ~0.65
          const opacity = 0.5 + depthFactor * 0.5; // Front 1.0, Back 0.5
          const blurVal = (1 - depthFactor) * 4; // Front 0px, Back 4px
          const zIndexVal = Math.round(depthFactor * 100);

          return (
            <motion.div
              key={product.id}
              onClick={() => {
                if (!isFront) {
                  setActiveIndex(index);
                }
              }}
              initial={false}
              animate={{
                x: x,
                z: z,
                y: translateY * (1 - depthFactor),
                scale: scale,
                opacity: opacity,
                filter: `blur(${blurVal}px) brightness(${78 + depthFactor * 22}%)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 22,
                mass: 0.9,
              }}
              style={{
                position: 'absolute',
                width: windowWidth < 600 ? '220px' : '320px',
                height: `${cardHeight}px`,
                cursor: isFront ? 'default' : 'pointer',
                zIndex: zIndexVal,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
              }}
              whileHover={!isFront ? { scale: scale * 1.05, opacity: opacity + 0.15 } : {}}
            >
              {/* Product Card Container */}
              <div 
                className="product-3d-card"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  background: isFront 
                    ? 'radial-gradient(ellipse at center, rgba(250, 249, 246, 0.95) 0%, rgba(245, 242, 235, 0.6) 100%)' 
                    : 'transparent',
                  border: isFront ? '1px solid rgba(32, 32, 30, 0.08)' : '1px solid transparent',
                  boxShadow: isFront ? '0 25px 50px -12px rgba(32, 32, 30, 0.1)' : 'none',
                  transition: 'all 0.4s ease',
                }}
              >
                {/* Product Image Frame */}
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: '12px',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: isFront ? 'drop-shadow(0 15px 25px rgba(32, 32, 30, 0.15))' : 'none',
                      transition: 'all 0.5s ease',
                    }}
                  />
                </div>

                {/* Subtle Product Label Badge */}
                <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                  <span 
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: isFront ? '0.75rem' : '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: isFront ? 'var(--color-charcoal)' : 'var(--color-text-muted)',
                      display: 'block',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {product.name}
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.7rem',
                      color: 'var(--color-muted-olive)',
                      display: isFront ? 'block' : 'none',
                      marginTop: '0.2rem',
                    }}
                  >
                    {product.size}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hero Wheel Navigation Controls */}
      <div 
        style={{
          position: 'relative',
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          zIndex: 20,
        }}
      >
        {/* Previous Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous product"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'var(--color-off-white)',
            color: 'var(--color-charcoal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s var(--ease-out-expo)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-charcoal)';
            e.currentTarget.style.color = 'var(--color-warm-ivory)';
            e.currentTarget.style.transform = 'translateX(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-off-white)';
            e.currentTarget.style.color = 'var(--color-charcoal)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Pagination Dots & Product Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {PRODUCTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${p.name}`}
              style={{
                width: idx === activeIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: idx === activeIndex ? 'var(--color-charcoal)' : 'var(--color-soft-taupe)',
                transition: 'all 0.4s var(--ease-out-expo)',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Next Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next product"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'var(--color-off-white)',
            color: 'var(--color-charcoal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s var(--ease-out-expo)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-charcoal)';
            e.currentTarget.style.color = 'var(--color-warm-ivory)';
            e.currentTarget.style.transform = 'translateX(3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-off-white)';
            e.currentTarget.style.color = 'var(--color-charcoal)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Swipe instruction hint for touch users */}
      <div 
        style={{
          marginTop: '0.75rem',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          opacity: 0.75,
        }}
      >
        <span>Swipe or use arrows to rotate wheel</span>
      </div>
    </div>
  );
}
