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
    if (windowWidth < 360) return { rx: 50, rz: 30, translateY: -8, cardHeight: 230, cardWidth: 170 };
    if (windowWidth < 480) return { rx: 68, rz: 35, translateY: -10, cardHeight: 260, cardWidth: 195 };
    if (windowWidth < 768) return { rx: 115, rz: 50, translateY: -12, cardHeight: 300, cardWidth: 220 };
    if (windowWidth < 1100) return { rx: 200, rz: 75, translateY: -16, cardHeight: 360, cardWidth: 270 };
    return { rx: 280, rz: 95, translateY: -20, cardHeight: 420, cardWidth: 320 };
  };

  const { rx, rz, translateY, cardHeight, cardWidth } = getRadius();

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

  // Touch Swipe Handlers (preserving vertical scrolling via pan-y)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 35) {
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
        maxWidth: '100%',
        height: '100%',
        minHeight: `${cardHeight + 85}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        userSelect: 'none',
        touchAction: 'pan-y',
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle Orbital Background Platform Ring */}
      <div 
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          width: `${Math.min(rx * 2 + 50, windowWidth - 30)}px`,
          height: `${rz * 2 + 30}px`,
          transform: 'translate(-50%, -50%) rotateX(72deg)',
          borderRadius: '50%',
          border: '1px solid rgba(32, 32, 30, 0.08)',
          boxShadow: 'inset 0 0 30px rgba(200, 191, 178, 0.25), 0 15px 40px rgba(32, 32, 30, 0.04)',
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
          width: `${Math.min(260, windowWidth - 50)}px`,
          height: `${Math.min(260, windowWidth - 50)}px`,
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
          maxWidth: '100%',
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
          
          const scale = 0.68 + depthFactor * 0.38; // Front ~1.06, Back ~0.68
          const opacity = 0.55 + depthFactor * 0.45; // Front 1.0, Back 0.55
          const blurVal = (1 - depthFactor) * 3; // Front 0px, Back 3px
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
                filter: `blur(${blurVal}px) brightness(${80 + depthFactor * 20}%)`,
              }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 22,
                mass: 0.9,
              }}
              style={{
                position: 'absolute',
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                cursor: isFront ? 'default' : 'pointer',
                zIndex: zIndexVal,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
                boxSizing: 'border-box',
              }}
              whileHover={!isFront ? { scale: scale * 1.04, opacity: opacity + 0.15 } : {}}
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
                  padding: windowWidth < 480 ? '0.85rem' : '1.25rem',
                  borderRadius: '16px',
                  background: isFront 
                    ? 'radial-gradient(ellipse at center, rgba(250, 249, 246, 0.95) 0%, rgba(245, 242, 235, 0.6) 100%)' 
                    : 'transparent',
                  border: isFront ? '1px solid rgba(32, 32, 30, 0.08)' : '1px solid transparent',
                  boxShadow: isFront ? '0 20px 40px -10px rgba(32, 32, 30, 0.09)' : 'none',
                  transition: 'all 0.4s ease',
                  boxSizing: 'border-box',
                }}
              >
                {/* Product Image Frame */}
                <div 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '78%',
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
                      filter: isFront ? 'drop-shadow(0 12px 20px rgba(32, 32, 30, 0.14))' : 'none',
                      transition: 'all 0.5s ease',
                    }}
                  />
                </div>

                {/* Subtle Product Label Badge */}
                <div style={{ marginTop: '0.5rem', textAlign: 'center', width: '100%' }}>
                  <span 
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: isFront ? (windowWidth < 480 ? '0.7rem' : '0.75rem') : '0.64rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: isFront ? 'var(--color-charcoal)' : 'var(--color-text-muted)',
                      display: 'block',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {product.name}
                  </span>
                  <span 
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.66rem',
                      color: 'var(--color-muted-olive)',
                      display: isFront ? 'block' : 'none',
                      marginTop: '0.15rem',
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
          marginTop: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: windowWidth < 480 ? '1.25rem' : '2rem',
          zIndex: 20,
        }}
      >
        {/* Previous Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous product"
          style={{
            width: windowWidth < 480 ? '38px' : '46px',
            height: windowWidth < 480 ? '38px' : '46px',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'var(--color-off-white)',
            color: 'var(--color-charcoal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s var(--ease-out-expo)',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
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
          <ChevronLeft size={windowWidth < 480 ? 18 : 20} />
        </button>

        {/* Pagination Dots & Product Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {PRODUCTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${p.name}`}
              style={{
                width: idx === activeIndex ? (windowWidth < 480 ? '22px' : '28px') : '7px',
                height: '7px',
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
            width: windowWidth < 480 ? '38px' : '46px',
            height: windowWidth < 480 ? '38px' : '46px',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'var(--color-off-white)',
            color: 'var(--color-charcoal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s var(--ease-out-expo)',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
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
          <ChevronRight size={windowWidth < 480 ? 18 : 20} />
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
