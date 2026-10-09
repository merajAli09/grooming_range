import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductOverview from './components/ProductOverview';
import RitualSection from './components/RitualSection';
import ProductDetails from './components/ProductDetails';
import BrandPhilosophy from './components/BrandPhilosophy';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { PRODUCTS, getActiveVariant } from './data/products';

// Build the initial variant selections from each product's defaultVariantIndex
function buildDefaultVariants() {
  const map = {};
  PRODUCTS.forEach((p) => {
    map[p.id] = p.defaultVariantIndex;
  });
  return map;
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0); // 0: Face Wash, 1: Moisturiser, 2: Beard Oil

  // Shared variant-selection state: { [productId]: variantIndex }
  const [selectedVariantIndices, setSelectedVariantIndices] = useState(buildDefaultVariants);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /** Update the selected size for a specific product without touching others */
  const handleSelectVariant = (productId, variantIndex) => {
    setSelectedVariantIndices((prev) => ({ ...prev, [productId]: variantIndex }));
  };

  // Cart operations
  const handleAddToCart = (product, variantIndex) => {
    const variant = product.variants[variantIndex ?? selectedVariantIndices[product.id] ?? product.defaultVariantIndex];
    const cartId = `${product.id}--${variant.size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          id: product.id,
          name: product.name,
          image: product.image,
          size: variant.size,
          price: variant.price,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleExploreProduct = (product) => {
    const idx = PRODUCTS.findIndex((p) => p.id === product.id);
    if (idx !== -1) {
      setActiveIndex(idx);
    }
    const detailsEl = document.getElementById('details');
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRitualStep = (stepIdx, product) => {
    setActiveIndex(stepIdx);
    handleExploreProduct(product);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {/* Hero with Interactive 3D Product Wheel */}
        <HeroSection
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onExploreProduct={handleExploreProduct}
          selectedVariantIndices={selectedVariantIndices}
        />

        {/* Product Overview Section */}
        <ProductOverview
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onSelectProduct={handleExploreProduct}
          selectedVariantIndices={selectedVariantIndices}
          onSelectVariant={handleSelectVariant}
        />

        {/* The Ritual Section */}
        <RitualSection onSelectStep={handleSelectRitualStep} />

        {/* Product Details Section */}
        <ProductDetails
          activeProduct={PRODUCTS[activeIndex]}
          selectedVariantIndices={selectedVariantIndices}
          onSelectVariant={handleSelectVariant}
          onAddToCart={handleAddToCart}
        />

        {/* Brand Philosophy Section */}
        <BrandPhilosophy />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
