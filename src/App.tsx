
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import type { Product, CartItem } from './types';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SocialHubSection } from './components/SocialHubSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    quantity: number
  ) => {
    setCartItems((previousItems) => {
      const existingIndex = previousItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize
      );

      if (existingIndex !== -1) {
        return previousItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...previousItems,
        { product, selectedSize, quantity },
      ];
    });
  };

  const handleUpdateCartQuantity = (
    productId: string,
    size: string,
    delta: number
  ) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size
          ) {
            const newQuantity = item.quantity + delta;

            return newQuantity > 0
              ? { ...item, quantity: newQuantity }
              : null;
          }

          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] font-sans text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        <Hero
          onExploreCollections={() =>
            handleNavigateSection('collections')
          }
          onOpenWhatsAppModal={() =>
            setIsWhatsAppModalOpen(true)
          }
        />

        <section className="border-b border-stone-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-6 text-center sm:text-left lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Pure Authentic Fabrics
                </p>
                <p className="text-xs text-stone-500">
                  Fine lawn, micro velvet and silk collections
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Direct WhatsApp Orders
                </p>
                <p className="text-xs text-stone-500">
                  Contact us for order confirmation and updates
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Custom Stitching
                </p>
                <p className="text-xs text-stone-500">
                  Sizing assistance for your selected products
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Cash on Delivery
                </p>
                <p className="text-xs text-stone-500">
                  Delivery options can be confirmed when ordering
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProductCatalog
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToCart={handleAddToCart}
        />

        <SocialHubSection />
        <ContactSection />
      </main>

      <Footer onNavigateSection={handleNavigateSection} />

      <FloatingWhatsApp
        isOpenExternal={isWhatsAppModalOpen ? true : undefined}
        onCloseExternal={() => setIsWhatsAppModalOpen(false)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
