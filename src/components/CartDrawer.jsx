import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, CheckCircle2, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/products';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'waitlist', 'success'
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => {
    // prices are INR strings like "₹350" or "₹1,200" — strip ₹ and commas
    const numericPrice = parseFloat(item.price.replace('₹', '').replace(/,/g, '')) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  // Format subtotal as ₹ with Indian grouping (e.g. ₹1,350)
  const subtotalFormatted = '₹' + subtotal.toLocaleString('en-IN');

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setCheckoutStep('success');
  };

  const handleCloseAll = () => {
    onClose();
    setTimeout(() => {
      setCheckoutStep('cart');
      setEmail('');
      setEmailError('');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAll}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(32, 32, 30, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 200,
            }}
          />

          {/* Sliding Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '460px',
              height: '100vh',
              backgroundColor: 'var(--color-warm-ivory)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 210,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Drawer Header */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.75rem 2rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 500,
                  }}
                >
                  Your Bag
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)
                </span>
              </div>

              <button
                onClick={handleCloseAll}
                aria-label="Close Bag"
                style={{
                  padding: '0.5rem',
                  color: 'var(--color-charcoal)',
                  borderRadius: '50%',
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Drawer Body */}
            <div 
              style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '2rem',
              }}
            >
              {checkoutStep === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle2 size={56} color="var(--color-muted-olive)" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
                    You're on the priority list.
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Thank you for joining ATELIER GROOMING. We have reserved your ritual items and will notify <strong>{email}</strong> the moment checkout opens.
                  </p>
                  <button onClick={handleCloseAll} className="btn-primary" style={{ width: '100%' }}>
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : checkoutStep === 'waitlist' ? (
                <div>
                  <button 
                    onClick={() => setCheckoutStep('cart')}
                    style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}
                  >
                    ← Back to Bag
                  </button>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
                    Demo Brand — Priority Waitlist
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    ATELIER GROOMING is currently preparing its launch batch. Enter your email below to reserve your ritual set.
                  </p>

                  <form onSubmit={handleCheckoutSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.name@domain.com"
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '6px',
                          border: '1px solid var(--color-border)',
                          backgroundColor: 'var(--color-off-white)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                        }}
                      />
                      {emailError && (
                        <span style={{ fontSize: '0.75rem', color: '#d97706', marginTop: '0.35rem', display: 'block' }}>
                          {emailError}
                        </span>
                      )}
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                      JOIN LAUNCH RESERVATION
                    </button>
                  </form>
                </div>
              ) : cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    Your bag is currently empty.
                  </p>
                  <button onClick={handleCloseAll} className="btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                    DISCOVER PRODUCTS
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cartItems.map((item) => (
                    <div 
                      key={item.cartId}
                      style={{
                        display: 'flex',
                        gap: '1.25rem',
                        paddingBottom: '1.5rem',
                        borderBottom: '1px solid var(--color-border-subtle)',
                        alignItems: 'center',
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{
                          width: '75px',
                          height: '90px',
                          objectFit: 'contain',
                          backgroundColor: 'var(--color-off-white)',
                          borderRadius: '8px',
                          padding: '0.5rem',
                        }}
                      />

                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500 }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                          {item.size}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div 
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              border: '1px solid var(--color-border)',
                              borderRadius: '4px',
                              backgroundColor: 'var(--color-off-white)',
                            }}
                          >
                            <button
                              onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                              style={{ padding: '0.25rem 0.5rem' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, padding: '0 0.5rem' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                              style={{ padding: '0.25rem 0.5rem' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer (Subtotal & Checkout Button) */}
            {cartItems.length > 0 && checkoutStep === 'cart' && (
              <div 
                style={{
                  padding: '1.75rem 2rem',
                  borderTop: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-off-white)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1.1rem' }}>
                    {subtotalFormatted}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                  Shipping & taxes calculated at checkout.
                </p>

                <button
                  onClick={() => setCheckoutStep('waitlist')}
                  className="btn-primary"
                  style={{ width: '100%', padding: '1rem' }}
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
